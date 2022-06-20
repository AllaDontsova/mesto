class FormValidator {
    constructor(config, form) {
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;
        this._form = form;
    }

    _showInputError(inputElement, errorMessage) {
        const error = this._form.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        error.classList.add(this._errorClass);
        error.textContent = errorMessage;
    }

    _hideInputError(inputElement) {
        const error = this._form.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        error.classList.remove(this._errorClass);
        error.textContent = '';
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            const errorMessage = inputElement.validationMessage;
            this._showInputError(inputElement, errorMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _offPopupSaveBtn(inputList, button) {
        if (this._hasInvalidInput(inputList)) {
            button.classList.add(this._inactiveButtonClass);
            button.disabled = true;
        } else {
            button.classList.remove(this._inactiveButtonClass);
            button.disabled = false;
        }
    }

    enableValidation = () => {
        const inputList = Array.from(this._form.querySelectorAll(`.${this._inputSelector}`));
        const button = this._form.querySelector(`.${this._submitButtonSelector}`);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._offPopupSaveBtn(inputList, button);
            });
        });
        this._offPopupSaveBtn(inputList, button);
    };

    cleanForm = () => {
        const inputList = Array.from(this._form.querySelectorAll(`.${this._inputSelector}`));
        const button = this._form.querySelector(`.${this._submitButtonSelector}`);
        inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
        });
        this._offPopupSaveBtn(inputList, button);
    }
}

export default FormValidator