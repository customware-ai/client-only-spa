import { expect, test } from "@playwright/test";
import { seedWorkspace } from "./support/cpq";

test.describe("cpq workspace e2e", () => {
  test("keeps the mocked CPQ workflow interactive and persisted", async ({
    page,
  }) => {
    await page.goto("/");
    await seedWorkspace(page);
    await page.reload();

    await expect(page.getByRole("heading", { name: "DR INC" })).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Opportunities (1)" }),
    ).toBeVisible();

    await page
      .getByRole("textbox", { name: "Contact Person" })
      .fill("Morgan Lee");

    await page.getByRole("button", { name: "Equipment Selected" }).click();

    await expect(page.getByRole("heading", { name: "Configure" })).toBeVisible();

    const totalLocator = page
      .locator("section")
      .filter({ hasText: "Build" })
      .getByText(/^\$/)
      .last();
    const totalBefore = await totalLocator.textContent();

    await page
      .locator("section")
      .filter({ hasText: "Inspection Plan" })
      .getByRole("button", { name: "Add" })
      .click();

    await expect(
      page
        .getByRole("complementary")
        .filter({ hasText: "Build" })
        .getByText("Inspection Plan"),
    ).toBeVisible();

    const totalAfter = await totalLocator.textContent();
    expect(totalAfter).not.toBe(totalBefore);

    await page.getByRole("link", { name: "Continue to Quote" }).click();

    await expect(
      page.getByRole("heading", { name: "EST-001002" }),
    ).toBeVisible();

    await page.getByRole("button", { name: "Files" }).click();
    await page.getByRole("button", { name: "Add Mock File" }).click();

    await expect(page.getByText("mock-file-2.pdf")).toBeVisible();

    await page.reload();

    await expect(page.getByText("mock-file-2.pdf")).toBeVisible();

    await page.goto("/");

    await expect(page.getByRole("textbox", { name: "Contact Person" })).toHaveValue(
      "Morgan Lee",
    );
  });
});
