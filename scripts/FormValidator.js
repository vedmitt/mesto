export default class FormValidator {
    constructor(formObj, formElement) {
        this._formInputSelector = formObj.formInput;
        this._formSubmitBtnSelector = formObj.formSubmitBtn;
        this._formSubmitBtnInactiveSelector = formObj.formSubmitBtnInactive;
        this._formInputTypeErrorSelector = formObj.formInputTypeError;
        this._formElement = formElement;
    }

    hasInvalidInputInForm() {
        return this._hasInvalidInput(this._inputList);
    }

    hideAllInputErrors() {
        this._inputList.forEach((inputElement) => {
            if (inputElement.classList.contains(this._formInputTypeErrorSelector)) {
                this._hideInputError(inputElement);
            }
        });
    }

    inactiveSaveBtn() {
        this._buttonElement.classList.add(this._formSubmitBtnInactiveSelector);
        this._buttonElement.disabled = true;
    }

    _activeSaveBtn() {
        this._buttonElement.classList.remove(this._formSubmitBtnInactiveSelector);
        this._buttonElement.disabled = false;
    }

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    toggleButtonState() {
        if (this._hasInvalidInput()) {
            this.inactiveSaveBtn();
        } else {
            this._activeSaveBtn();
        }
    }

    _showInputError(inputElement, errorMessage) {
        const errorElement =
            this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._formInputTypeErrorSelector);
        errorElement.textContent = errorMessage;
    }

    _hideInputError(inputElement) {
        const errorElement =
            this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._formInputTypeErrorSelector);
        errorElement.textContent = '';
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _setEventListeners() {
        this._inputList =
            Array.from(this._formElement
                .querySelectorAll(`.${this._formInputSelector}`));

        this._buttonElement =
            this._formElement.querySelector(`.${this._formSubmitBtnSelector}`);

        this.toggleButtonState();

        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this.toggleButtonState();
            });
        });
    }

    enableValidation() {
        this._setEventListeners();
    }
}
