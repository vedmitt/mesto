const bodyContainer = document.querySelector('body');
const cardsContainer = bodyContainer.querySelector('#photo-grid-container');

// профиль
const profileContainer = bodyContainer.querySelector('.profile');
const profileName = profileContainer.querySelector('.profile__user-name');
const profileJob = profileContainer.querySelector('.profile__user-description');

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

// шаблон карточки
const cardTemplate = document.querySelector('#card-template').content;
const cardItem = cardTemplate.querySelector('.card');

/** включить валидацию форм */
enableValidation();

/** первоначальная загрузка карточек */
initialCards.forEach((item) => {
    renderCard({title: item.name, url: item.link});
});

/** Функции обработки */
function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function showPopupEditProfile() {
    hideAllInputErrors(formEditProfile);
    setEditInfoForm();
    openPopup(popupEditProfile);
}

function showPopupAddCard() {
    hideAllInputErrors(formAddCard);
    formAddCard.reset();
    openPopup(popupAddCard);
}

function showPopupViewImage(cardCaption='', cardURL='') {
    imagePopupViewImage.src = cardURL;
    imagePopupViewImage.alt = cardCaption;
    captionPopupViewImage.textContent = cardCaption;
    openPopup(popupViewImage);
}

/** возвращает пустую карточку из шаблона */
function createCardFromTemplate(cardData) {
    const cardElement = cardItem.cloneNode(true);
    const cardElementTitle = cardElement.querySelector('.card__title');
    const cardElementImage = cardElement.querySelector('.card__image');

    cardElementTitle.textContent = cardData.title;
    cardElementImage.src = cardData.url;
    cardElementImage.alt = cardData.title;

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
    if (!hasInvalidInputInForm(formEditProfile)) {
        setProfileInfo();
        closePopup(popupEditProfile);
    }
}

function handleSubmitCardForm(evt) {
    evt.preventDefault();
    if (!hasInvalidInputInForm(formAddCard)) {
        renderCard({
            title: inputTitleAddCardForm.value,
            url: inputUrlAddCardForm.value
        },true);
        closePopup(popupAddCard);
        formAddCard.reset();
    }
}

/** Слушатели кнопок */
/** закрывает любой попап */
bodyContainer.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup__close-btn')) {
        const popup = evt.target.parentElement.parentElement;
        closePopup(popup);
    } else if (evt.target.classList.contains('popup')) {
        closePopup(evt.target);
    }
});

/** закрывает попап нажатием на esc */
bodyContainer.addEventListener('keydown', function (evt) {
    const popup = bodyContainer.querySelector('.popup_opened');
    if (evt.key === 'Escape' && popup) {
        closePopup(popup);
    }
});

/** открывает попапы профиля пользователя */
profileContainer.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('profile__edit-btn')) {
        showPopupEditProfile();
    } else if (evt.target.classList.contains('profile__add-btn')) {
        showPopupAddCard();
    }
});

/** навесим слушателя на контейнер с карточками */
cardsContainer.addEventListener('click', function (evt) {
    const element = evt.target;
   if (element.classList.contains('card__image')) {
        const card = element.parentElement;
        const title = card.querySelector('.card__title').textContent;
        const url = card.querySelector('.card__image').src;
        showPopupViewImage(title, url);
   } else if (element.classList.contains('card__trash-btn')) {
       const card = element.parentElement;
       card.remove();
   } else if (element.classList.contains('card__like-btn')) {
       element.classList.toggle('card__like-btn_active');
   }
});

/** кнопка отправки формы приклепляется к форме */
formEditProfile.addEventListener('submit', handleSubmitProfileForm);
formAddCard.addEventListener('submit', handleSubmitCardForm);