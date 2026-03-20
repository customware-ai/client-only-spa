import { expect, test } from "@playwright/test";
import { seedWorkspace } from "./support/cpq";

test.describe("workflow starter workspace e2e", () => {
  test("progresses through route-backed starter pages and persists completion state", async ({
    page,
  }) => {
    await page.goto("/");
    await seedWorkspace(page);
    await page.reload();

    await expect(
      page.getByRole("heading", { name: "Customer & Collection" }),
    ).toBeVisible();

    const customerInput = page.getByRole("textbox", { name: "Customer" });

    await customerInput.fill("BarkBilt");
    await page.getByRole("textbox", { name: "Collection" }).fill("Industrial Hoists");
    await page.getByRole("button", { name: "Continue to Quote Identity" }).click();
    await expect(page).toHaveURL(/\/workflow\/quote-identity$/);

    await page.getByRole("textbox", { name: "Quote Year" }).fill("2026");
    await page.getByRole("textbox", { name: "Sequence" }).fill("014");
    await page.getByRole("textbox", { name: "Item Name" }).fill("Under Running Crane");
    await page.getByRole("button", { name: "Continue to Starter Scope" }).click();
    await expect(page).toHaveURL(/\/workflow\/starter-scope$/);

    await page.getByRole("button", { name: "Load package" }).click();
    await page.getByRole("button", { name: "Complete workflow" }).click();
    await expect(page.getByText("Starter workflow complete.")).toBeVisible();
    await expect(page.getByText("3 / 3")).toBeVisible();

    await page.reload();

    const persistedWorkspace = await page.evaluate(() =>
      JSON.parse(window.localStorage.getItem("cohesiv_cpq_workspace") ?? "null"),
    );

    await expect(page.getByText("BarkBilt").nth(1)).toBeVisible();
    await expect(page.getByText("EST-2026-014")).toBeVisible();
    await expect(page.getByText("Starter workflow complete.")).toBeVisible();
    await expect(page).toHaveURL(/\/workflow\/starter-scope$/);
    expect(persistedWorkspace.estimates[0]?.build_selections).toHaveLength(1);
    expect(persistedWorkspace.ui.workflow_completed).toBe(true);
  });
});
