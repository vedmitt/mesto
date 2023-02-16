import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({selector, handleSubmitForm}) {
        super(selector);
        this._form = this._popup.querySelector('.form');
        this._handleSubmitForm = handleSubmitForm;

        this._submitBtn = this._popup.querySelector('.form__save-btn');
        this._submitText = this._submitBtn.textContent;
    }

    renderLoading(isLoading) {
        if (isLoading) {
            this._submitBtn.textContent = 'Сохранение...';
        } else {
            this._submitBtn.textContent = this._submitText;
        }
      }

    _getInputValues() {
        const inputs = this._form.querySelectorAll('.form__input');
        const values = {};
        inputs.forEach((input) => {
            values[input.name] = input.value;
        });
        return values;
    }

    setInputValues(values) {
        for (const [key, val] of Object.entries(values)) {
            this._form.elements[key].value = val;
          }
    }

    open() {
        this.renderLoading(false);
        super.open();
    }

    close() {
        super.close();
        this._form.reset();
    }

    setEventListeners() {
        super.setEventListeners();
        
        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.renderLoading(true);
            this._handleSubmitForm(this._getInputValues());
            this.close();
        });
    }
} 