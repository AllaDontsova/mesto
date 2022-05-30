const popupProfile = document.querySelector('#popup-profile');
const popupAddCard = document.querySelector('#popup-addCard');
const popupImage = document.querySelector('#popupImage');
const buttonOpenPopupProfile = document.querySelector('.profile__edit-button');
const buttonClosePopupProfile = document.querySelector('#closePopupProfile');
const inputNamePopupProfile = document.querySelector('#InputName');
const inputPersonalInfoPopupProfile = document.querySelector('#InputPersonalInfo');
const inputNameCardPopupAddCard = document.querySelector('#InputNameCard');
const inputLinkPopupAddCard = document.querySelector('#InputLinkCard');
const profileName = document.querySelector('.profile__name');
const profileSubtitle = document.querySelector('.profile__subtitle');
const formProfileEdit = document.querySelector('#profileContainer');
const formAddCard = document.querySelector('#addCardContainer');
const buttonOpenPopupAddCard = document.querySelector('.profile__add-button');
const buttonClosePopupAddCard = document.querySelector('#closePopupAdd');
const templateCard = document.querySelector('#cards');
const cardsContainer = document.querySelector('.elements');
const buttonClosePopupImage = document.querySelector('#closeImage');
const popups = document.querySelectorAll('.popup');

// Функции открытия и закрытия попапов
function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

// Функции для открытия попап-профиль
function openPopupProfile() {
    openPopup(popupProfile);
    inputNamePopupProfile.value = profileName.textContent;
    inputPersonalInfoPopupProfile.value = profileSubtitle.textContent;
    const inputList = Array.from(formProfileEdit.querySelector('.popup__input'));
    const buttonSavePopup = formProfileEdit.querySelector('.popup__save');
    offPopupSaveBtn(inputList, buttonSavePopup, config);
}

// Функции для закрытия попап-профиль
function closePopupProfile() {
    closePopup(popupProfile);
}

// Функция сохранения данных попап-профиль
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = inputNamePopupProfile.value;
    profileSubtitle.textContent = inputPersonalInfoPopupProfile.value;
    closePopupProfile();
};

// Функция открытия попап добавления карточек
function openPopupAddCard() {
    openPopup(popupAddCard);
}

// Функция закрытия попап добавления карточек
function closePopupAddCard() {
    closePopup(popupAddCard);
}

// Функция добавления новой карточки
function handleAddCardFormSubmit(evt) {
    evt.preventDefault();
    prependCard(inputNameCardPopupAddCard.value, inputLinkPopupAddCard.value);
    closePopupAddCard();
}

//  Функция закрытия попап-картинки
function closePopupImage() {
    closePopup(popupImage);
}

// Обработчики попап-профиль
buttonOpenPopupProfile.addEventListener('click', openPopupProfile);
buttonClosePopupProfile.addEventListener('click', closePopupProfile);
formProfileEdit.addEventListener('submit', handleProfileFormSubmit);
// Обработчики попап-карточки
buttonOpenPopupAddCard.addEventListener('click', openPopupAddCard);
buttonClosePopupAddCard.addEventListener('click', closePopupAddCard);
formAddCard.addEventListener('submit', handleAddCardFormSubmit);
// Обработчик попап-картинки
buttonClosePopupImage.addEventListener('click', closePopupImage);

// Создание карточек из массива на странице
initialCards.forEach((item) => {
    appendCard(item.name, item.link);
})

function appendCard(nameCardValue, linkCardValue) {
    const element = createCard(nameCardValue, linkCardValue);
    cardsContainer.append(element);
}

function prependCard(nameCardValue, linkCardValue) {
    const element = createCard(nameCardValue, linkCardValue);
    cardsContainer.prepend(element);
}

function createCard(nameCardValue, linkCardValue) {
    // Клонирование карточки
    const element = templateCard.content.cloneNode(true);
    element.querySelector('.element__title').textContent = nameCardValue;
    const img = element.querySelector('.element__item');
    img.src = linkCardValue;
    img.alt = `Фото ${nameCardValue}.`;
    // Функция лайка
    const likeButton = element.querySelector('.element__like');
    likeButton.addEventListener('click', function () {
        likeButton.classList.toggle('element__like_active');
    });
    // Функция удаления карточки
    const deleteButton = element.querySelector('.element__trash');
    deleteButton.addEventListener('click', function () {
        const cardToRemove = deleteButton.closest('.element');
        cardToRemove.remove();
    });
    // Функция открытия попап-картинки
    function openPopupImage() {
        openPopup(popupImage);
        const image = document.querySelector('.popup__image')
        image.src = linkCardValue;
        const title = document.querySelector('.popup__title');
        title.textContent = nameCardValue;
        image.alt = `Фото ${nameCardValue}.`;
    }
    img.addEventListener('click', openPopupImage);
    return element;
};

// Функция закрытие попапа кнопкой Esc
function closePopupByEscape(evt) {
    if (evt.key === 'Escape') {
        const popupOpened = document.querySelector('.popup_opened');
        closePopup(popupOpened);
    }
};

document.addEventListener('keydown', closePopupByEscape);

// Функция закрытие попапа кликом на оверлей
popups.forEach((popup) => {
    popup.addEventListener('click', closePopupByOverlay);
});

function closePopupByOverlay(evt) {
    if (event.target == event.currentTarget) {
        closePopup(evt.target);
    };
};
