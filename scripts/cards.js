export class Card {
    constructor(data, selectorTemplate, handleCardClick) {
        const { name, link } = data;
        this._name = name;
        this._link = link;
        this._selectorTemplate = selectorTemplate;
        this._handleCardClick = handleCardClick;
    }

    //Создание экземпляра карточки
    _getTemplate() {
        const cardElement = document
            .querySelector(this._selectorTemplate)
            .content
            .querySelector('.element')
            .cloneNode(true);
        return cardElement;
    }

    _generateCard() {
        this._image = this._element.querySelector('.element__item');
        this._likeButton = this._element.querySelector('.element__like');
        this._deleteButton = this._element.querySelector('.element__trash');
        this._title = this._element.querySelector('.element__title');
    }

    _completeData() {
        this._title.textContent = this._name;
        this._image.alt = this._name;
        this._image.src = this._link;
    }

    // Добавление данных в разметку
    getCard() {
        this._element = this._getTemplate();
        this._generateCard();
        this._completeData();
        this._setEventListeners();
        return this._element;
    }

    _handlerLikeCard = () => {
        this._likeButton.classList.toggle('element__like_active');
    }

    _handlerDeleteCard = () => {
        this._deleteButton.closest('.element').remove();
    }

    _setEventListeners = () => {
        this._image.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        });
        this._likeButton.addEventListener('click', this._handlerLikeCard);
        this._deleteButton.addEventListener('click', this._handlerDeleteCard);
    }
}