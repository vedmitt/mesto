import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
    constructor({selector, handleOkClick}) {
        super(selector);
        this._handleOkClick = handleOkClick;
        
        this.setEventListeners();
    }

    open(card) {
        this.card = card;
        super.open();
    }

    setEventListeners() {
        super.setEventListeners();
        
        this._popup.addEventListener('click', (evt) => {
            evt.preventDefault();
            this._handleOkClick(this.card);
            this.close();
        });
    }
} 