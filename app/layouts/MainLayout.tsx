import { useEffect, type ReactElement } from "react";
import { Link, Outlet } from "react-router";
import { CircleHelp, Moon, RotateCcw, Sun, UserRound } from "lucide-react";
import { WorkflowRail } from "~/components/cpq/WorkflowRail";
import { Button } from "~/components/ui/Button";
import { Select } from "~/components/ui/Select";
import {
  Sidebar,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "~/components/ui/Sidebar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/Sheet";
import { getCurrentWorkflowStep, type UserRole } from "~/lib/cpq-data";
import { useCpqWorkspaceStorage } from "~/utils/cpq-storage";

/**
 * Renders the sidebar-aware shell inside the shared shadcn sidebar provider.
 */
function MainLayoutShell(): ReactElement {
  const {
    workspace,
    resetWorkspace,
    setActiveRole,
    advanceWorkflow,
    toggleThemeMode,
  } = useCpqWorkspaceStorage();
  const currentWorkflowStep = getCurrentWorkflowStep(workspace);

  /**
   * The shell owns the document theme because the browser bootstrap script only
   * knows about system preference, not the persisted demo toggle.
   */
  useEffect((): void => {
    document.documentElement.classList.toggle(
      "dark",
      workspace.ui.theme_mode === "dark",
    );
  }, [workspace.ui.theme_mode]);

  return (
    <>
      <Sidebar side="left" collapsible="offcanvas">
        <WorkflowRail
          workspace={workspace}
          className="border-r-0"
          onAdvance={advanceWorkflow}
        />
      </Sidebar>

      <SidebarInset className="min-h-screen min-w-0">
        <header className="border-b border-stone-200 bg-card dark:border-zinc-800">
          <div className="flex h-14 items-center gap-3 px-4 lg:px-6">
            <SidebarTrigger aria-label="Toggle workflow sidebar" />

            <Link
              to="/"
              className="flex min-w-0 items-center gap-3 text-stone-900 dark:text-zinc-100"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-md border border-stone-300 bg-stone-100 text-xs font-semibold dark:border-zinc-700 dark:bg-zinc-900">
                CW
              </div>
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold">
                  Customware CPQ
                </div>
              </div>
            </Link>

            <div className="ml-auto flex items-center gap-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="hidden sm:inline-flex">
                    <span>View as Role</span>
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Role Preview</SheetTitle>
                    <SheetDescription>
                      Switch the shell into a different CPQ role and preview the
                      permissions that role would get.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="space-y-4 px-4 pb-4">
                    <Select
                      value={workspace.ui.active_role}
                      onChange={(value: string): void =>
                        setActiveRole(value as UserRole)
                      }
                      options={[
                        { label: "Admin", value: "admin" },
                        { label: "Estimator", value: "estimator" },
                        { label: "Approver", value: "approver" },
                        { label: "Viewer", value: "viewer" },
                      ]}
                    />
                    <div className="rounded-lg border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
                      Active role:{" "}
                      <span className="font-semibold capitalize text-stone-900 dark:text-zinc-100">
                        {workspace.ui.active_role}
                      </span>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              <Button
                variant="ghost"
                size="icon-sm"
                aria-label="Theme utility"
                onClick={toggleThemeMode}
              >
                {workspace.ui.theme_mode === "light" ? (
                  <Moon className="h-4 w-4" />
                ) : (
                  <Sun className="h-4 w-4" />
                )}
              </Button>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon-sm" aria-label="Help">
                    <CircleHelp className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Workspace Help</SheetTitle>
                    <SheetDescription>
                      This starter keeps all actions local-first. Every button
                      either changes workspace state, navigates, or mocks a CPQ
                      workflow outcome.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="space-y-3 px-4 pb-4 text-sm text-stone-600 dark:text-zinc-300">
                    <div className="rounded-lg border border-stone-200 bg-stone-50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900">
                      Current workflow step:{" "}
                      <span className="font-semibold text-stone-900 dark:text-zinc-100">
                        {currentWorkflowStep?.stepLabel ?? "Unavailable"}
                      </span>
                    </div>
                    <div className="rounded-lg border border-stone-200 bg-stone-50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900">
                      This starter ships with one pre-configuration stage,
                      starter scope actions, and a live quote summary. Extend
                      that first stage before adding more routes.
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon-sm" aria-label="User menu">
                    <UserRound className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Demo User</SheetTitle>
                    <SheetDescription>
                      Requestor workspace controls for the seeded CPQ starter.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="space-y-3 px-4 pb-4">
                    <div className="rounded-lg border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
                      Signed in as Demo User. Current role is{" "}
                      <span className="font-semibold capitalize text-stone-900 dark:text-zinc-100">
                        {workspace.ui.active_role}
                      </span>
                      .
                    </div>
                    <Button
                      variant="outline"
                      className="w-full justify-center"
                      onClick={resetWorkspace}
                    >
                      <RotateCcw className="h-4 w-4" />
                      <span>Reset Workspace</span>
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </header>

        <main className="min-w-0 flex-1 p-4 lg:p-6">
          <div className="mx-auto w-full max-w-[1400px]">
            <Outlet />
          </div>
        </main>
      </SidebarInset>
    </>
  );
}

/**
 * Shared CPQ application shell.
 */
export default function MainLayout(): ReactElement {
  return (
    <SidebarProvider defaultOpen className="bg-background text-foreground">
      <MainLayoutShell />
    </SidebarProvider>
  );
}
