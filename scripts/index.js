const bodyContainer = document.querySelector('body');
const cardsContainer = bodyContainer.querySelector('#photo-grid-container');

// профиль
const profileName = bodyContainer.querySelector('.profile__user-name');
const profileJob = bodyContainer.querySelector('.profile__user-description');
const buttonEditProfile = bodyContainer.querySelector('.profile__edit-btn');
const buttonAddCard =  bodyContainer.querySelector('.profile__add-btn');

// попап редактирования профиля
const popupEditProfile = bodyContainer.querySelector('#popup-edit-profile');
const formPopupEditProfile = popupEditProfile.querySelector('.popup__form');
const inputNamePopupEditProfile = popupEditProfile.querySelector('.popup__input_name_user-name');
const inputJobPopupEditProfile = popupEditProfile.querySelector('.popup__input_name_job');
const buttonClosePopupEditProfile = popupEditProfile.querySelector('.popup__close-btn');

// попап добавления карточки
const popupAddCard = bodyContainer.querySelector('#popup-add-card');
const formPopupAddCard = popupAddCard.querySelector('.popup__form');
const inputTitlePopupAddCard = popupAddCard.querySelector('.popup__input_name_title');
const inputUrlPopupAddCard = popupAddCard.querySelector('.popup__input_name_url');
const buttonClosePopupAddCard = popupAddCard.querySelector('.popup__close-btn');

// попап просмотра изображения
const popupViewImage = bodyContainer.querySelector('#popup-view-image');
const captionPopupViewImage = popupViewImage.querySelector('.popup-img__caption');
const imagePopupViewImage = popupViewImage.querySelector('.popup-img__image');
const buttonClosePopupViewImage = popupViewImage.querySelector('.popup__close-btn');

// шаблон карточки
const cardTemplate = document.querySelector('#card-template').content;
const cardItem = cardTemplate.querySelector('.card');

/** первоначальная загрузка карточек */
initialCards.forEach((item) => {
    renderCard({title: item.name, url: item.link});
});

/** подключаем обработчики событий */
/** кнопка редактирования профиля
 * открывает попап для редактирования (изначально заполнен) */
buttonEditProfile.addEventListener('click', function(evt) {
    setProfileInfo(false);
    openPopup(popupEditProfile);
});

/** кнопка добавления карточки открывает попап для добавления (изначально пуст) */
buttonAddCard.addEventListener('click', function (evt) {
    openPopup(popupAddCard);
});

/** кнопка закрытия попапа */
buttonClosePopupEditProfile.addEventListener('click', function (evt) {
    closePopup(popupEditProfile);
});

buttonClosePopupAddCard.addEventListener('click', function (evt) {
   closePopup(popupAddCard);
});

buttonClosePopupViewImage.addEventListener('click', function (evt) {
   closePopup(popupViewImage);
});

/** кнопка отправки формы приклепляется к форме */
formPopupEditProfile.addEventListener('submit', handleSubmitProfileForm);
formPopupAddCard.addEventListener('submit', handleSubmitCardForm);

/** функция отправки формы */
function handleSubmitProfileForm (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    setProfileInfo();
    closePopup(popupEditProfile);
}

function handleSubmitCardForm(evt) {
    evt.preventDefault();
    renderCard({
        title: inputTitlePopupAddCard.value,
        url: inputUrlPopupAddCard.value
    },true);
    closePopup(popupAddCard);
    formPopupAddCard.reset();
}

/** функции открытия и закрытия попапа */
function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

/** присваевает данным о пользователе новые значения и наоборот */
function setProfileInfo(fromFormToProfile=true) {
    if (fromFormToProfile) {
        profileName.textContent = inputNamePopupEditProfile.value;
        profileJob.textContent = inputJobPopupEditProfile.value;
    } else {
        inputNamePopupEditProfile.value = profileName.textContent;
        inputJobPopupEditProfile.value = profileJob.textContent;
    }
}

/** возвращает пустую карточку из шаблона с базовыми функциями */
function createCardFromTemplate (cardData) {
    const cardElement = cardItem.cloneNode(true);
    const removeCardBtn = cardElement.querySelector('.card__trash-btn');
    const likeCardBtn = cardElement.querySelector('.card__like-btn');
    const cardElementTitle = cardElement.querySelector('.card__title');
    const cardElementImage = cardElement.querySelector('.card__image');

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

/** показать попап с просмотром изображения */
function showPopupViewImage(cardCaption='', cardURL='') {
    imagePopupViewImage.src = cardURL;
    imagePopupViewImage.alt = cardCaption;
    captionPopupViewImage.textContent = cardCaption;
    openPopup(popupViewImage);
}
