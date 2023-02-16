import './index.css';

import Card from "../components/Card.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import Section from "../components/Section.js";
import Api from "../components/Api.js";
import {
    serverUrl,
    groupId,
    personalToken,
    cardListSection,
    validationConfig,
    popupEditProfileSelector,
    popupEditAvatarSelector,
    popupAddCardSelector,
    popupDelCardSelector,
    popupWithImageSelector,
    formEditAvatarSelector,
    formEditProfileSelector,
    formAddCardSelector,
        } from '../utils/constants.js';

/** API */
const api = new Api({serverUrl, groupId, personalToken});

/** первоначальная загрузка информации о пользователе и карточек с сервера */
getUserInfo();
getInitialCards();

/** информация о пользователе */
const userInfo = new UserInfo({
    name: '.profile__user-name', 
    about: '.profile__user-description',
    avatar: '.profile__avatar'
})

/** попап с картинкой */
const popupWithImage = new PopupWithImage(popupWithImageSelector);

/** попап удаления изображения */
const popupRemoveCard = new PopupWithConfirmation({
    selector: popupDelCardSelector, 
    handleOkClick: (card) => {
        // удалим карточку с сервера
        api.removeCard(card._id)
            .then(data => {
                card.remove();
                console.log(data.message);
            })
            .catch(err => {
                return `Ошибка удаления карточки: ${err}`;
            });
    }
});

/** попапы с формой */
const popupEditProfile = new PopupWithForm({
    selector: popupEditProfileSelector, 
    handleSubmitForm: (inputs) => {
        // сохраним информацию о пользователе
        api.updateUserInfo(inputs)
            .then(data => {
                userInfo.setUserInfo(inputs);
                console.log(`Информация о пользователе ${data.name} обновлена`);
            })
            .catch(err => {
                return `Ошибка редактирования профиля пользователя: ${err}`;
            });
    }
});

const popupEditAvatar = new PopupWithForm({
    selector: popupEditAvatarSelector,
    handleSubmitForm: (input) => {
        // сохраним аватар пользователя
        api.updateAvatar(input)
            .then(data => {
                userInfo.setAvatar(data.avatar);
                console.log(`Аватар пользователя обновлен`);
            })
            .catch(err => {
                return `Ошибка загрузки аватара пользователя: ${err}`;
            });
    }
})

/** инициализация объекта рендеринга карточек */
const cardsList = new Section({
    items: [],
    renderer: (item) => {
        const cardElement = createCard(item);
        cardsList.addItem(cardElement);
    },
},
cardListSection
);

/** попап добавления карточки */
const popupAddCard = new PopupWithForm({
    selector: popupAddCardSelector, 
    handleSubmitForm: (inputs) => {
        // отправляем карточку на сервер
        api.addCard(inputs)
            .then(card => {
                // создаем карточку и добавляем в рендер
                cardsList.setRenderedItems([card], true);
                cardsList.renderItems();
                console.log(`Карточка ${card.name} добавлена`);
            })
            .catch(err => {
                return `Ошибка отправки карточки на сервер: ${err}`;
            });
    }
});

// ** валидаторы форм */
const formEditAvatarValidator = new FormValidator(validationConfig, document.forms[formEditAvatarSelector]);
const formEditProfileValidator = new FormValidator(validationConfig, document.forms[formEditProfileSelector]);
const formAddCardValidator = new FormValidator(validationConfig, document.forms[formAddCardSelector]);

/** включить валидацию форм */
formEditAvatarValidator.enableValidation();
formEditProfileValidator.enableValidation();
formAddCardValidator.enableValidation();

/** функция создания карточки */
function createCard(item) {
    const card = new Card(
        item, 
        userInfo.getId(),
        '#card-template',
        // открытие попапа с картинкой
        (cardCaption, cardURL) => {
            popupWithImage.open({ image: cardURL, caption: cardCaption });
        },
        // открытие попапа с удалением
        (card) => {
            popupRemoveCard.open(card);
        },
        // функция лайка карточки
        (card) => {
            increaseLikeCount(card);
        },
        (card) => {
            decreaseLikeCount(card);
        }
        )
    return card.generate();
}

function increaseLikeCount(card) {
    api.addLike(card._id)
        .then(() => {
            card.increaseLikeCount();
            console.log('Лайк поставлен!');
        })
        .catch(err => {
            return `Ошибка установки лайка: ${err}`;
        });
}

function decreaseLikeCount(card) {
    api.delLike(card._id)
        .then(() => {
            card.decreaseLikeCount();
            console.log('Лайк удален!');
        })
        .catch(err => {
            return `Ошибка установки лайка: ${err}`;
        });
}

/** функции запросов к данным */
function getUserInfo() {
    api.getUserInfo()
      .then(data => {
          // рендер информации о пользователе
          userInfo.setUserInfo(data);
          userInfo.setAvatar(data.avatar);
      })
      .catch(err => {
          return `Ошибка загрузки информации о пользователе: ${err}`;
      });
}

function getInitialCards() {
    api.getInitialCards()
    .then(data => {
        // рендер карточек
        cardsList.setRenderedItems(data);
        cardsList.renderItems();
    })
    .catch(err => {
        return `Ошибка загрузки карточек с сервера: ${err}`;
    });
}


/** слушатели открытия попапов */
const profileAvatar = document.querySelector('.profile__avatar-overlay');
const profileEditBtn = document.querySelector('.profile__edit-btn');
const profileAddBtn = document.querySelector('.profile__add-btn');

profileAvatar.addEventListener('click', () => {
    popupEditAvatar.setInputValues(userInfo.getAvatar());
    formEditAvatarValidator.resetValidation();
    popupEditAvatar.open();
});

profileEditBtn.addEventListener('click', () => {
    popupEditProfile.setInputValues(userInfo.getUserInfo());
    formEditProfileValidator.resetValidation();
    popupEditProfile.open();
});


profileAddBtn.addEventListener('click', () => {
    formAddCardValidator.resetValidation();
    popupAddCard.open();
});


