import type { ReactElement } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router";
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
import { cn } from "~/lib/utils";

interface NavigationItem {
  label: string;
  href: string;
  description: string;
}

const navigationItems: NavigationItem[] = [
  {
    label: "Reference Catalog",
    href: "/",
    description: "Shipped component surface and layout patterns.",
  },
];

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
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen flex-col">
        <header className="border-b border-border bg-card/90 backdrop-blur">
          <div className="mx-auto flex h-16 w-full max-w-[1600px] items-center gap-4 px-4 lg:px-6">
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

        <div className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col lg:flex-row">
          <aside className="border-b border-border bg-card/60 lg:min-h-0 lg:w-72 lg:border-r lg:border-b-0">
            <div className="space-y-6 p-4 lg:p-5">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                  Navigation
                </p>
                <nav className="space-y-1">
                  {navigationItems.map((item) => (
                    <NavLink
                      key={item.href}
                      to={item.href}
                      className={({ isActive }): string =>
                        cn(
                          "block rounded-xl border border-transparent px-3 py-3 transition-colors duration-150",
                          "hover:border-border hover:bg-muted/70",
                          (isActive || location.pathname === item.href) &&
                            "border-border bg-muted text-foreground",
                        )
                      }
                    >
                      <div className="text-sm font-medium text-foreground">{item.label}</div>
                      <div className="mt-1 text-xs leading-5 text-muted-foreground">
                        {item.description}
                      </div>
                    </NavLink>
                  ))}
                </nav>
              </div>
            </div>
          </aside>

          <div className="flex min-w-0 flex-1 flex-col">
            <main className="min-w-0 flex-1 p-4 lg:p-6">
              <div className="mx-auto w-full max-w-[1400px]">
                <Outlet />
              </div>
            </main>

            <footer className="border-t border-border bg-card/70">
              <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-2 px-4 py-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between lg:px-6">
                <span>Status: reference shell active</span>
                <span>Main content is currently provided by `Demo.tsx`.</span>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}
