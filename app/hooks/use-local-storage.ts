import { useCallback, useRef, useSyncExternalStore } from "react";
import { fromThrowable, type Result } from "neverthrow";

/**
 * Per-key subscriber registry for same-runtime hook instances.
 * This template does not synchronize across tabs, but multiple mounted hook
 * instances in the current runtime should still observe local writes.
 */
const localStorageSubscribers = new Map<string, Set<() => void>>();

/**
 * Allowed updater contract for the generic localStorage setter.
 */
type LocalStorageStateUpdater<TValue> = TValue | ((previousValue: TValue) => TValue);

/**
 * Internal snapshot shape used to pair parsed data with the exact raw storage
 * value that produced it. Tracking the raw string lets the hook ignore echoed
 * reads after a local write.
 */
interface LocalStorageSnapshot<TValue> {
  value: TValue;
  rawValue: string | null;
}

/**
 * Snapshot exposed to `useSyncExternalStore`.
 * The object includes a hydration flag so consumers can keep server-safe loading
 * behavior without a separate effect-driven state machine.
 */
interface LocalStorageStoreSnapshot<TValue> extends LocalStorageSnapshot<TValue> {
  isHydrated: boolean;
}

function createLocalStorageError(message: string, error: unknown): Error {
  if (error instanceof Error) {
    return new Error(message, { cause: error });
  }

  return new Error(message);
}

function getLocalStorageItem(key: string): Result<string | null, Error> {
  return fromThrowable(
    (storageKey: string): string | null => window.localStorage.getItem(storageKey),
    (error: unknown): Error =>
      createLocalStorageError(`Failed to read localStorage key "${key}".`, error),
  )(key);
}

function setLocalStorageItem(key: string, value: string): Result<void, Error> {
  return fromThrowable(
    (storageKey: string, storageValue: string): void => {
      window.localStorage.setItem(storageKey, storageValue);
    },
    (error: unknown): Error =>
      createLocalStorageError(`Failed to write localStorage key "${key}".`, error),
  )(key, value);
}

function removeLocalStorageItem(key: string): Result<void, Error> {
  return fromThrowable(
    (storageKey: string): void => {
      window.localStorage.removeItem(storageKey);
    },
    (error: unknown): Error =>
      createLocalStorageError(`Failed to remove localStorage key "${key}".`, error),
  )(key);
}

/**
 * Safely serializes a localStorage value for persistence.
 * JSON is the shared storage format for the generic hook.
 */
function serializeLocalStorageValue<TValue>(value: TValue): Result<string, Error> {
  return fromThrowable(
    (input: TValue): string => JSON.stringify(input),
    (error: unknown): Error =>
      createLocalStorageError("Failed to serialize localStorage value.", error),
  )(value);
}

function parseLocalStorageValue<TValue>(rawValue: string): Result<TValue, Error> {
  return fromThrowable(
    (input: string): TValue => JSON.parse(input) as TValue,
    (error: unknown): Error =>
      createLocalStorageError("Failed to parse localStorage value.", error),
  )(rawValue);
}

/**
 * Parses a raw storage string into typed state.
 * Invalid JSON falls back to the provided default value so template consumers
 * get a predictable first-run experience without extra setup.
 */
function parseLocalStorageSnapshot<TValue>(
  rawValue: string | null,
  defaultValue: TValue,
): LocalStorageSnapshot<TValue> {
  if (rawValue === null) {
    return {
      value: defaultValue,
      rawValue,
    };
  }

  return parseLocalStorageValue<TValue>(rawValue).match(
    (value) => ({
      value,
      rawValue,
    }),
    () => ({
      value: defaultValue,
      rawValue,
    }),
  );
}

/**
 * Builds a stable external-store snapshot.
 * The hook caches these objects and reuses them while the raw storage value is
 * unchanged so `useSyncExternalStore` does not see a new snapshot every render.
 */
function createStoreSnapshot<TValue>(
  rawValue: string | null,
  defaultValue: TValue,
  isHydrated: boolean,
): LocalStorageStoreSnapshot<TValue> {
  const parsedSnapshot = parseLocalStorageSnapshot(rawValue, defaultValue);

  return {
    value: parsedSnapshot.value,
    rawValue: parsedSnapshot.rawValue,
    isHydrated,
  };
}

/**
 * Notifies hook instances subscribed to the same storage key.
 * This replaces browser-level event synchronization with a local in-memory
 * registry, which is sufficient for the template use case.
 */
function notifyLocalStorageSubscribers(key: string): void {
  const subscribers = localStorageSubscribers.get(key);
  if (!subscribers) {
    return;
  }

  for (const subscriber of subscribers) {
    subscriber();
  }
}

/**
 * Removes a localStorage key and notifies same-runtime listeners.
 * Utilities can reuse this helper instead of reaching into browser APIs.
 */
export function clearLocalStorageKey(key: string): void {
  if (typeof window === "undefined") {
    return;
  }

  if (removeLocalStorageItem(key).isErr()) {
    return;
  }

  notifyLocalStorageSubscribers(key);
}

/**
 * Usage:
 * const [value, setValue, isHydrated] = useLocalStorage("key", defaultValue);
 *
 * - `value` is the current parsed localStorage value for the key.
 * - `setValue` accepts either the next value or a functional updater.
 * - `isHydrated` stays `false` during the server-safe fallback pass and flips
 *   to `true` once the browser snapshot has been read.
 */
export function useLocalStorage<TValue>(
  key: string,
  defaultValue: TValue,
): readonly [TValue, (nextValue: LocalStorageStateUpdater<TValue>) => void, boolean] {
  const defaultValueRef = useRef(defaultValue);
  const clientSnapshotRef = useRef<LocalStorageStoreSnapshot<TValue>>(
    createStoreSnapshot(null, defaultValueRef.current, false),
  );
  const serverSnapshotRef = useRef<LocalStorageStoreSnapshot<TValue>>(
    createStoreSnapshot(null, defaultValueRef.current, false),
  );

  /**
   * Subscribes to storage changes for the requested key.
   * This template intentionally keeps synchronization scoped to the current
   * runtime instead of watching browser-wide storage events.
   */
  const subscribe = useCallback(
    (onStoreChange: () => void): (() => void) => {
      const existingSubscribers = localStorageSubscribers.get(key);
      if (existingSubscribers) {
        existingSubscribers.add(onStoreChange);
      } else {
        localStorageSubscribers.set(key, new Set([onStoreChange]));
      }

      return (): void => {
        const subscribers = localStorageSubscribers.get(key);
        if (!subscribers) {
          return;
        }

        subscribers.delete(onStoreChange);
        if (subscribers.size === 0) {
          localStorageSubscribers.delete(key);
        }
      };
    },
    [key],
  );

  /**
   * Returns the latest browser snapshot for the subscribed key.
   * The cached object is reused while the raw storage value is unchanged so
   * React sees a stable snapshot identity between updates.
   */
  const getSnapshot = useCallback((): LocalStorageStoreSnapshot<TValue> => {
    if (typeof window === "undefined") {
      return serverSnapshotRef.current;
    }

    const rawValue = getLocalStorageItem(key).match(
      (value) => value,
      () => null,
    );
    if (clientSnapshotRef.current.isHydrated && clientSnapshotRef.current.rawValue === rawValue) {
      return clientSnapshotRef.current;
    }

    clientSnapshotRef.current = createStoreSnapshot(rawValue, defaultValueRef.current, true);

    return clientSnapshotRef.current;
  }, [key]);

  /**
   * Returns the server-safe snapshot used during the prerender and hydration
   * fallback pass. This intentionally reports `isHydrated: false`.
   */
  const getServerSnapshot = useCallback((): LocalStorageStoreSnapshot<TValue> => {
    serverSnapshotRef.current = createStoreSnapshot(null, defaultValueRef.current, false);

    return serverSnapshotRef.current;
  }, []);

  const storeSnapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  /**
   * Persists a new value using the latest in-memory snapshot.
   * Functional updaters resolve against the current external-store snapshot so
   * callers always build on the latest known value.
   */
  const setValue = useCallback(
    (nextValue: LocalStorageStateUpdater<TValue>): void => {
      if (typeof window === "undefined") {
        return;
      }

      const currentSnapshot = clientSnapshotRef.current.isHydrated
        ? clientSnapshotRef.current
        : getSnapshot();
      const resolvedValue =
        typeof nextValue === "function"
          ? (nextValue as (previousValue: TValue) => TValue)(currentSnapshot.value)
          : nextValue;
      const serializedValue = serializeLocalStorageValue(resolvedValue).match(
        (value) => value,
        () => null,
      );

      if (serializedValue === null) {
        return;
      }

      if (serializedValue === currentSnapshot.rawValue) {
        return;
      }

      if (setLocalStorageItem(key, serializedValue).isErr()) {
        return;
      }

      clientSnapshotRef.current = {
        value: resolvedValue,
        rawValue: serializedValue,
        isHydrated: true,
      };
      notifyLocalStorageSubscribers(key);
    },
    [getSnapshot, key],
  );

  return [storeSnapshot.value, setValue, storeSnapshot.isHydrated] as const;
}
