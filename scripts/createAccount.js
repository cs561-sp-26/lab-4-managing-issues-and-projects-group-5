/*************************************************************************
 * File: createAccount.js
 * This file contains functions that support the "Create Account" dialog.
 *************************************************************************/

/*************************************************************************
 * @function createAccountBtn CLICK Handler
 * @desc
 * When the user clicks the "Create Account" button on the log in page,
 * transition to the "Create Account" dialog and focus the first field.
 *************************************************************************/
GlobalCreateAccountBtn.addEventListener("click", function() {
    GlobalLoginPage.classList.add("hidden");
    GlobalCreateAccountDialog.classList.remove("hidden");
    document.title = "Create Account";
    GlobalAcctEmailField.focus();
});

/*************************************************************************
 * @function createAccountEmailIsValid
 * @desc
 * Returns true if the create-account email field contains a valid email.
 *************************************************************************/
function createAccountEmailIsValid() {
    return !GlobalAcctEmailField.validity.typeMismatch &&
           !GlobalAcctEmailField.validity.valueMissing;
}

/*************************************************************************
 * @function createAccountPasswordIsValid
 * @desc
 * Returns true if the create-account password field satisfies the
 * password pattern and is not blank.
 *************************************************************************/
function createAccountPasswordIsValid() {
    return !GlobalAcctPasswordField.validity.patternMismatch &&
           !GlobalAcctPasswordField.validity.valueMissing;
}

/*************************************************************************
 * @function createAccountPasswordRepeatIsValid
 * @desc
 * Returns true if the repeated password exactly matches the password.
 *************************************************************************/
function createAccountPasswordRepeatIsValid() {
    return GlobalAcctPasswordField.value === GlobalAcctPasswordRepeatField.value &&
           GlobalAcctPasswordRepeatField.value.length !== 0;
}

/*************************************************************************
 * @function createAccountDisplayNameIsValid
 * @desc
 * Returns true if the display name meets the minimum length requirement.
 *************************************************************************/
function createAccountDisplayNameIsValid() {
    return !GlobalAcctDisplayNameField.validity.tooShort &&
           !GlobalAcctDisplayNameField.validity.valueMissing;
}

/*************************************************************************
 * @function createAccountSecurityQuestionIsValid
 * @desc
 * Returns true if the security question meets the minimum length
 * requirement.
 *************************************************************************/
function createAccountSecurityQuestionIsValid() {
    return !GlobalAcctSecurityQuestionField.validity.tooShort &&
           !GlobalAcctSecurityQuestionField.validity.valueMissing;
}

/*************************************************************************
 * @function createAccountSecurityAnswerIsValid
 * @desc
 * Returns true if the security answer meets the minimum length
 * requirement.
 *************************************************************************/
function createAccountSecurityAnswerIsValid() {
    return !GlobalAcctSecurityAnswerField.validity.tooShort &&
           !GlobalAcctSecurityAnswerField.validity.valueMissing;
}

/*************************************************************************
 * @function updateCreateAccountFieldValidationState
 * @desc
 * Adds or removes the error highlight on a create-account field based on
 * whether the current value is valid.
 * @param field: Reference to the input field being styled
 * @param isValid: Boolean indicating whether the field is currently valid
 *************************************************************************/
function updateCreateAccountFieldValidationState(field, isValid) {
    if (isValid) {
        field.classList.remove("highlight-error");
    } else {
        field.classList.add("highlight-error");
    }
}

/*************************************************************************
 * @function updateCreateAccountErrorVisibility
 * @desc
 * Shows or hides a specific create-account error message element.
 * @param errorElement: Reference to the error message element
 * @param shouldShow: Boolean indicating whether the message should be shown
 *************************************************************************/
function updateCreateAccountErrorVisibility(errorElement, shouldShow) {
    if (shouldShow) {
        errorElement.classList.remove("hidden");
    } else {
        errorElement.classList.add("hidden");
    }
}

/*************************************************************************
 * @function validateCreateAccountForm
 * @desc
 * Validates all required create-account fields, updates highlights, and
 * returns the field validity results.
 *************************************************************************/
function validateCreateAccountForm() {
    const emailValid = createAccountEmailIsValid();
    const passwordValid = createAccountPasswordIsValid();
    const repeatPasswordValid = createAccountPasswordRepeatIsValid();
    const displayNameValid = createAccountDisplayNameIsValid();
    const securityQuestionValid = createAccountSecurityQuestionIsValid();
    const securityAnswerValid = createAccountSecurityAnswerIsValid();

    updateCreateAccountFieldValidationState(GlobalAcctEmailField, emailValid);
    updateCreateAccountFieldValidationState(GlobalAcctPasswordField, passwordValid);
    updateCreateAccountFieldValidationState(GlobalAcctPasswordRepeatField, repeatPasswordValid);
    updateCreateAccountFieldValidationState(GlobalAcctDisplayNameField, displayNameValid);
    updateCreateAccountFieldValidationState(GlobalAcctSecurityQuestionField, securityQuestionValid);
    updateCreateAccountFieldValidationState(GlobalAcctSecurityAnswerField, securityAnswerValid);

    return {
        emailValid,
        passwordValid,
        repeatPasswordValid,
        displayNameValid,
        securityQuestionValid,
        securityAnswerValid
    };
}

/*************************************************************************
 * @function showCreateAccountErrors
 * @desc
 * Displays the create-account error box and the relevant error messages,
 * then focuses the first error shown.
 * @param results: Validation results returned by validateCreateAccountForm
 *************************************************************************/
function showCreateAccountErrors(results) {
    GlobalAcctErrBox.classList.remove("hidden");
    updateCreateAccountErrorVisibility(GlobalAcctEmailErr, !results.emailValid);
    updateCreateAccountErrorVisibility(GlobalAcctPasswordErr, !results.passwordValid);
    updateCreateAccountErrorVisibility(GlobalAcctPasswordRepeatErr, !results.repeatPasswordValid);
    updateCreateAccountErrorVisibility(GlobalAcctDisplayNameErr, !results.displayNameValid);
    updateCreateAccountErrorVisibility(GlobalAcctSecurityQuestionErr, !results.securityQuestionValid);
    updateCreateAccountErrorVisibility(GlobalAcctSecurityAnswerErr, !results.securityAnswerValid);

    if (!results.emailValid) {
        GlobalAcctEmailErr.focus();
    } else if (!results.passwordValid) {
        GlobalAcctPasswordErr.focus();
    } else if (!results.repeatPasswordValid) {
        GlobalAcctPasswordRepeatErr.focus();
    } else if (!results.displayNameValid) {
        GlobalAcctDisplayNameErr.focus();
    } else if (!results.securityQuestionValid) {
        GlobalAcctSecurityQuestionErr.focus();
    } else if (!results.securityAnswerValid) {
        GlobalAcctSecurityAnswerErr.focus();
    }
}

/*************************************************************************
 * @function resetCreateAccountErrors
 * @desc
 * Hides the create-account error box and all field-level error messages.
 *************************************************************************/
function resetCreateAccountErrors() {
    GlobalAcctErrBox.classList.add("hidden");
    GlobalAcctEmailErr.classList.add("hidden");
    GlobalAcctPasswordErr.classList.add("hidden");
    GlobalAcctPasswordRepeatErr.classList.add("hidden");
    GlobalAcctDisplayNameErr.classList.add("hidden");
    GlobalAcctSecurityQuestionErr.classList.add("hidden");
    GlobalAcctSecurityAnswerErr.classList.add("hidden");
}

/*************************************************************************
 * @function buildNewAccount
 * @desc
 * Builds the account object from the current values entered in the
 * Create Account dialog.
 *************************************************************************/
function buildNewAccount() {
    return {
        accountInfo: {
            email: GlobalAcctEmailField.value,
            password: GlobalAcctPasswordField.value,
            securityQuestion: GlobalAcctSecurityQuestionField.value,
            securityAnswer: GlobalAcctSecurityAnswerField.value
        },
        identityInfo: {
            displayName: GlobalAcctDisplayNameField.value,
            profilePic: GlobalAcctProfilePicImage.getAttribute("src")
        },
        speedgolfInfo: {
            bio: "",
            homeCourse: "",
            firstRound: "",
            personalBest: { strokes: 0, minutes: 0, seconds: 0, course: "" },
            clubs: {},
            clubComments: ""
        },
        rounds: [],
        roundCount: 0
    };
}

/*************************************************************************
 * @function persistNewAccount
 * @desc
 * Saves a newly created account object to localStorage using the email
 * address as the storage key.
 * @param newAccount: The account object to persist
 *************************************************************************/
function persistNewAccount(newAccount) {
    localStorage.setItem(newAccount.accountInfo.email, JSON.stringify(newAccount));
}

/*************************************************************************
 * @function returnToLoginPage
 * @desc
 * Closes the Create Account dialog and returns the user to the login page.
 *************************************************************************/
function returnToLoginPage() {
    GlobalCreateAccountDialog.classList.add("hidden");
    GlobalLoginPage.classList.remove("hidden");
    document.title = "Log in to SpeedScore";
    GlobalCreateAccountBtn.focus();
}

GlobalCreateAccountForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const validationResults = validateCreateAccountForm();
    const formIsValid = validationResults.emailValid &&
                        validationResults.passwordValid &&
                        validationResults.repeatPasswordValid &&
                        validationResults.displayNameValid &&
                        validationResults.securityQuestionValid &&
                        validationResults.securityAnswerValid;

    if (formIsValid) {
        resetCreateAccountErrors();
        const newAccount = buildNewAccount();
        persistNewAccount(newAccount);
        returnToLoginPage();
        return;
    }

    showCreateAccountErrors(validationResults);
});

GlobalCancelCreateAccountBtn.addEventListener("click", function() {
    resetCreateAccountForm();
    returnToLoginPage();
});
