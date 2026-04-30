import type { ReactElement } from "react";
import { Outlet } from "react-router";

export default function MainLayout(): ReactElement {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Only add a sidebar here if there is a genuine, product-level need. Do not add one by default. */}
      <main className="min-w-0 flex-1 p-4 lg:p-6">
        <div className="mx-auto w-full max-w-[1400px]">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
