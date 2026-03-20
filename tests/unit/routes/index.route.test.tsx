import { beforeEach, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import IndexPage from "../../../app/routes/index";
import {
  clearCpqWorkspaceFromStorage,
  seedCpqWorkspaceInStorage,
} from "../../../app/utils/cpq-storage";

describe("starter route", () => {
  beforeEach(() => {
    clearCpqWorkspaceFromStorage();
    seedCpqWorkspaceInStorage();
  });

  it("renders the single-page CPQ pre-configuration surface", async () => {
    render(
      <MemoryRouter>
        <IndexPage />
      </MemoryRouter>,
    );

    expect(
      await screen.findByRole("heading", { name: "Customer and collection context" }),
    ).toBeInTheDocument();
    expect(screen.getByText("0 / 4")).toBeInTheDocument();
    expect(screen.getByText("Customer & Collection")).toBeInTheDocument();
    expect(screen.getByText("Quote Summary")).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Customer" })).toHaveValue("");
    expect(screen.getByRole("textbox", { name: "Collection" })).toHaveValue("");
    expect(screen.getByRole("textbox", { name: "Quote Year" })).toHaveValue("");
    expect(screen.getByRole("textbox", { name: "Sequence" })).toHaveValue("");
    expect(screen.getByRole("textbox", { name: "Item Name" })).toHaveValue("");
    expect(
      screen.getByRole("button", { name: "Load Starter Package" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Load the starter package or compliance line to create the first quote scope."),
    ).toBeInTheDocument();
  });

  it("edits the starter form and builds starter scope locally", async () => {
    render(
      <MemoryRouter>
        <IndexPage />
      </MemoryRouter>,
    );

    const customerInput = await screen.findByRole("textbox", { name: "Customer" });
    await userEvent.type(customerInput, "BarkBilt");
    await userEvent.type(screen.getByRole("textbox", { name: "Collection" }), "Industrial Hoists");
    await userEvent.type(screen.getByRole("textbox", { name: "Quote Year" }), "2026");
    await userEvent.type(screen.getByRole("textbox", { name: "Sequence" }), "014");
    await userEvent.type(screen.getByRole("textbox", { name: "Item Name" }), "Under Running Crane");

    expect(screen.getByText("EST-2026-014")).toBeInTheDocument();
    expect(screen.getByText("BarkBilt")).toBeInTheDocument();
    expect(screen.getByText("Industrial Hoists")).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "Load Starter Package" }));
    await userEvent.click(screen.getByRole("button", { name: "Add Compliance Line" }));

    expect(await screen.findByText("Under Running SG")).toBeInTheDocument();
    expect((await screen.findAllByText("Inspection Plan")).length).toBeGreaterThan(0);
    expect(screen.getByText("$27,525.00")).toBeInTheDocument();
    expect((await screen.findAllByText("$450.00")).length).toBeGreaterThan(0);

    await userEvent.click(
      screen.getByRole("button", { name: "Increase quantity for Inspection Plan" }),
    );

    expect(screen.getByText("$900.00")).toBeInTheDocument();
  });
});
