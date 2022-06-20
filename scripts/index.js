import { initialCards, validationConfig } from './constants.js';
import { Card } from './Cards.js';
import FormValidator from './FormValidator.js';
import { openPopup, closePopup } from './popup.js';

const popupProfile = document.querySelector('#popup-profile');
const popupAddCard = document.querySelector('#popup-addCard');
const popupImage = document.querySelector('#popupImage');
const buttonOpenPopupProfile = document.querySelector('.profile__edit-button');
const inputNamePopupProfile = document.querySelector('#InputName');
const inputPersonalInfoPopupProfile = document.querySelector('#InputPersonalInfo');
const inputNameCardPopupAddCard = document.querySelector('#InputNameCard');
const inputLinkPopupAddCard = document.querySelector('#InputLinkCard');
const profileName = document.querySelector('.profile__name');
const profileSubtitle = document.querySelector('.profile__subtitle');
const formProfileEdit = document.querySelector('#profileContainer');
const formAddCard = document.querySelector('#addCardContainer');
const buttonOpenPopupAddCard = document.querySelector('.profile__add-button');
const cardsContainer = document.querySelector('.elements');
const popups = document.querySelectorAll('.popup');

// Функции для открытия попап-профиль
function openPopupProfile() {
    inputNamePopupProfile.value = profileName.textContent;
    inputPersonalInfoPopupProfile.value = profileSubtitle.textContent;
    openPopup(popupProfile);
};

// Функции для закрытия попап-профиль
function closePopupProfile() {
    closePopup(popupProfile);
};

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
    inputNameCardPopupAddCard.value = '';
    inputLinkPopupAddCard.value = '';
}

// Функция закрытия попап добавления карточек
function closePopupAddCard() {
    closePopup(popupAddCard);
    inputNameCardPopupAddCard.value = '';
    inputLinkPopupAddCard.value = '';
}

// Функция добавления новой карточки
function handleAddCardFormSubmit(evt) {
    evt.preventDefault();
    prependCard(inputNameCardPopupAddCard.value, inputLinkPopupAddCard.value);
    closePopupAddCard();
}

const formValidators = {}; // создали объект из форм

Array.from(document.forms).forEach((formElement) => {
    formValidators[formElement.name] = new FormValidator(validationConfig, formElement);
    formValidators[formElement.name].enableValidation();
});

// Обработчики попап-профиль
buttonOpenPopupProfile.addEventListener('click', function () {
    openPopupProfile();
    formValidators[formProfileEdit.name].cleanForm();
});

formProfileEdit.addEventListener('submit', handleProfileFormSubmit);

// Обработчики попап-карточки
buttonOpenPopupAddCard.addEventListener('click', function () {
    openPopupAddCard();
    formValidators[formAddCard.name].cleanForm();
});

formAddCard.addEventListener('submit', handleAddCardFormSubmit);

initialCards.forEach((item) => {
    appendCard(item);
});

function appendCard(card) {
    const element = createCard(card);
    cardsContainer.append(element);
};

function prependCard(nameCardValue, linkCardValue) {
    const element = createCard({ name: nameCardValue, link: linkCardValue });
    cardsContainer.prepend(element);
};

function createCard(data) {
    const card = new Card(data, "#cards", popupImage);
    return card.getCard();
};

// Функция закрытие попапа кликом на оверлей и крестик
popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup);
        }
        if (evt.target.classList.contains('popup__close')) {
            closePopup(popup);
        }
    })
});