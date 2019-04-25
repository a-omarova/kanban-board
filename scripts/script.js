'use strict';

var ACTIONS_CLASS = 'column__actions';
var OPEN_DIALOG_CLASS = 'js-open-dialog';
var CLOSE_DIALOG_CLASS = 'js-close-dialog';
var ADD_CARD_CLASS = 'js-add-card';
var ADD_COLUMN_TITLE_CLASS = 'js-add-column-title';
var CARD_CLASS = 'card';
var COLUMN_CLASS = 'column';
var CARDS_LIST = 'cards__list';
var ACTIONS_OPEN_DIALOG_MOD = 'column__actions_open-dialog';
var COLUMN_ACTIONS_CLASS = 'column__actions_column';
var CARD_DIALOG_CLASS = 'dialog_card';
var COLUMN_DIALOG_CLASS = 'dialog_column';
var COLUMN_TITLE_CLASS = 'column__title';

var addColumnActions = `<div class="column__actions column__actions_column">
                            <div class="column__input">
                                <input class="dialog dialog_column" placeholder="Введите название колонки">
                            </div>
                            <div class="buttons">
                                <svg class="buttons__icon js-close-dialog" width="15" height="15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M14.141 6.641H8.36V.86A.88.88 0 0 0 7.5 0a.88.88 0 0 0-.859.859V6.64H.86A.88.88 0 0 0 0 7.5c0 .458.4.859.859.859H6.64v5.782c0 .458.401.859.859.859a.88.88 0 0 0 .859-.859V8.36h5.782A.88.88 0 0 0 15 7.5a.88.88 0 0 0-.859-.859z" fill="#6B808C"/>
                                </svg>
                                <button class="open-dialog-button js-open-dialog">Добавить еще одну колонку</button>
                                <button class="add-button js-add-column-title">Добавить колонку</button>
                            </div>
                        </div>`;
var addCardActions = `<div class="column__actions column__actions_card">
                        <div class="column__textarea">
                            <textarea class="dialog dialog_card" placeholder="Введите название карточки"></textarea>
                        </div>
                        <div class="buttons">
                            <svg class="buttons__icon js-close-dialog" width="15" height="15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M14.141 6.641H8.36V.86A.88.88 0 0 0 7.5 0a.88.88 0 0 0-.859.859V6.64H.86A.88.88 0 0 0 0 7.5c0 .458.4.859.859.859H6.64v5.782c0 .458.401.859.859.859a.88.88 0 0 0 .859-.859V8.36h5.782A.88.88 0 0 0 15 7.5a.88.88 0 0 0-.859-.859z" fill="#6B808C"/>
                            </svg>
                            <button class="open-dialog-button js-open-dialog">Добавить еще одну карточку</button>
                            <button class="add-button js-add-card">Добавить карточку</button>
                        </div>
                    </div>`;

var container = document.querySelector('.container');
var columns = document.querySelectorAll('.' + COLUMN_CLASS);
var columnsCounter = columns.length;
var cardsList = document.querySelectorAll('.' + CARDS_LIST);

var createNewColumn = function () {
    var column = document.createElement('section');

    column.setAttribute('class', COLUMN_CLASS);
    column.innerHTML = addColumnActions;

    return column;
};
var createNewCard = function (message) {
    var card = document.createElement('p');

    card.setAttribute('class', 'card');
    card.innerHTML = message;

    return card;
};

var createColumnTitle = function (name) {
    var title = document.createElement('h4');

    title.setAttribute('class', COLUMN_TITLE_CLASS);
    title.innerHTML = name;

    return title;
};

var createNewCardsList = function () {
    var listContainer = document.createElement('div');
    var list = document.createElement('div');
    listContainer.setAttribute('class', 'cards');
    list.setAttribute('class', 'cards__list');

    listContainer.appendChild(list);
    listContainer.innerHTML += addCardActions;

    return listContainer;
};

container.onclick = function(event) {
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1")

    var target = event.target;
    var isOpenCardDialogBtn = target.classList.contains(OPEN_DIALOG_CLASS);
    var isCloseCardDialogBtn = target.classList.contains(CLOSE_DIALOG_CLASS) || target.closest('.' + CLOSE_DIALOG_CLASS);
    var isAddColumnBtn = target.classList.contains(ADD_COLUMN_TITLE_CLASS);
    var isAddCardBtn = target.classList.contains(ADD_CARD_CLASS);
    var isCardBtn = target.classList.contains(CARD_CLASS);
    cardsList = document.querySelectorAll('.' + CARDS_LIST);

    // create new column

    if (isOpenCardDialogBtn) {
        target.closest('.' + ACTIONS_CLASS).classList.add(ACTIONS_OPEN_DIALOG_MOD);
        if (target.closest('.' + COLUMN_ACTIONS_CLASS) && columnsCounter < 4) {
            container.appendChild(createNewColumn());
            columnsCounter++;
            columns = document.querySelectorAll('.' + COLUMN_CLASS);
        }
    }

    // delete new column

    if (isCloseCardDialogBtn) {
        target.closest('.' + ACTIONS_CLASS).classList.remove(ACTIONS_OPEN_DIALOG_MOD);
        if (target.closest('.' + COLUMN_ACTIONS_CLASS) && columnsCounter > 2 ) {
            container.removeChild(target.closest('.' + COLUMN_CLASS));
            columnsCounter--;
            columns = document.querySelectorAll('.' + COLUMN_CLASS);
        }
    }

    // add new card

    if (isAddCardBtn) {
        var cardDialog = target.closest('.' + ACTIONS_CLASS).querySelector('.' + CARD_DIALOG_CLASS);

        if (cardDialog.value.length !== 0) {
            target.closest('.' + COLUMN_CLASS).querySelector('.' + CARDS_LIST).appendChild(createNewCard(cardDialog.value));
            cardDialog.value = '';
            columns = document.querySelectorAll('.' + COLUMN_CLASS);
        }
    }

    // add column title and cards-list

    if (isAddColumnBtn) {
        var column = target.closest('.' + COLUMN_CLASS);
        var columnDialog = target.closest('.' + COLUMN_CLASS).querySelector('.' + COLUMN_DIALOG_CLASS);
        var columnActions = column.querySelector('.' + COLUMN_ACTIONS_CLASS);

        if (columnDialog.value.length !== 0) {
            column.insertBefore(createColumnTitle(columnDialog.value), columnActions);
            column.removeChild(columnActions);
            column.appendChild(createNewCardsList());
            columnDialog.value = '';
        }
    }

    if (isCardBtn) {

        console.log('!!!!', cardsList);
        console.log('!!isCardBtn!!', isCardBtn);
        dragula(Array.from(cardsList), {
            copy: false,                       // elements are moved by default, not copied
            mirrorContainer: document.body,    // set the element that gets mirror elements appended
            ignoreInputTextSelection: true     // allows users to select input text, see details below
        });

        console.log('!!isCardBtn!!', document.body.mirrorContainer);
    }
};

console.log('!!!!', cardsList);

dragula(Array.from(cardsList), {
    copy: false
});



// drag'n'drop


