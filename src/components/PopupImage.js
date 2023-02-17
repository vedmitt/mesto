import Popup from "./Popup.js";
import {
    popupImageCaptionSelector,
    popupImageSelector
} from '../utils/constants.js';

export default class PopupImage extends Popup {
    constructor(selector) {
        super(selector);
        this._caption = this._popup.querySelector(popupImageCaptionSelector);
        this._image = this._popup.querySelector(popupImageSelector);
    }

    open({ image, caption }) {
        this._image.src = image;
        this._image.alt = caption;
        this._caption.textContent = caption;
        super.open();
    }
}