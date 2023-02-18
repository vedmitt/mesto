/** Это чувствительные данные, которые лучше перенести в переменные среды */
export const serverUrl = 'https://mesto.nomoreparties.co'
export const groupId = 'cohort-59';
export const personalToken = '64f46641-1d17-4ea8-b206-5bf810349ffe';


export const cardListSection = '#photo-grid-container';

export const validationConfig = {
    formInput: 'form__input',
    formSubmitBtn: 'form__save-btn',
    formSubmitBtnInactive: 'form__save-btn_inactive',
    formInputTypeError: 'form__input_type_error'
};

export const popupEditProfileSelector = '#popup-edit-profile';
export const popupEditAvatarSelector = '#popup-edit-avatar';
export const popupAddCardSelector = '#popup-add-card';
export const popupDelCardSelector = '#popup-del-card';
export const popupWithImageSelector = '#popup-view-image';

export const popupImageCaptionSelector = '.popup-img__caption';
export const popupImageSelector = '.popup-img__image';
export const popupCloseBtnSelector = 'popup__close-btn';
export const popupOpenedSelector = 'popup_opened';

export const formEditAvatarSelector = 'form-edit-avatar';
export const formEditProfileSelector = 'form-edit-profile';
export const formAddCardSelector = 'form-add-card';

export const formSelector = '.form';
export const formInputSelector = '.form__input';
export const formSaveBtnSelector = '.form__save-btn';

export const profileUserNameSelector = '.profile__user-name';
export const profileUserDescSelector = '.profile__user-description';
export const profileAvatarSelector = '.profile__avatar';
export const profileAvatarOverlaySelector = '.profile__avatar-overlay';
export const profileEditBtnSelector = '.profile__edit-btn';
export const profileAddBtnSelector = '.profile__add-btn';

export const cardTemplateSelector = '#card-template';
export const cardSelector = '.card';
export const cardLikeCounterSelector = '.card__like-counter';
export const cardLikeBtnSelector = '.card__like-btn';
export const cardLikeBtnActiveSelector = 'card__like-btn_active';
export const cardImageSelector = '.card__image';
export const cardTrashBtnSelector = '.card__trash-btn';
export const cardTrashBtnHiddenSelector = 'card__trash-btn_hidden';
export const cardTitleSelector = '.card__title';

export const profileAvatar = document.querySelector(profileAvatarOverlaySelector);
export const profileEditBtn = document.querySelector(profileEditBtnSelector);
export const profileAddBtn = document.querySelector(profileAddBtnSelector);