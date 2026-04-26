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
 * @function updateErrorVisibility
 * @desc
 * Shows or hides a specific error message element.
 * @param errorElement: Reference to the error message element
 * @param shouldShow: Boolean indicating whether the message should be shown
 *************************************************************************/
function updateErrorVisibility(errorElement, shouldShow) {
    if (shouldShow) {
        errorElement.classList.remove("hidden");
    } else {
        errorElement.classList.add("hidden");
    }
}

/*************************************************************************
 * @function resetLoginErrors
 * @desc
 * Hides all log in error messages and restores the normal page title.
 *************************************************************************/
function resetLoginErrors() {
    GlobalErrorBox.classList.add("hidden");
    GlobalEmailError.classList.add("hidden");
    GlobalPasswordError.classList.add("hidden");
    GlobalAuthError.classList.add("hidden");
    document.title = "Log in to SpeedScore";
}

/*************************************************************************
 * @function showLoginErrors
 * @desc
 * Displays the accessible error state for the current login attempt,
 * including the error box, specific error messages, focus, and title.
 * @param emailValid: Boolean indicating whether the email field is valid
 * @param passwordValid: Boolean indicating whether the password field is valid
 * @param authenticated: Boolean indicating whether the credentials matched
 *************************************************************************/
function showLoginErrors(emailValid, passwordValid, authenticated) {
    const showAuthError = emailValid && passwordValid && !authenticated;
    GlobalErrorBox.classList.remove("hidden");
    updateErrorVisibility(GlobalEmailError, !emailValid);
    updateErrorVisibility(GlobalPasswordError, !passwordValid);
    updateErrorVisibility(GlobalAuthError, showAuthError);
    document.title = "Error: Log in to SpeedScore";

    if (!emailValid) {
        GlobalEmailError.focus();
    } else if (!passwordValid) {
        GlobalPasswordError.focus();
    } else if (showAuthError) {
        GlobalAuthError.focus();
    }
}

/*************************************************************************
 * @function Login Form SUBMIT Handler
 * @desc
 * Prevents submission when the email or password fields are invalid and
 * provides accessible error feedback. If both fields are valid but the
 * credentials do not match a stored account, the authentication error is
 * shown.
 *************************************************************************/
GlobalLoginForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const emailValid = emailFieldIsValid();
    const passwordValid = passwordFieldIsValid();
    const authenticated = emailValid && passwordValid &&
                          validAccount(GlobalEmailField.value, GlobalPasswordField.value);

    updateLoginFieldValidationState(GlobalEmailField, emailValid);
    updateLoginFieldValidationState(GlobalPasswordField, passwordValid);

    if (authenticated) {
        resetLoginErrors();
        return;
    }

    showLoginErrors(emailValid, passwordValid, authenticated);
});

GlobalEmailField.addEventListener("input", function() {
    const emailValid = emailFieldIsValid();
    updateLoginFieldValidationState(GlobalEmailField, emailValid);
    updateErrorVisibility(GlobalEmailError, !emailValid);
    updateErrorVisibility(GlobalAuthError, false);
    if (emailValid && passwordFieldIsValid()) {
        GlobalErrorBox.classList.add("hidden");
        document.title = "Log in to SpeedScore";
    }
});

GlobalPasswordField.addEventListener("input", function() {
    const passwordValid = passwordFieldIsValid();
    updateLoginFieldValidationState(GlobalPasswordField, passwordValid);
    updateErrorVisibility(GlobalPasswordError, !passwordValid);
    updateErrorVisibility(GlobalAuthError, false);
    if (emailFieldIsValid() && passwordValid) {
        GlobalErrorBox.classList.add("hidden");
        document.title = "Log in to SpeedScore";
    }
});
