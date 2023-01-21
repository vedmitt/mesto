import {initialCards} from './cards.js';
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const bodyContainer = document.querySelector('body');
const cardsContainer = bodyContainer.querySelector('#photo-grid-container');

// профиль
const profileContainer = bodyContainer.querySelector('.profile');
const profileName = profileContainer.querySelector('.profile__user-name');
const profileJob = profileContainer.querySelector('.profile__user-description');
const buttonEditProfile = bodyContainer.querySelector('.profile__edit-btn');
const buttonAddCard =  bodyContainer.querySelector('.profile__add-btn');

// попапы и формы
const popupEditProfile = bodyContainer.querySelector('#popup-edit-profile');
const formEditProfile = document.forms['form-edit-profile'];
const inputNameEditProfileForm = formEditProfile['user-name'];
const inputJobEditProfileForm = formEditProfile['user-job'];

const popupAddCard = bodyContainer.querySelector('#popup-add-card');
const formAddCard = document.forms['form-add-card'];
const inputTitleAddCardForm = formAddCard['card-title'];
const inputUrlAddCardForm = formAddCard['card-link'];

// попап просмотра изображения
const popupViewImage = bodyContainer.querySelector('#popup-view-image');
const captionPopupViewImage = popupViewImage.querySelector('.popup-img__caption');
const imagePopupViewImage = popupViewImage.querySelector('.popup-img__image');

// валидаторы форм
const formObj = {
    formInput: 'form__input',
    formSubmitBtn: 'form__save-btn',
    formSubmitBtnInactive: 'form__save-btn_inactive',
    formInputTypeError: 'form__input_type_error'
};
const formEditProfileValidator = new FormValidator(formObj, formEditProfile);
const formAddCardValidator = new FormValidator(formObj, formAddCard);


/** включить валидацию форм */
formEditProfileValidator.enableValidation();
formAddCardValidator.enableValidation();

/** первоначальная загрузка карточек */
initialCards.forEach((item) => {
    renderCard({title: item.name, url: item.link});
});

/** Функции обработки */
function openPopup(popup) {
    popup.classList.add('popup_opened');
    // добавим слушатель закрытия попапа нажатием Esc
    bodyContainer.addEventListener('keydown', closePopupByEsc);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    // удвалим слушатель закрытия попапа нажатием Esc
    bodyContainer.removeEventListener('keydown', closePopupByEsc);
}

function closePopupByEsc(evt) {
    if (evt.key === 'Escape') {
        const popup = bodyContainer.querySelector('.popup_opened');
        closePopup(popup);
    }
}

function showPopupEditProfile() {
    formEditProfileValidator.hideAllInputErrors();
    setEditInfoForm();
    formEditProfileValidator.toggleButtonState();
    openPopup(popupEditProfile);
}

function showPopupAddCard() {
    formAddCardValidator.hideAllInputErrors();
    formAddCardValidator.inactiveSaveBtn();
    formAddCard.reset();
    openPopup(popupAddCard);
}

export function showPopupViewImage(cardCaption='', cardURL='') {
    imagePopupViewImage.src = cardURL;
    imagePopupViewImage.alt = cardCaption;
    captionPopupViewImage.textContent = cardCaption;
    openPopup(popupViewImage);
}

/** присваевает данным о пользователе новые значения и наоборот */
function setProfileInfo() {
    profileName.textContent = inputNameEditProfileForm.value;
    profileJob.textContent = inputJobEditProfileForm.value;
}

function setEditInfoForm() {
    inputNameEditProfileForm.value = profileName.textContent;
    inputJobEditProfileForm.value = profileJob.textContent;
}

/** функция отправки формы */
function handleSubmitProfileForm(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    if (!formEditProfileValidator.hasInvalidInputInForm()) {
        setProfileInfo();
        closePopup(popupEditProfile);
    }
}

function handleSubmitCardForm(evt) {
    evt.preventDefault();
    if (!formAddCardValidator.hasInvalidInputInForm()) {
        renderCard({
            title: inputTitleAddCardForm.value,
            url: inputUrlAddCardForm.value
        },true);
        closePopup(popupAddCard);
        formAddCard.reset();
    }
}

/** добавить карточку на страницу */
function renderCard(cardData, isPrepend=false) {
    const card = new Card(cardData, '#card-template').renderCard();

    // добавление карточки в начало или конец контейнера
    if (!isPrepend) {
        cardsContainer.append(card);
    } else {
        cardsContainer.prepend(card);
    }
}

/** слушатели закрытия попапов */
function setClosePopupListeners() {
    const popups = bodyContainer.querySelectorAll('.popup');
    popups.forEach((popup) => {
        popup.addEventListener('click', function (evt) {
        if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close-btn')) {
            closePopup(popup);
        }
    });
});
}

/** Слушатели кнопок */
/** слушатели открытия попапов */
buttonEditProfile.addEventListener('click', showPopupEditProfile);
buttonAddCard.addEventListener('click', showPopupAddCard);

/** установить слушатели закрытия попапов */
setClosePopupListeners();

/** кнопка отправки формы приклепляется к форме */
formEditProfile.addEventListener('submit', handleSubmitProfileForm);
formAddCard.addEventListener('submit', handleSubmitCardForm);