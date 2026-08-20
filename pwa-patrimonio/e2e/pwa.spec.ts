import { expect, test } from "@playwright/test";

test("muestra el inicio y permite navegar a una nueva ficha", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /patrimonio cultural de tunja/i })).toBeVisible();
  await page.getByRole("link", { name: /crear nueva ficha/i }).click();
  await expect(page.getByRole("heading", { name: /cuenta una historia del territorio/i })).toBeVisible();
});
