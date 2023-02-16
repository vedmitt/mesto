export default class Popup {
    constructor(selector) {
        this._popup = document.querySelector(selector);
        this._bodyContainer = document.querySelector('body');
        this._handleEscClose = this._handleEscClose.bind(this);

        this.setEventListeners();
    }

    open() {
        this._popup.classList.add('popup_opened');
        // добавим слушатель закрытия попапа нажатием Esc
        this._bodyContainer.addEventListener('keydown', this._handleEscClose);
    }
    
    close() {
        this._popup.classList.remove('popup_opened');
        this._bodyContainer.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape' ) {
            this.close();
        }
    }

    setEventListeners() {
        this._popup.addEventListener('click', (evt) => {
            if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close-btn')) {
                this.close();
            }
        });
    }
}