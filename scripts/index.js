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
const btnSubmitProfileForm = formEditProfile.querySelector('.form__save-btn');
const inputsFormEditProfile = Array.from(formEditProfile.querySelectorAll('.form__input'));

const popupAddCard = bodyContainer.querySelector('#popup-add-card');
const formAddCard = document.forms['form-add-card'];
const inputTitleAddCardForm = formAddCard['card-title'];
const inputUrlAddCardForm = formAddCard['card-link'];
const btnSubmitAddCard = formAddCard.querySelector('.form__save-btn');

// попап просмотра изображения
const popupViewImage = bodyContainer.querySelector('#popup-view-image');
const captionPopupViewImage = popupViewImage.querySelector('.popup-img__caption');
const imagePopupViewImage = popupViewImage.querySelector('.popup-img__image');

// шаблон карточки
const cardTemplate = document.querySelector('#card-template').content;
const cardItem = cardTemplate.querySelector('.card');

const formObj = {
    form: 'form',
    formInput: 'form__input',
    formSubmitBtn: 'form__save-btn',
    formSubmitBtnInactive: 'form__save-btn_inactive',
    formInputTypeError: 'form__input_type_error'
};

/** включить валидацию форм */
enableValidation(formObj);

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
    hideAllInputErrors(formEditProfile, formObj);
    setEditInfoForm();
    toggleButtonState(inputsFormEditProfile, btnSubmitProfileForm, formObj);
    openPopup(popupEditProfile);
}

function showPopupAddCard() {
    hideAllInputErrors(formAddCard, formObj);
    inactiveSaveBtn(btnSubmitAddCard, formObj);
    formAddCard.reset();
    openPopup(popupAddCard);
}

function showPopupViewImage(cardCaption='', cardURL='') {
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
    if (!hasInvalidInputInForm(formEditProfile, formObj)) {
        setProfileInfo();
        closePopup(popupEditProfile);
    }
}

function handleSubmitCardForm(evt) {
    evt.preventDefault();
    if (!hasInvalidInputInForm(formAddCard, formObj)) {
        renderCard({
            title: inputTitleAddCardForm.value,
            url: inputUrlAddCardForm.value
        },true);
        closePopup(popupAddCard);
        formAddCard.reset();
    }
}

/** возвращает пустую карточку из шаблона */
function createCardFromTemplate(cardData) {
    const cardElement = cardItem.cloneNode(true);
    const cardElementTitle = cardElement.querySelector('.card__title');
    const cardElementImage = cardElement.querySelector('.card__image');
    const removeCardBtn = cardElement.querySelector('.card__trash-btn');
    const likeCardBtn = cardElement.querySelector('.card__like-btn');

    cardElementTitle.textContent = cardData.title;
    cardElementImage.src = cardData.url;
    cardElementImage.alt = cardData.title;

    // подключение кнопки удаления карточки
    removeCardBtn.addEventListener('click', function() {
        cardElement.remove();
    });

    // подключение кнопки лайка
    likeCardBtn.addEventListener('click', function () {
        likeCardBtn.classList.toggle('card__like-btn_active');
    });

    // подключение просмотра изображения
    const image = cardElement.querySelector('.card__image');
    image.addEventListener('click', function() {
        showPopupViewImage(cardData.title, cardData.url);
    });

    return cardElement
}

/** добавить карточку на страницу */
function renderCard(cardData, isPrepend=false) {
    const cardElement = createCardFromTemplate(cardData);

    // добавление карточки в начало или конец контейнера
    if (!isPrepend) {
        cardsContainer.append(cardElement);
    } else {
        cardsContainer.prepend(cardElement);
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