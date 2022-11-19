let popup = document.querySelector('.popup');
// Находим форму в DOM
let formElement = popup.querySelector('.popup__form');
// Находим поля формы в DOM
    let nameInput = formElement.querySelector('.popup__input_name_user-name');
    let jobInput = formElement.querySelector('.popup__input_name_job');

// Находим информацию о профиле
let profile = document.querySelector('.profile__info');
    let profileName = profile.querySelector('.profile__user-name');
    let profileJob = profile.querySelector('.profile__user-description');

// Функция-обработчик закрытия попапа
    function closePopupHandler() {
        popup.classList.remove('popup_opened');
    }

// Функция-обработчик кнопки редактирования профиля
    function editProfileHandler() {
        popup.classList.add('popup_opened');
        nameInput.value = profileName.textContent;
        jobInput.value = profileJob.textContent;
    }

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
    function formSubmitHandler (evt) {
        evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
        profileName.textContent = nameInput.value;
        profileJob.textContent = jobInput.value;
        closePopupHandler();
    }

// Обработчики событий
profile.addEventListener('click', editProfileHandler);
popupCloseBtn = popup.querySelector('.popup__close-btn');
popupCloseBtn.addEventListener('click', closePopupHandler);
// Прикрепляем обработчик к форме, он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
