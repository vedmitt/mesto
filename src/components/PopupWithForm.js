import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({selector, handleSubmitForm}) {
        super(selector);
        this._form = this._popup.querySelector('.form');
        this._handleSubmitForm = handleSubmitForm;
    }

    _getInputValues() {
        const inputs = this._form.querySelectorAll('.form__input');
        var values = {}
        inputs.forEach((input) => {
            values[input.name] = input.value;
        });
        return values;
    }

    setInputValues(values) {
        for (const [key, val] of Object.entries(values)) {
            document.getElementsByName(key)[0].value = val;
          }
    }

    close() {
        super.close();
        this._form.reset();
    }

    setEventListeners() {
        super.setEventListeners();
        
        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleSubmitForm(this._getInputValues());
            this.close();
        });
    }
} 