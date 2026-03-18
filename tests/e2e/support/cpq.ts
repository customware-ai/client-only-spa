import type { Page } from "@playwright/test";
import { createDefaultCpqWorkspace } from "../../../app/lib/cpq-data";
import { CPQ_WORKSPACE_STORAGE_KEY } from "../../../app/utils/cpq-storage";

/**
 * Seeds Playwright with the default local-first workspace so browser checks
 * start from a deterministic CPQ state.
 */
export async function seedWorkspace(page: Page): Promise<void> {
  const workspace = createDefaultCpqWorkspace();

  await page.evaluate(
    ([storageKey, serializedWorkspace]) => {
      window.localStorage.setItem(storageKey, serializedWorkspace);
    },
    [CPQ_WORKSPACE_STORAGE_KEY, JSON.stringify(workspace)],
  );
}
