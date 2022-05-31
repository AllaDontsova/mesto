// Объекты настроек
const config = {
    formSelector: 'popup__container',
    inputSelector: 'popup__input',
    submitButtonSelector: 'popup__save',
    inactiveButtonClass: 'popup__save_inactive',
    inputErrorClass: 'popup__input_border-error',
    errorClass: 'popup__form-error_active'
};

// Функция отображения текста ошибки
const showInputError = (formElement, inputElement, errorMessage, configInputValidation) => {
    const { inputErrorClass, errorClass } = configInputValidation;
    const error = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(`${inputErrorClass}`);
    error.textContent = errorMessage;
    error.classList.add(`${errorClass}`);
};

//Функция скрытия текста ошибки
const hideInputError = (formElement, inputElement, configInputValidation) => {
    const { inputErrorClass, errorClass } = configInputValidation;
    const error = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(`${inputErrorClass}`);
    error.classList.remove(`${errorClass}`);
    error.textContent = '';
};

// Функция проверки поля на валидность(отображение ошибки)
const checkInputValidity = (formElement, inputElement, configParametr) => {
    const { inputErrorClass, errorClass } = configParametr;
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, configParametr);
    } else {
        hideInputError(formElement, inputElement, configParametr);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};

// Функция включения неактивной кнопки submit
const offPopupSaveBtn = (inputList, button, configValidation) => {
    const { inactiveButtonClass } = configValidation;
    if (hasInvalidInput(inputList)) {
        button.classList.add(`${inactiveButtonClass}`);
        button.disabled = true;
    } else {
        button.classList.remove(`${inactiveButtonClass}`);
        button.disabled = false;
    }
};

// Функция добавления валидации на форму
const addFormValidation = (formElement, configValidationInput) => {
    const { inputSelector, submitButtonSelector, inputErrorClass, errorClass } = configValidationInput;
    const inputList = Array.from(formElement.querySelectorAll(`.${inputSelector}`));
    const buttonSavePopup = formElement.querySelector(`.${submitButtonSelector}`);
    offPopupSaveBtn(inputList, buttonSavePopup, configValidationInput);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
            offPopupSaveBtn(inputList, buttonSavePopup, configValidationInput);
        });
    });
};

// Функция добавдения валидации на все формы
const enableValidation = (configValidation) => {
    const { formSelector } = configValidation;
    const formList = Array.from(document.querySelectorAll(`.${formSelector}`));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        addFormValidation(formElement, configValidation);
    });
};
enableValidation(config);