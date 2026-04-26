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

/*************************************************************************
 * @function emailFieldIsValid
 * @desc
 * Returns true if the log in email field contains a valid email value.
 *************************************************************************/
function emailFieldIsValid() {
    return !GlobalEmailField.validity.typeMismatch &&
           !GlobalEmailField.validity.valueMissing;
}

/*************************************************************************
 * @function passwordFieldIsValid
 * @desc
 * Returns true if the log in password field satisfies the required
 * password pattern and is not blank.
 *************************************************************************/
function passwordFieldIsValid() {
    return !GlobalPasswordField.validity.patternMismatch &&
           !GlobalPasswordField.validity.valueMissing;
}

/*************************************************************************
 * @function updateLoginFieldValidationState
 * @desc
 * Adds or removes the error highlight on a log in field based on whether
 * the current value is valid.
 * @param field: Reference to the input field being styled
 * @param isValid: Boolean indicating whether the field is currently valid
 *************************************************************************/
function updateLoginFieldValidationState(field, isValid) {
    if (isValid) {
        field.classList.remove("highlight-error");
    } else {
        field.classList.add("highlight-error");
    }
}

/*************************************************************************
 * @function validateLoginForm
 * @desc
 * Validates the email and password fields on the log in form. Returns
 * true only when both fields are valid.
 *************************************************************************/
function validateLoginForm() {
    const emailValid = emailFieldIsValid();
    const passwordValid = passwordFieldIsValid();
    updateLoginFieldValidationState(GlobalEmailField, emailValid);
    updateLoginFieldValidationState(GlobalPasswordField, passwordValid);
    return emailValid && passwordValid;
}

/*************************************************************************
 * @function Login Form SUBMIT Handler
 * @desc
 * Prevents submission when the email or password fields are invalid and
 * highlights invalid fields so the user can correct them.
 *************************************************************************/
GlobalLoginForm.addEventListener("submit", function(e) {
    e.preventDefault();
    validateLoginForm();
});

GlobalEmailField.addEventListener("input", function() {
    updateLoginFieldValidationState(GlobalEmailField, emailFieldIsValid());
});

GlobalPasswordField.addEventListener("input", function() {
    updateLoginFieldValidationState(GlobalPasswordField, passwordFieldIsValid());
});
