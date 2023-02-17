import Popup from "./Popup.js";
import {
    formSelector,
    formInputSelector,
    formSaveBtnSelector
} from '../utils/constants.js';

export default class PopupForm extends Popup {
    constructor({selector, handleSubmitForm}) {
        super(selector);
        this._formElement = this._popup.querySelector(formSelector);
        this._inputElements = this._formElement.querySelectorAll(formInputSelector);
        
        this._submitBtnElement = this._popup.querySelector(formSaveBtnSelector);
        this._submitText = this._submitBtnElement.textContent;

        this._handleSubmitForm = handleSubmitForm;
    }

    renderLoading(isLoading, loadingText='Сохранение...') {
        if (isLoading) {
            this._submitBtnElement.textContent = loadingText;
        } else {
            this._submitBtnElement.textContent = this._submitText;
        }
      }

    _getInputValues() {
        const values = {};
        this._inputElements.forEach((input) => {
            values[input.name] = input.value;
        });
        return values;
    }

    setInputValues(values) {
        for (const [key, val] of Object.entries(values)) {
            this._formElement.elements[key].value = val;
          }
    }

    close() {
        super.close();
        this._formElement.reset();
    }

    setEventListeners() {
        super.setEventListeners();
        
        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleSubmitForm(this._getInputValues());
        });
    }
} 