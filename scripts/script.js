const popupOpenButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close');
const nameInput = document.querySelector('.popup__form_name');
const jobInput = document.querySelector('.popup__form_job');
const profileName = document.querySelector('.profile__name');
const profileSubtitle = document.querySelector('.profile__subtitle');
const form = document.querySelector('.popup__container');

function togglePopup() {
    popup.classList.toggle('popup_opened');
    if (popup.classList.contains('popup_opened')){
        completeForm ();
    } 
}

function completeForm() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileSubtitle.textContent;
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    togglePopup();
}

function onPopupOpenButtonClick() {
    togglePopup();
}

function onPopupCloseButtonClick() {
    togglePopup();
}

popupOpenButton.addEventListener('click', onPopupOpenButtonClick);

popupCloseButton.addEventListener('click', onPopupCloseButtonClick);

form.addEventListener('submit', formSubmitHandler);

