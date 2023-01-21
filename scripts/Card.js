import {showPopupViewImage} from "./index.js";

export default class Card {
    constructor(cardData, template) {
        this._title = cardData.title;
        this._url = cardData.url;
        this._template = template;
    }

    _getElement() {
        this._element = document
            .querySelector(this._template)
            .content
            .querySelector('.card')
            .cloneNode(true);
    }

    _setEventListeners() {
        this._likeCardBtn = this._element.querySelector('.card__like-btn');

        // подключение кнопки удаления карточки
        this._element.querySelector('.card__trash-btn')
            .addEventListener('click', () => {
            this._handleRemoveCard();
        });

        // подключение кнопки лайка
        this._likeCardBtn.addEventListener('click', () => {
            this._handleLikeCard();
        });

        // подключение просмотра изображения
        this._element.querySelector('.card__image')
            .addEventListener('click', () => {
            this._handleShowCard();
        });
    }

    _handleRemoveCard() {
        this._element.remove();
    }

    _handleLikeCard(){
        this._likeCardBtn.classList.toggle('card__like-btn_active');
    }

    _handleShowCard(){
        showPopupViewImage(this._title, this._url);
    }

    renderCard() {
        this._getElement();
        this._setEventListeners();

        this._cardElementTitle = this._element.querySelector('.card__title');
        this._cardElementImage = this._element.querySelector('.card__image');

        this._cardElementTitle.textContent = this._title;
        this._cardElementImage.src = this._url;
        this._cardElementImage.alt = this._title;

        return this._element
    }
}
