import { useState, type ReactElement } from "react";
import { Link, Outlet } from "react-router";
import { Layers3, UserRound } from "lucide-react";

import { ModeToggle } from "~/components/mode-toggle";
import { Button } from "~/components/ui/Button";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "~/components/ui/Popover";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "~/components/ui/Sidebar";

function WorkspaceUserMenu(): ReactElement {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon-sm" aria-label="User menu">
          <UserRound className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-72 p-0">
        <PopoverHeader className="px-4 py-3">
          <PopoverTitle className="text-sm font-semibold">Template User</PopoverTitle>
          <PopoverDescription className="text-sm">
            Generic shell controls for the starter workspace.
          </PopoverDescription>
        </PopoverHeader>
        <div className="space-y-3 px-4 py-4 text-sm text-muted-foreground">
          <div>
            <div className="text-muted-foreground">Signed in as</div>
            <div className="mt-1 font-medium text-foreground">Workspace owner</div>
          </div>
          <div>
            <div className="text-muted-foreground">Template mode</div>
            <div className="mt-1 font-medium text-foreground">Generic client-only SPA</div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default function MainLayout(): ReactElement {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <SidebarProvider
      defaultOpen
      open={sidebarOpen}
      onOpenChange={setSidebarOpen}
      className="bg-background text-foreground [--sidebar-width:17rem] [--sidebar-width-icon:3.5rem]"
    >
      <Sidebar side="left" collapsible="offcanvas" className="border-r-0">
        <SidebarHeader className="gap-3 border-b border-sidebar-border/70 p-3">
          <Link
            to="/"
            className="flex min-w-0 items-center gap-3 rounded-xl border border-sidebar-border/70 bg-sidebar-accent/40 px-3 py-3"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-sidebar-border bg-sidebar text-sidebar-foreground">
              <Layers3 className="h-4 w-4" />
            </div>
            <div className="min-w-0 group-data-[collapsible=icon]:hidden">
              <div className="truncate text-sm font-semibold text-sidebar-foreground">
                Customware Template
              </div>
              <div className="truncate text-xs text-sidebar-foreground/70">
                Generic client-only shell
              </div>
            </div>
          </Link>
        </SidebarHeader>

        <SidebarContent>
          <div className="flex-1" />
        </SidebarContent>
      </Sidebar>

      <SidebarInset className="min-h-screen min-w-0">
        <header className="border-b border-border bg-card/90 backdrop-blur">
          <div className="mx-auto flex h-16 w-full max-w-[1600px] items-center gap-4 px-4 lg:px-6">
            <SidebarTrigger aria-label="Toggle navigation sidebar" />

            <Link to="/" className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-muted text-foreground">
                <Layers3 className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold text-foreground">
                  Customware Template
                </div>
                <div className="truncate text-xs text-muted-foreground">
                  Generic client-only SPA shell
                </div>
              </div>
            </Link>

            <div className="ml-auto flex items-center gap-2">
              <ModeToggle />
              <WorkspaceUserMenu />
            </div>
          </div>
        </header>

        <main className="min-w-0 flex-1 p-4 lg:p-6">
          <div className="mx-auto w-full max-w-[1400px]">
            <Outlet />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
