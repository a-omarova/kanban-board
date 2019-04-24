'use strict';

var ACTIONS_CLASS = 'column__actions';
var OPEN_DIALOG_CLASS = 'js-open-dialog';
var CLOSE_DIALOG_CLASS = 'js-close-dialog';
var ADD_CARD_CLASS = 'js-add-card';
var CARD_DIALOG = 'dialog_card';
var CARDS_LIST = 'cards-list';
var ACTIONS_OPEN_DIALOG_MOD = 'column__actions_open-dialog';

var addColumnActions = `<div class="column__actions column__actions_column">
                            <div class="column__input">
                                <input class="dialog dialog_column" placeholder="Введите название колонки">
                            </div>
                            <div class="buttons">
                                <svg class="buttons__icon js-close-dialog" width="15" height="15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M14.141 6.641H8.36V.86A.88.88 0 0 0 7.5 0a.88.88 0 0 0-.859.859V6.64H.86A.88.88 0 0 0 0 7.5c0 .458.4.859.859.859H6.64v5.782c0 .458.401.859.859.859a.88.88 0 0 0 .859-.859V8.36h5.782A.88.88 0 0 0 15 7.5a.88.88 0 0 0-.859-.859z" fill="#6B808C"/>
                                </svg>
                                <button class="open-dialog-button js-open-dialog">
                                    Добавить еще одну колонку
                                </button>
                                <button class="add-button js-add-column">
                                    Добавить колонку
                                </button>
                            </div>
                        </div>`;

var container = document.querySelector('.container');
var columnsCounter = document.querySelectorAll('.column').length;
var createNewColumn = function () {
    var column = document.createElement('section');

    column.setAttribute('class', 'column');
    column.innerHTML = addColumnActions;

    return column;
};
var createNewCard = function (message) {
    var card = document.createElement('p');

    card.setAttribute('class', 'card');
    card.innerHTML = message;

    return card;
};

container.onclick = function(event) {
    var target = event.target;
    var isOpenCardDialogBtn = target.classList.contains(OPEN_DIALOG_CLASS);
    var isCloseCardDialogBtn = target.classList.contains(CLOSE_DIALOG_CLASS) || target.closest('.' + CLOSE_DIALOG_CLASS);
    var isAddCardBtn = target.classList.contains(ADD_CARD_CLASS);
    var columnLength = document.querySelectorAll('.column').length;

    if (isOpenCardDialogBtn) {
        target.closest('.' + ACTIONS_CLASS).classList.add(ACTIONS_OPEN_DIALOG_MOD);
        if (target.closest('.column__actions_column') && columnsCounter < 4) {
            container.appendChild(createNewColumn());
            columnsCounter++;
        }
    }

    if (isCloseCardDialogBtn) {
        target.closest('.' + ACTIONS_CLASS).classList.remove(ACTIONS_OPEN_DIALOG_MOD);
        if (target.closest('.column__actions_column') && columnsCounter > 2 ) {
            container.removeChild(target.closest('.column'));
            columnsCounter--;
        }
    }

    if (isAddCardBtn) {
        var cardDialog = target.closest('.' + ACTIONS_CLASS).querySelector('.dialog_card');
        
        if (cardDialog.value.length !== 0) {
            target.closest('.column').querySelector('.' + CARDS_LIST).appendChild(createNewCard(cardDialog.value))
            cardDialog.value = '';
        }
    }

};
