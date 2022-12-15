let formParams = null;

const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(formParams.formInputTypeError);
    errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(formParams.formInputTypeError);
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(`.${formParams.formInput}`));
    const buttonElement = formElement.querySelector(`.${formParams.formSubmitBtn}`);
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
};

const enableValidation = (formObj) => {
    formParams = formObj;
    const formList = Array.from(document.querySelectorAll(`.${formParams.form}`));
    formList.forEach((formElement) => {
        setEventListeners(formElement);
    });
};

function inactiveSaveBtn(buttonElement) {
    buttonElement.classList.add(formParams.formSubmitBtnInactive);
    buttonElement.disabled = true;
}

function activeSaveBtn(buttonElement) {
    buttonElement.classList.remove(formParams.formSubmitBtnInactive);
    buttonElement.disabled = false;
}

function toggleButtonState(inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
        inactiveSaveBtn(buttonElement);
    } else {
        activeSaveBtn(buttonElement);
    }
}

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}

function hasInvalidInputInForm(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(`.${formParams.formInput}`));
    return hasInvalidInput(inputList);
}

function hideAllInputErrors(formElement){
    const inputList = Array.from(formElement.querySelectorAll(`.${formParams.formInput}`));
    inputList.forEach((inputElement) => {
        if (inputElement.classList.contains(formParams.formInputTypeError)) {
            const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
            inputElement.classList.remove(formParams.formInputTypeError);
            errorElement.textContent = '';
        }
    });
}