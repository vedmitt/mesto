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

    _getElement() {
        this._element = document
            .querySelector(this._template)
            .content
            .querySelector('.card')
            .cloneNode(true);
    }

    _setEventListeners() {
        // подключение кнопки лайка
        this._likeCounter = this._element.querySelector('.card__like-counter');
        this._likeCardBtn = this._element.querySelector('.card__like-btn');

        // обозначим мои лайки
        const ids = [];
        this._likes.forEach((item) => {
            ids.push(item._id);
        })

        if (ids.includes(this._myUserId)) {
            this._likeCardBtn.classList.toggle('card__like-btn_active');
        }

        this._likeCardBtn.addEventListener('click', () => {
            this._handleLikeCard();
        });

        // подключение просмотра изображения
        this._element.querySelector('.card__image')
            .addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        });

        // подключение кнопки удаления карточки
        this._trashBtn = this._element.querySelector('.card__trash-btn');

        if (this._myUserId === this._ownerId) {
            this._trashBtn.addEventListener('click', () => {
                this._handleRemoveCard(this);  // открывает попап с подтверждением удаления
                });
        } else {
            this._trashBtn.classList.add('card__trash-btn_hidden');
        }
    }

    remove() {
        this._element.remove();
    }

    increaseLikeCount() {
        this._likeCounter.textContent++;
    }

    decreaseLikeCount() {
        this._likeCounter.textContent--;
    }

    _handleLikeCard(){
        this._likeCardBtn.classList.toggle('card__like-btn_active');

        if (this._likeCardBtn.classList.contains('card__like-btn_active')) {
            this._handleIncreaseLikes(this);
        } else {
            this._handleDecreaseLikes(this);
        }
    }

    generate() {
        this._getElement();
        this._setEventListeners();

        this._cardElementTitle = this._element.querySelector('.card__title');
        this._cardElementImage = this._element.querySelector('.card__image');
        this._cardElementLikes = this._element.querySelector('.card__like-counter');

        this._cardElementTitle.textContent = this._name;
        this._cardElementImage.src = this._link;
        this._cardElementImage.alt = this._name;
        this._cardElementLikes.textContent = this._likes.length || 0;

        return this._element
    }
}
