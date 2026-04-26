const { test, expect } = require('@playwright/test');

test.describe("create account keyboard tests",() => {
    test.beforeEach(async({ page }) => {
      await page.goto(''); //goes to base URL set in config file
      await page.keyboard.press('Tab'); //Focus skip link
      await expect(page.locator('#sLink')).toBeFocused();
      await page.keyboard.press('Tab'); //Focus login email field
      await expect(page.locator('#email')).toBeFocused();
      await page.keyboard.press('Tab'); //Focus login password field
      await expect(page.locator('#password')).toBeFocused();
      await page.keyboard.press('Tab'); //Focus "Log In" button
      await expect(page.locator('#loginBtn')).toBeFocused();
      await page.keyboard.press('Tab'); //Focus "Create Account" button
      await expect(page.locator('#createAccountBtn')).toBeFocused();
      await page.keyboard.press('Enter'); //Activate "Create Account"
      await expect(page.locator('#createAccountDialog')).toBeVisible();
      await expect(page.locator('#loginPage')).not.toBeVisible();
      await expect(page.locator('#acctEmail')).toBeFocused();
    });

    test('invalid email and repeated password via kb interface', async ({ page }) => {
        await page.keyboard.type('chris.h'); //Invalid email
        await page.keyboard.press('Tab'); //Focus on 'Password' field
        await expect(page.locator('#acctPassword')).toBeFocused();
        await page.keyboard.type('Speedgolf123'); //Valid password
        await page.keyboard.press('Tab'); //Focus on 'Repeat Password' field
        await expect(page.locator('#acctPasswordRepeat')).toBeFocused();
        await page.keyboard.type('Speedgolf1234'); //Password does not match
        await page.keyboard.press('Tab'); //Focus on 'Display Name' field
        await expect(page.locator('#acctDisplayName')).toBeFocused();
        await page.keyboard.press('Tab'); //Focus on 'Profile Pic' field
        await expect(page.locator('#acctProfilePic')).toBeFocused();
        await page.keyboard.press('Tab'); //Focus on 'Security Q' field
        await expect(page.locator('#acctSecurityQuestion')).toBeFocused();
        await page.keyboard.press('Tab'); //Focus on 'Security A' field
        await expect(page.locator('#acctSecurityAnswer')).toBeFocused();
        await page.keyboard.press('Tab'); //Focus on 'Create Account' button
        await page.keyboard.press('Enter'); //Activate 'Create Account' button
        await expect(page.locator('#acctEmailError')).toBeVisible();
        await expect(page.locator('#acctEmailError')).toBeFocused();
        await expect(page.locator('#acctPasswordError')).not.toBeVisible();
        await expect(page.locator('#acctPasswordRepeatError')).toBeVisible();
        await expect(page.locator('#acctDisplayNameError')).toBeVisible();
        await expect(page.locator('#acctSecurityQuestionError')).toBeVisible();
        await expect(page.locator('#acctSecurityAnswerError')).toBeVisible();
        await page.keyboard.press('Enter'); //Activate top-most error link
        await expect(page.locator('#acctEmail')).toBeFocused();
      });
});
