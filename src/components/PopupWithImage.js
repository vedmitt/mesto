import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector);
        this._caption = this._popup.querySelector('.popup-img__caption');
        this._image = this._popup.querySelector('.popup-img__image');
    }

    open({ image, caption }) {
        this._image.src = image;
        this._image.alt = caption;
        this._caption.textContent = caption;
        super.open();
    }
}