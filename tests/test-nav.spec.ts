import { test, expect } from '@playwright/test'
 
test('should navigate across pages', async ({ page }) => {

  await page.goto('http://localhost:3000/');

  await page.getByTestId('nav-home').click();
  await expect(page.getByTestId('mainhero')).toBeVisible();
  
  await page.getByTestId('nav-about').click();
  await expect(page.getByTestId('aboutpage')).toBeVisible();

  await page.getByTestId('nav-contact').click();
  await expect(page.getByTestId('contactpage')).toBeVisible();

  await page.getByTestId('nav-login').click();
  await expect(page.getByTestId('loginpage')).toBeVisible();

})