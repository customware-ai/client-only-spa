import type { ReactElement } from "react";
import { beforeEach, describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  createMemoryRouter,
  RouterProvider,
  useParams,
} from "react-router";
import MainLayout from "../../../app/layouts/MainLayout";
import {
  clearCpqWorkspaceFromStorage,
  seedCpqWorkspaceInStorage,
} from "../../../app/utils/cpq-storage";

/**
 * Minimal route body used to confirm shell-driven step navigation.
 */
function StepRouteBody(): ReactElement {
  const params = useParams();

  return <div>{params.stepId} body</div>;
}

/**
 * Builds a memory router around the shared CPQ layout.
 */
function createLayoutRouter(
  initialEntries: string[],
): ReturnType<typeof createMemoryRouter> {
  return createMemoryRouter(
    [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          { index: true, element: <div>Root body</div> },
          { path: "workflow/:stepId", element: <StepRouteBody /> },
        ],
      },
    ],
    { initialEntries },
  );
}

/**
 * Updates the mocked viewport width so the shadcn sidebar can switch between
 * desktop off-canvas behavior and mobile sheet behavior inside jsdom.
 */
function setViewportWidth(width: number): void {
  Object.defineProperty(window, "innerWidth", {
    configurable: true,
    value: width,
    writable: true,
  });
}

/**
 * Radix Select expects pointer-capture APIs that jsdom does not implement.
 */
function installPointerCaptureStubs(): void {
  Object.defineProperties(HTMLElement.prototype, {
    hasPointerCapture: {
      configurable: true,
      value: (): boolean => false,
    },
    releasePointerCapture: {
      configurable: true,
      value: (): void => undefined,
    },
    setPointerCapture: {
      configurable: true,
      value: (): void => undefined,
    },
    scrollIntoView: {
      configurable: true,
      value: (): void => undefined,
    },
  });
}

/**
 * Reads the persisted role from the seeded workspace payload.
 */
function readStoredRole(): string | null {
  const workspace = window.localStorage.getItem("cohesiv_cpq_workspace");

  if (!workspace) {
    return null;
  }

  return JSON.parse(workspace).ui.active_role as string;
}

describe("main layout", () => {
  beforeEach(() => {
    setViewportWidth(1280);
    installPointerCaptureStubs();
    clearCpqWorkspaceFromStorage();
    seedCpqWorkspaceInStorage();
  });

  it("renders the CPQ shell navigation and staged workflow rail", async () => {
    const router = createLayoutRouter(["/workflow/customer-collection"]);
    render(<RouterProvider router={router} />);

    const logoMark = await screen.findByText("CW");

    expect(logoMark).toBeInTheDocument();
    expect(logoMark).toHaveClass("rounded-xl", "px-2.5", "py-2");
    expect(logoMark).not.toHaveClass("border");
    expect(screen.queryByText("Customware CPQ")).not.toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "Workspace" })).toHaveLength(2);
    expect(screen.getByText("Workflow")).toBeInTheDocument();
    expect(screen.getByText("0 of 3 steps")).toBeInTheDocument();
    expect(screen.getByText("0%")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Pre-Configuration/i }),
    ).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Step 1 of 2")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Scope & Review/i })).toHaveTextContent(
      "Upcoming",
    );
    expect(
      screen.getByRole("button", { name: "Customer & Collection" }),
    ).toHaveAttribute("aria-current", "step");
    expect(screen.getByText("customer-collection body")).toBeInTheDocument();
  });

  it("collapses and expands a workflow stage without navigating", async () => {
    const router = createLayoutRouter(["/workflow/customer-collection"]);
    render(<RouterProvider router={router} />);

    const sectionToggle = screen.getByRole("button", {
      name: /Pre-Configuration/i,
    });
    const sectionContent = document.getElementById(
      sectionToggle.getAttribute("aria-controls") ?? "",
    );

    expect(screen.getByRole("button", { name: "Quote Identity" })).toBeInTheDocument();

    await userEvent.click(sectionToggle);

    expect(sectionToggle).toHaveAttribute("aria-expanded", "false");
    expect(sectionContent).toHaveAttribute("hidden");
    expect(screen.getByText("customer-collection body")).toBeInTheDocument();

    await userEvent.click(sectionToggle);

    expect(sectionToggle).toHaveAttribute("aria-expanded", "true");
    expect(sectionContent).not.toHaveAttribute("hidden");
    expect(screen.getByRole("button", { name: "Quote Identity" })).toBeInTheDocument();
  });

  it("navigates between workflow step pages from the rail", async () => {
    const router = createLayoutRouter(["/workflow/customer-collection"]);
    render(<RouterProvider router={router} />);

    await userEvent.click(screen.getByRole("button", { name: "Quote Identity" }));

    expect(await screen.findByText("quote-identity body")).toBeInTheDocument();
  });

  it("collapses and restores the desktop workflow sidebar", async () => {
    const router = createLayoutRouter(["/workflow/customer-collection"]);
    render(<RouterProvider router={router} />);

    const sidebarRoot = document.querySelector(
      '[data-side="left"][data-slot="sidebar"]',
    );

    expect(sidebarRoot).toHaveAttribute("data-state", "expanded");

    await userEvent.click(
      screen.getByRole("button", { name: "Toggle workflow sidebar" }),
    );

    expect(sidebarRoot).toHaveAttribute("data-state", "collapsed");

    await userEvent.click(
      screen.getByRole("button", { name: "Toggle workflow sidebar" }),
    );

    expect(sidebarRoot).toHaveAttribute("data-state", "expanded");
  });

  it("closes the mobile workflow drawer after selecting a step", async () => {
    setViewportWidth(390);
    const router = createLayoutRouter(["/workflow/customer-collection"]);
    render(<RouterProvider router={router} />);

    await userEvent.click(
      screen.getByRole("button", { name: "Toggle workflow sidebar" }),
    );

    const sidebarDialog = await screen.findByRole("dialog", { name: "Sidebar" });

    await userEvent.click(
      within(sidebarDialog).getByRole("button", { name: "Quote Identity" }),
    );

    expect(await screen.findByText("quote-identity body")).toBeInTheDocument();
    expect(screen.queryByRole("dialog", { name: "Sidebar" })).not.toBeInTheDocument();
  });

  it("toggles the persisted theme mode from the header control", async () => {
    const router = createLayoutRouter(["/workflow/customer-collection"]);
    render(<RouterProvider router={router} />);

    expect(document.documentElement.classList.contains("dark")).toBe(false);

    await userEvent.click(screen.getByRole("button", { name: "Theme utility" }));

    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("keeps role preview in memory instead of persisting it", async () => {
    const router = createLayoutRouter(["/workflow/customer-collection"]);
    render(<RouterProvider router={router} />);

    expect(readStoredRole()).toBe("admin");

    await userEvent.click(screen.getByRole("button", { name: "View as Role" }));
    await userEvent.click(screen.getByRole("combobox"));
    await userEvent.click(await screen.findByRole("option", { name: "Viewer" }));

    expect(await screen.findByText("Active role:")).toBeInTheDocument();
    expect(screen.getByText("Viewer")).toBeInTheDocument();
    expect(readStoredRole()).toBe("admin");
  });
});
