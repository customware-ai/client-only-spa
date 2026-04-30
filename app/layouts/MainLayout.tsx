import type { ReactElement } from "react";
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
          <PopoverTitle className="text-sm font-semibold">Workspace</PopoverTitle>
          <PopoverDescription className="text-sm">
            Account and workspace controls.
          </PopoverDescription>
        </PopoverHeader>
        <div className="space-y-3 px-4 py-4 text-sm text-muted-foreground">
          <div>
            <div className="text-muted-foreground">Signed in as</div>
            <div className="mt-1 font-medium text-foreground">Workspace owner</div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default function MainLayout(): ReactElement {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card/90 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-[1600px] items-center gap-4 px-4 lg:px-6">
          {/*
            BRAND SLOT — single source of truth. Builder replaces:
              Layers3 placeholder icon → <img src={logoUrl} className="h-8 w-auto" />
              "Customware Template"    → company name from DOMAIN.md
              subtitle                 → optional tagline, or remove
          */}
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
            {/* Only add a sidebar here if there is a genuine, product-level need. Do not add one by default. */}
          </div>
        </div>
      </header>

      <main className="min-w-0 flex-1 p-4 lg:p-6">
        <div className="mx-auto w-full max-w-[1400px]">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
