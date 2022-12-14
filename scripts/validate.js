const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('form__input_type_error');
    errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('form__input_type_error');
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
    const inputList = Array.from(formElement.querySelectorAll('.form__input'));
    const buttonElement = formElement.querySelector('.form__save-btn');
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
};

const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.form'));
    formList.forEach((formElement) => {
        setEventListeners(formElement);
    });
};

function toggleButtonState(inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add('form__save-btn_inactive');
    } else {
        buttonElement.classList.remove('form__save-btn_inactive');
    }
}

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}

function hasInvalidInputInForm(formElement) {
    const inputList = Array.from(formElement.querySelectorAll('.form__input'));
    return hasInvalidInput(inputList);
}

function hideAllInputErrors(formElement){
    const inputList = Array.from(formElement.querySelectorAll('.form__input'));
    inputList.forEach((inputElement) => {
        if (inputElement.classList.contains('form__input_type_error')) {
            const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
            inputElement.classList.remove('form__input_type_error');
            errorElement.textContent = '';
        }
    });
};