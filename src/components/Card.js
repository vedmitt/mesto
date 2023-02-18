import {
    cardSelector,
    cardLikeCounterSelector,
    cardLikeBtnSelector,
    cardLikeBtnActiveSelector,
    cardImageSelector,
    cardTrashBtnSelector,
    cardTrashBtnHiddenSelector,
    cardTitleSelector
} from '../utils/constants.js';

export default class Card {
    constructor({ _id, name, link, likes, owner }, myUserId, template, handleCardClick, handleRemoveCard, handlePutLike, handleDelLike) {
        this._id = _id;
        this._name = name;
        this._link = link;
        this._likes = likes;
        this._myUserId = myUserId;
        this._ownerId = owner._id;
        this._template = template;
        this._handleCardClick = handleCardClick;
        this._handleRemoveCard = handleRemoveCard;

        this._handleIncreaseLikes = handlePutLike;
        this._handleDecreaseLikes = handleDelLike;
    }

    getId() {
        return this._id;
    }

    _getElement() {
        this._element = document
            .querySelector(this._template)
            .content
            .querySelector(cardSelector)
            .cloneNode(true);
    }

    isLiked(arr, val) {
        return arr.some(function({_id}) {
          return val === _id;
        });
      }

    _setInitialLikeState() {
        // обозначим мои лайки
        if (this.isLiked(this._likes, this._myUserId)) {
            this._likeCardBtn.classList.toggle(cardLikeBtnActiveSelector);
        }
    }

    _setEventListeners() {
        // подключение кнопки лайка
        this._likeCardBtn = this._element.querySelector(cardLikeBtnSelector);
        this._likeCardBtn.addEventListener('click', () => {
            this._handleLikeCard();
        });

        // подключение просмотра изображения
        this._element.querySelector(cardImageSelector)
            .addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        });

        // подключение кнопки удаления карточки
        this._trashBtn = this._element.querySelector(cardTrashBtnSelector);

        if (this._myUserId === this._ownerId) {
            this._trashBtn.addEventListener('click', () => {
                this._handleRemoveCard(this);  // открывает попап с подтверждением удаления
                });
        } else {
            this._trashBtn.classList.add(cardTrashBtnHiddenSelector);
        }
    }

    remove() {
        this._element.remove();
        this._element = null;
    }

    updateLikes(likes) {
        this._cardElementLikes.textContent = likes.length || 0;
        this._likeCardBtn.classList.toggle(cardLikeBtnActiveSelector);
    }

    _handleLikeCard(){
        if (!this._likeCardBtn.classList.contains(cardLikeBtnActiveSelector)) {
            this._handleIncreaseLikes(this);
        } else {
            this._handleDecreaseLikes(this);
        }
    }

    generate() {
        this._getElement();
        this._setEventListeners();

        this._cardElementTitle = this._element.querySelector(cardTitleSelector);
        this._cardElementImage = this._element.querySelector(cardImageSelector);
        this._cardElementLikes = this._element.querySelector(cardLikeCounterSelector);

        this._cardElementTitle.textContent = this._name;
        this._cardElementImage.src = this._link;
        this._cardElementImage.alt = this._name;
        this._cardElementLikes.textContent = this._likes.length || 0;
        this._setInitialLikeState();

        return this._element
    }
}
