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
    validationConfig,
    popupEditProfileSelector,
    popupAddCardSelector,
    popupWithImageSelector,
    formEditProfileSelector,
    formAddCardSelector,
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

const cardsList = new Section({
    items: [],
    renderer: (item) => {
        const cardElement = createCard(item);
        cardsList.addItem(cardElement);
    },
},
cardListSection
);

const popupAddCard = new PopupWithForm({
    selector: popupAddCardSelector, 
    handleSubmitForm: (inputs) => {
        // создаем карточку и добавляем в рендер
        cardsList.setRenderedItems([inputs], true);
        cardsList.renderItems();
    }
});

// ** валидаторы форм */
const formEditProfileValidator = new FormValidator(validationConfig, document.forms[formEditProfileSelector]);
const formAddCardValidator = new FormValidator(validationConfig, document.forms[formAddCardSelector]);

/** включить валидацию форм */
formEditProfileValidator.enableValidation();
formAddCardValidator.enableValidation();


/** первоначальная загрузка карточек */
cardsList.setRenderedItems(initialCards);
cardsList.renderItems();

//** функция создания карточки */
function createCard(item) {
    const card = new Card(item, '#card-template',
            (cardCaption, cardURL) => {
            popupWithImage.open({ image: cardURL, caption: cardCaption })
        })
    return card.generate();
}

/** слушатели открытия попапов */
const profileEditBtn = document.querySelector('.profile__edit-btn');
const profileAddBtn = document.querySelector('.profile__add-btn');

profileEditBtn.addEventListener('click', () => {
    popupEditProfile.setInputValues(userInfo.getUserInfo());
    formEditProfileValidator.resetValidation();
    popupEditProfile.open();
});


profileAddBtn.addEventListener('click', () => {
    formAddCardValidator.resetValidation();
    popupAddCard.open();
});


