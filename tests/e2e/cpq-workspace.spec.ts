import { expect, test } from "@playwright/test";
import { seedWorkspace } from "./support/cpq";

test.describe("workflow starter workspace e2e", () => {
  test("persists the CPQ starter inputs and scope while keeping workflow expansion local", async ({
    page,
  }) => {
    await page.goto("/");
    await seedWorkspace(page);
    await page.reload();

    await expect(
      page.getByRole("heading", { name: "Customer and collection context" }),
    ).toBeVisible();

    const customerInput = page.getByRole("textbox", { name: "Customer" });
    const itemNameInput = page.getByRole("textbox", { name: "Item Name" });
    const sectionToggle = page
      .getByRole("button", { name: /Pre-Configuration/i })
      .first();
    const sectionContent = page.locator(
      `#${await sectionToggle.getAttribute("aria-controls")}`,
    );

    await customerInput.fill("BarkBilt");
    await page.getByRole("textbox", { name: "Collection" }).fill("Industrial Hoists");
    await page.getByRole("textbox", { name: "Quote Year" }).fill("2026");
    await page.getByRole("textbox", { name: "Sequence" }).fill("014");
    await itemNameInput.fill("Under Running Crane");
    await page.getByRole("button", { name: "Load Starter Package" }).click();

    await sectionToggle.click();

    await expect(sectionToggle).toHaveAttribute("aria-expanded", "false");
    await expect(sectionContent).toBeHidden();

    await page.reload();

    await expect(customerInput).toHaveValue("BarkBilt");
    await expect(itemNameInput).toHaveValue("Under Running Crane");
    await expect(page.getByText("EST-2026-014")).toBeVisible();
    await expect(page.getByText("Under Running SG", { exact: true })).toBeVisible();
    await expect(sectionToggle).toHaveAttribute("aria-expanded", "true");
    await expect(sectionContent).toBeVisible();
  });
});
