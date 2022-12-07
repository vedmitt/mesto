const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const bodyContainer = document.querySelector('body');
const cardsContainer = document.querySelector('#photo-grid-container');

// первоначальная загрузка карточек
initialCards.forEach((item) => {
    addCard(item.name, item.link);
});

// создадим попап из шаблона
const newPopup = (idTemplate='popup-template') => {
    const popupTemplate = document.querySelector(`#${idTemplate}`).content;
    const popupElement = popupTemplate.querySelector('.popup').cloneNode(true);

    // подключим закрытие попапа
    const closePopupBtn = popupElement.querySelector('.popup__close-btn');
    closePopupBtn.addEventListener('click',function (evt) {
        closePopup(popupElement);
    });
    bodyContainer.append(popupElement);
    return popupElement;
}

// добавить карточку
function addCard(cardTitle='', cardURL='', isPrepend=false) {
    const cardTemplate = document.querySelector('#photo-grid-template').content;
    const cardElement = cardTemplate.querySelector('.photo-grid__item').cloneNode(true);

    cardElement.querySelector('.photo-grid__title').textContent = cardTitle;
    cardElement.querySelector('.photo-grid__image').src = cardURL;

    // добавление карточки в начало или конец контейнера
    if (!isPrepend) {
        cardsContainer.append(cardElement);
    } else {
        cardsContainer.prepend(cardElement);
    }

    // подключение кнопки удаления карточки
    const removeCardBtn = cardElement.querySelector('.photo-grid__trash-btn');
    removeCardBtn.addEventListener('click', function() {
        cardElement.remove();
    });

    // подключение кнопки лайка
    const likeCardBtn = cardElement.querySelector('.photo-grid__like-btn');
    likeCardBtn.addEventListener('click', function () {
        likeCardBtn.classList.toggle('photo-grid__like-btn_active');
    });

    // подключение просмотра изображения
    const image = cardElement.querySelector('.photo-grid__image');
    image.addEventListener('click', function() {
        const popup = newPopup('popup-img-template');

        const popupImage = popup.querySelector('.popup-img__image');
        const popupCaption = popup.querySelector('.popup-img__caption');

        popupImage.src = cardURL;
        popupCaption.textContent = cardTitle;
    });
}

// открыть попап для редактирование профиля
function openProfilePopup() {
    const popup = newPopup();

    // загрузим данными из профиля
    const profileName = document.querySelector('.profile__user-name');
    const profileJob = document.querySelector('.profile__user-description');

    const nameInput = popup.querySelector('.popup__input_name_user-name');
    const jobInput = popup.querySelector('.popup__input_name_job');

    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;

    // подключим сохранение данных о профиле
    const submitBtn = popup.querySelector('.popup__save-btn');
    submitBtn.addEventListener('click', function(evt) {
        evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы
        profileName.textContent = nameInput.value;
        profileJob.textContent = jobInput.value;
        closePopup(popup);
    });
}

// открыть попап для добавления карточки
function openCardPopup() {
    const popup = newPopup();

    // настроим попап для карточек
    popup.querySelector('.popup__title').textContent = 'Новое место';
    const nameInput = popup.querySelector('.popup__input_name_user-name');
    nameInput.placeholder = 'Название';
    const urlInput = popup.querySelector('.popup__input_name_job');
    urlInput.placeholder = 'Ссылка на картинку';

    // подключим сохранение карточки
    const submitBtn = popup.querySelector('.popup__save-btn');
    submitBtn.addEventListener('click', function(evt) {
        evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы
        addCard(nameInput.value, urlInput.value, isPrepend=true);
        closePopup(popup);
    });
}

// закрыть попап
function closePopup(popup) {
    popup.classList.toggle('popup_closed');
    setTimeout(() => popup.remove(),1000);
}

// подключение слушателей кнопок
const editProfileBtn = document.querySelector('.profile__edit-btn');
editProfileBtn.addEventListener('click', openProfilePopup);

const addCardBtn = document.querySelector('.profile__add-btn');
addCardBtn.addEventListener('click', function (evt) {
    openCardPopup();
})