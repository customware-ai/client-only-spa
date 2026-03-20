import type { ReactElement } from "react";
import { Navigate } from "react-router";
import { Skeleton } from "~/components/ui/Skeleton";
import { useCpqWorkspaceStorage } from "~/utils/cpq-storage";

/**
 * Redirects the shell root to the currently active workflow step so the shared
 * nav can always point at one stable entry URL while the step engine owns the
 * real page surfaces.
 */
export default function IndexPage(): ReactElement {
  const { workspace, isHydrated } = useCpqWorkspaceStorage();

  if (!isHydrated) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-12 w-80 rounded-lg" />
        <Skeleton className="h-64 w-full rounded-lg" />
      </div>
    );
  }

  return (
    <Navigate
      replace
      to={`/workflow/${workspace.ui.active_workflow_step_id}`}
    />
  );
}
