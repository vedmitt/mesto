const bodyContainer = document.querySelector('body');
const cardsContainer = bodyContainer.querySelector('#photo-grid-container');

// профиль
const profileName = bodyContainer.querySelector('.profile__user-name');
const profileJob = bodyContainer.querySelector('.profile__user-description');
const buttonEditProfile = bodyContainer.querySelector('.profile__edit-btn');
const buttonAddCard =  bodyContainer.querySelector('.profile__add-btn');

// попап профиля
const popupProfile = bodyContainer.querySelector('#popup-edit-profile');
const titlePopupProfile = popupProfile.querySelector('.popup__title');
const popupProfileForm = popupProfile.querySelector('.popup__form');
const inputNamePopupProfile = popupProfile.querySelector('.popup__input_name_user-name');
const inputDescPopupProfile = popupProfile.querySelector('.popup__input_name_job');
const buttonClosePopupProfile = popupProfile.querySelector('.popup__close-btn');

// попап просмотра изображения
const popupViewImage = bodyContainer.querySelector('#popup-view-image');
const captionPopupViewImage = popupViewImage.querySelector('.popup-img__caption');
const imagePopupViewImage = popupViewImage.querySelector('.popup-img__image');
const buttonClosePopupViewImage = popupViewImage.querySelector('.popup__close-btn');

/** первоначальная загрузка карточек */
initialCards.forEach((item) => {
    renderCard({title: item.name, url: item.link});
});

/** подключаем обработчики событий */
/** кнопка редактирования профиля
 * открывает попап для редактирования (изначально заполнен) */
buttonEditProfile.addEventListener('click', function(evt) {
    setPopupProfileForm(
        'popup-edit-profile',
        'Редактировать профиль',
        'Имя Фамилия',
        'О себе',
        profileName.textContent,
        profileJob.textContent
    );
    openPopup(popupProfile);
});

/** кнопка добавления карточки открывает попап для добавления (изначально пуст) */
buttonAddCard.addEventListener('click', function (evt) {
    setPopupProfileForm(
        'popup-add-card',
        'Новое место',
        'Название',
        'Ссылка на картинку');
    openPopup(popupProfile);
});

/** кнопка закрытия попапа */
buttonClosePopupProfile.addEventListener('click', function (evt) {
    closePopup(popupProfile);
});

buttonClosePopupViewImage.addEventListener('click', function (evt) {
   closePopup(popupViewImage);
});

/** кнопка отправки формы приклепляется к форме */
popupProfileForm.addEventListener('submit', handleSubmitProfileForm);

/** функция отправки формы */
function handleSubmitProfileForm (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    switch (popupProfile.id) {
        case 'popup-edit-profile':
            setProfileInfo();
            break;
        case 'popup-add-card':
            renderCard({
                    title: inputNamePopupProfile.value,
                    url: inputDescPopupProfile.value
                },true);
    }

    closePopup(popupProfile);
}

/** функции открытия и закрытия попапа */
function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

/** настойка надписей попапа редактирования профиля */
function setPopupProfileForm(id, title, namePlaceholder, descPlaceholder, nameValue='', descValue='') {
    popupProfile.id = id;
    titlePopupProfile.textContent = title;
    inputNamePopupProfile.placeholder = namePlaceholder;
    inputDescPopupProfile.placeholder = descPlaceholder;
    inputNamePopupProfile.value = nameValue;
    inputDescPopupProfile.value = descValue;
}

/** присваевает данным о пользователе новые значения */
function setProfileInfo() {
    profileName.textContent = inputNamePopupProfile.value;
    profileJob.textContent = inputDescPopupProfile.value;
}

/** возвращает пустую карточку из шаблона с базовыми функциями */
function createCardFromTemplate (cardData) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
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
