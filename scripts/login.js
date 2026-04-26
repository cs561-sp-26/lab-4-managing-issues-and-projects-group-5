/*************************************************************************
 * File: login.js
 * This file contains helper functions for account lookup and
 * authentication on the log in page.
 *************************************************************************/

/*************************************************************************
 * @function getStoredAccount
 * @desc
 * Looks up an account in localStorage by email address and returns the
 * parsed account object. If no matching account exists, null is returned.
 * @param email: String entered into the log in email field
 *************************************************************************/
function getStoredAccount(email) {
    const storedAccount = localStorage.getItem(email);
    if (storedAccount === null) {
        return null;
    }
    return JSON.parse(storedAccount);
}

/*************************************************************************
 * @function validAccount
 * @desc
 * Given an email and password entered into the log in page, return true
 * if the account exists in localStorage and the password matches; return
 * false otherwise.
 * @param email: String entered into the log in email field
 * @param password: String entered into the log in password field
 *************************************************************************/
function validAccount(email, password) {
    const account = getStoredAccount(email);
    if (account === null) {
        return false;
    }
    return account.accountInfo.password === password;
}
