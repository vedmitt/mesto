import Popup from "./Popup.js";

export default class PopupConfirm extends Popup {
    setCallback(submitCb) {
      this._handleSubmit = submitCb;
   }

    setEventListeners() {
        super.setEventListeners();

        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleSubmit();
        });
    }
} 

