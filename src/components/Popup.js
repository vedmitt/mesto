import {
    popupCloseBtnSelector,
    popupOpenedSelector
} from '../utils/constants.js';

export default class Popup {
    constructor(selector) {
        this._popup = document.querySelector(selector);
        this._handleEscClose = this._handleEscClose.bind(this);

        this.setEventListeners();
    }

    open() {
        this._popup.classList.add(popupOpenedSelector);
        // добавим слушатель закрытия попапа нажатием Esc
        document.addEventListener('keydown', this._handleEscClose);
    }
    
    close() {
        this._popup.classList.remove(popupOpenedSelector);
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape' ) {
            this.close();
        }
    }

    setEventListeners() {
        this._popup.addEventListener('click', (evt) => {
            if (evt.target === evt.currentTarget || evt.target.classList.contains(popupCloseBtnSelector)) {
                this.close();
            }
        });
    }
}