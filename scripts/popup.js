const popupOpenButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close');
const nameInput = document.querySelector('.popup__form_name');
const jobInput = document.querySelector('.popup__form_job');
const profileName = document.querySelector('.profile__name');
const profileSubtitle = document.querySelector('.profile__subtitle');
const form = document.querySelector('.popup__container');

popupOpenButton.addEventListener('click', function () {
    completeForm();
    togglePopup();
});

popupCloseButton.addEventListener('click', function () {
    togglePopup();
});

function togglePopup() {
    popup.classList.toggle('popup__opened');
};

function completeForm() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileSubtitle.textContent;
}

form.addEventListener('submit', formSubmitHandler);
function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    togglePopup();
};
