const showInputError = (formElement, inputElement, errorMessage, formObj) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(formObj.formInputTypeError);
    errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement, formObj) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(formObj.formInputTypeError);
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, formObj) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, formObj);
    } else {
        hideInputError(formElement, inputElement, formObj);
    }
};

const setEventListeners = (formElement, formObj) => {
    const inputList = Array.from(formElement.querySelectorAll(`.${formObj.formInput}`));
    const buttonElement = formElement.querySelector(`.${formObj.formSubmitBtn}`);
    toggleButtonState(inputList, buttonElement, formObj);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, formObj);
            toggleButtonState(inputList, buttonElement, formObj);
        });
    });
};

const enableValidation = (formObj) => {
    const formList = Array.from(document.querySelectorAll(`.${formObj.form}`));
    formList.forEach((formElement) => {
        setEventListeners(formElement, formObj);
    });
};

function inactiveSaveBtn(buttonElement, formObj) {
    buttonElement.classList.add(formObj.formSubmitBtnInactive);
    buttonElement.disabled = true;
}

function activeSaveBtn(buttonElement, formObj) {
    buttonElement.classList.remove(formObj.formSubmitBtnInactive);
    buttonElement.disabled = false;
}

function toggleButtonState(inputList, buttonElement, formObj) {
    if (hasInvalidInput(inputList)) {
        inactiveSaveBtn(buttonElement, formObj);
    } else {
        activeSaveBtn(buttonElement, formObj);
    }
}

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}

function hasInvalidInputInForm(formElement, formObj) {
    const inputList = Array.from(formElement.querySelectorAll(`.${formObj.formInput}`));
    return hasInvalidInput(inputList);
}

function hideAllInputErrors(formElement, formObj){
    const inputList = Array.from(formElement.querySelectorAll(`.${formObj.formInput}`));
    inputList.forEach((inputElement) => {
        if (inputElement.classList.contains(formObj.formInputTypeError)) {
            const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
            inputElement.classList.remove(formObj.formInputTypeError);
            errorElement.textContent = '';
        }
    });
}