import './index.css';

import Card from "../components/Card.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import {
    initialCards,
    cardListSection,
    formObj,
    popupEditProfileSelector,
    popupAddCardSelector,
    popupWithImageSelector,
    formEditProfileSelector,
    formAddCardSelector
        } from '../utils/constants.js';

/** информация о пользователе */
const userInfo = new UserInfo({
    name: '.profile__user-name', 
    desc: '.profile__user-description'
})

/** попап с картинкой */
const popupWithImage = new PopupWithImage(popupWithImageSelector);

/** попапы с формой */
const popupEditProfile = new PopupWithForm({
    selector: popupEditProfileSelector, 
    handleSubmitForm: (inputs) => {
        // сохраним информацию о пользователе
        console.log(inputs);
        userInfo.setUserInfo(inputs);
    }
});
const popupAddCard = new PopupWithForm({
    selector: popupAddCardSelector, 
    handleSubmitForm: (inputs) => {
        // создаем карточку и добавляем в рендер
        const sectionObj = new Section({
            items: [inputs],
            renderer: (item) => {
                const cardElement = new Card(item, '#card-template',
                    (cardCaption, cardURL) => {
                    popupWithImage.open({ image: cardURL, caption: cardCaption })
                }).generate();
                sectionObj.addItem(cardElement, true);
            },
        },
        cardListSection
        );
        sectionObj.renderItems();
    }
});

// ** валидаторы форм */
const formEditProfileValidator = new FormValidator(formObj, document.forms[formEditProfileSelector]);
const formAddCardValidator = new FormValidator(formObj, document.forms[formAddCardSelector]);

/** включить валидацию форм */
formEditProfileValidator.enableValidation();
formAddCardValidator.enableValidation();


/** первоначальная загрузка карточек */
const cardsList = new Section({
    items: initialCards,
    renderer: (item) => {
        const cardElement = new Card(item, '#card-template',
            (cardCaption, cardURL) => {
            popupWithImage.open({ image: cardURL, caption: cardCaption })
        }).generate();
        cardsList.addItem(cardElement);
    },
},
cardListSection
);
cardsList.renderItems();


/** слушатели открытия попапов */
document.querySelector('.profile__edit-btn').
addEventListener('click', () => {
    popupEditProfile.setInputValues(userInfo.getUserInfo());
    popupEditProfile.open();
});

document.querySelector('.profile__add-btn').
addEventListener('click', () => {
    popupAddCard.open();
});


