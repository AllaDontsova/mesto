const popupOpenButton = document.querySelector('.profile__edit-button');
const popupInfo = document.querySelector('#popupInfo');
const popupCloseButton = popupInfo.querySelector('#closePopup');
const firstInput = document.querySelector('#firstInput');
const secondInput = document.querySelector('#secondInput');
const profileName = document.querySelector('.profile__name');
const profileSubtitle = document.querySelector('.profile__subtitle');
const form = document.querySelector('.popup__container');
const addButton = document.querySelector('.profile__add-button');
const elements = document.querySelector('.elements');
let isProfilePopup = false;
const templateCards = document.querySelector('#cards');

function togglePopup(nameInput, infoInput, heading, firstInputPlaceholder, secondInputPlaceholder, buttonBackground) {
    popupInfo.classList.toggle('popup_opened');
    if (popupInfo.classList.contains('popup_opened')) {
        firstInput.value = nameInput;
        secondInput.value = infoInput;
        const popupHeading = document.querySelector('.popup__heading');
        popupHeading.textContent = heading;
        firstInput.placeholder = firstInputPlaceholder;
        secondInput.placeholder = secondInputPlaceholder;
        const buttonSave = document.querySelector('.popup__save');
        buttonSave.style.backgroundImage = `url('${buttonBackground}')`;
    }
}

function togglePopupProfileOpen() {
    togglePopup(profileName.textContent, profileSubtitle.textContent, 'Редактировать профиль', 'Имя', 'О себе', 'images/SubmitButton.svg');
    isProfilePopup = true;
}

function togglePopupAdd() {
    togglePopup(null, null, 'Новое место', 'Название', 'Ссылка на картинку', 'images/CreateButton.svg');
    isProfilePopup = false;
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    if (isProfilePopup) {
        profileName.textContent = firstInput.value;
        profileSubtitle.textContent = secondInput.value;
    }
    else {
        prependCard(firstInput.value, secondInput.value);
    }
    togglePopup();
}

popupOpenButton.addEventListener('click', togglePopupProfileOpen);

addButton.addEventListener('click', togglePopupAdd);

popupCloseButton.addEventListener('click', togglePopup);

form.addEventListener('submit', formSubmitHandler);


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

initialCards.forEach((item) => {
    appendCard(item.name, item.link);
})

function appendCard(nameCardValue, linkCardValue) {
    const element = createCard(nameCardValue, linkCardValue);
    elements.append(element);
}

function prependCard(nameCardValue, linkCardValue) {
    const element = createCard(nameCardValue, linkCardValue);
    elements.prepend(element);
}

const popupImage = document.querySelector('#popupImage');


function createCard(nameCardValue, linkCardValue) {
    // Клонирование карточки
    const element = templateCards.content.cloneNode(true);
    element.querySelector('.element__title').textContent = nameCardValue;
    const img = element.querySelector('.element__item');
    img.src = linkCardValue;
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
    // Функция попап-картинка
    function popupImageDialog() {
        popupImage.classList.toggle('popup_opened');
        /* if (!popupImage.classList.contains('popup_opened')) {
             return;
         }*/
        const image = document.querySelector('.popup__image')
        image.src = linkCardValue;
        const title = document.querySelector('.popup__title');
        title.textContent = nameCardValue;
    }
    img.addEventListener('click', popupImageDialog);
    const popupImageClose = document.querySelector('#closeImage');
    function closePopupImage() {
        popupImage.classList.remove('popup_opened');
    }
    popupImageClose.addEventListener('click', closePopupImage);
    return element;
}