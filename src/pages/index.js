import './index.css';

import Card from "../components/Card.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import PopupImage from "../components/PopupImage.js";
import PopupForm from "../components/PopupForm.js";
import PopupConfirm from "../components/PopupConfirm.js";
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
    profileUserNameSelector,
    profileUserDescSelector,
    profileAvatarSelector,
    cardTemplateSelector,
    profileAvatar,
    profileEditBtn,
    profileAddBtn
        } from '../utils/constants.js';

/** API */
const api = new Api({
        baseUrl: `${serverUrl}/v1/${groupId}`,
        headers: {
          authorization: personalToken,
          'Content-Type': 'application/json'
        }
      }); 

/** первоначальная загрузка информации о пользователе и карточек с сервера */
getInitialData();

/** информация о пользователе */
const userInfo = new UserInfo({
    nameSelector: profileUserNameSelector, 
    aboutSelector: profileUserDescSelector,
    avatarSelector: profileAvatarSelector
})

/** инициализация объекта рендеринга карточек */
const cardsSection = new Section({
    renderer: (item) => {
        const cardElement = createCard(item);
        cardsSection.appendItem(cardElement);
    },
},
cardListSection
);

/** попап с картинкой */
const popupWithImage = new PopupImage(popupWithImageSelector);

/** попап удаления изображения */
const popupRemoveCard = new PopupConfirm(popupDelCardSelector);

/** попапы с формой */
const popupEditProfile = new PopupForm({
    selector: popupEditProfileSelector, 
    handleSubmitForm: (inputs) => {
        // сохраним информацию о пользователе
        popupEditProfile.renderLoading(true);
        api.updateUserInfo(inputs)
            .then(userData => {
                userInfo.setUserInfo(userData);
                popupEditProfile.close();
            })
            .catch(err => {
                return `Ошибка редактирования профиля пользователя: ${err}`;
            })
            .finally (() => {
                popupEditProfile.renderLoading(false);
            });
    }
});

const popupEditAvatar = new PopupForm({
    selector: popupEditAvatarSelector,
    handleSubmitForm: (input) => {
        // сохраним аватар пользователя
        popupEditAvatar.renderLoading(true);
        api.updateAvatar(input)
            .then(userData => {
                userInfo.setAvatar(userData.avatar);
                popupEditAvatar.close();
            })
            .catch(err => {
                return `Ошибка загрузки аватара пользователя: ${err}`;
            })
            .finally (() => {
                popupEditAvatar.renderLoading(false);
            });
    }
})

/** попап добавления карточки */
const popupAddCard = new PopupForm({
    selector: popupAddCardSelector, 
    handleSubmitForm: (inputs) => {
        // отправляем карточку на сервер
        popupAddCard.renderLoading(true);
        api.addCard(inputs)
            .then(cardData => {
                // создаем карточку и добавляем в рендер
                const cardElement = createCard(cardData);
                cardsSection.prependItem(cardElement);
                popupAddCard.close();
            })
            .catch(err => {
                return `Ошибка отправки карточки на сервер: ${err}`;
            })
            .finally (() => {
                popupAddCard.renderLoading(false);
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


function getInitialData() {
    Promise.all([
        api.getUserInfo(),
        api.getInitialCards()
    ])
    .then(([userData, cards]) => {
        // рендер информации о пользователе
        userInfo.setUserInfo(userData);
        userInfo.setAvatar(userData.avatar);
        // рендер карточек
        cardsSection.renderItems(cards);
    })
    .catch((err)=>{
        return `Ошибка загрузки информации: ${err}`;
    })
}

/** функция создания карточки */
function createCard(cardData) {
    const card = new Card(
        cardData, 
        userInfo.getId(),
        cardTemplateSelector,
        // открытие попапа с картинкой
        (cardCaption, cardURL) => {
            popupWithImage.open({ image: cardURL, caption: cardCaption });
        },
        // открытие попапа с удалением
        (card) => {
            popupRemoveCard.open();
            popupRemoveCard.setCallback(() => {
                removeCard(card);
            });
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

function removeCard(card) {
    // удалим карточку с сервера
    api.removeCard(card.getId())
    .then(() => {
        card.remove();
        popupRemoveCard.close();
    })
    .catch(err => {
        return `Ошибка удаления карточки: ${err}`;
    });
}

function increaseLikeCount(card) {
    // поставить лайк
    api.addLike(card.getId())
        .then((data) => {
            card.updateLikes(data.likes);
        })
        .catch(err => {
            return `Ошибка установки лайка: ${err}`;
        });
}

function decreaseLikeCount(card) {
    // удалить лайк
    api.removeLike(card.getId())
        .then((data) => {
            card.updateLikes(data.likes);
        })
        .catch(err => {
            return `Ошибка установки лайка: ${err}`;
        });
}

function handleProfileAvatarClick() {
    popupEditAvatar.setInputValues(userInfo.getAvatar());
    formEditAvatarValidator.resetValidation();
    popupEditAvatar.open();
}

function handleProfileEditBtnClick() {
    popupEditProfile.setInputValues(userInfo.getUserInfo());
    formEditProfileValidator.resetValidation();
    popupEditProfile.open();
}

function handleProfileAddBtnClick() {
    formAddCardValidator.resetValidation();
    popupAddCard.open();
}


/** слушатели открытия попапов */
profileAvatar.addEventListener('click', handleProfileAvatarClick);
profileEditBtn.addEventListener('click', handleProfileEditBtnClick);
profileAddBtn.addEventListener('click', handleProfileAddBtnClick);
