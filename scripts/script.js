'use strict';

var ACTIONS_CLASS = 'column__actions';
var OPEN_DIALOG_CLASS = 'js-open-dialog';
var CLOSE_DIALOG_CLASS = 'js-close-dialog';
var ADD_CARD_CLASS = 'js-add-card';
var ADD_COLUMN_TITLE_CLASS = 'js-add-column-title';
var CARD_CLASS = 'card';
var COLUMN_CONTENT_CLASS = 'column__content';
var COLUMN_CLASS = 'column';
var COLUMN_CARDS_LIST = 'column__card-list';
var ACTIONS_OPEN_DIALOG_MOD = 'column__actions_open-dialog';
var COLUMN_ACTIONS_CLASS = 'column__actions_column';
var CARD_ACTIONS_CLASS = 'column__actions_card';
var CARD_DIALOG_CLASS = 'dialog_card';
var COLUMN_DIALOG_CLASS = 'dialog_column';
var COLUMN_TITLE_CLASS = 'column__title';

var container = document.querySelector('.container');
var columns = document.querySelectorAll('.' + COLUMN_CLASS);
var columnsCounter = columns.length;
var cardsLists = Array.from(document.querySelectorAll('.' + COLUMN_CARDS_LIST));
var drake =  window.dragula();


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

var createNewColumn = function () {
    var column = document.createElement('section');

    column.setAttribute('class', COLUMN_CLASS);
    column.innerHTML = addColumnActions;

    return column;
};

var createNewCard = function (message) {
    var card = document.createElement('p');

    card.setAttribute('class', CARD_CLASS);
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
    listContainer.setAttribute('class', COLUMN_CONTENT_CLASS);
    list.setAttribute('class', COLUMN_CARDS_LIST);

    listContainer.appendChild(list);
    listContainer.innerHTML += addCardActions;

    return listContainer;
};

var setupDragula = function (containers){
    drake.destroy();
    drake = dragula(containers);
};

// init dragula

setupDragula(cardsLists);

container.onclick = function(event) {
    var target = event.target;
    var isOpenDialogBtn = target.classList.contains(OPEN_DIALOG_CLASS);
    var isOpenCardDialogBtn = target.closest('.' + CARD_ACTIONS_CLASS) || target.classList.contains(ADD_CARD_CLASS);;
    var isCloseCardDialogBtn = target.classList.contains(CLOSE_DIALOG_CLASS) || target.closest('.' + CLOSE_DIALOG_CLASS);
    var isAddColumnBtn = target.classList.contains(ADD_COLUMN_TITLE_CLASS);
    var isAddCardBtn = target.classList.contains(ADD_CARD_CLASS);

    // open dialog and create new column

    if (isOpenDialogBtn) {
        target.closest('.' + ACTIONS_CLASS).classList.add(ACTIONS_OPEN_DIALOG_MOD);
        if (target.closest('.' + COLUMN_ACTIONS_CLASS)) {
            container.appendChild(createNewColumn());
            columnsCounter++;
        }
    }

    // delete new column

    if (isCloseCardDialogBtn) {
        target.closest('.' + ACTIONS_CLASS).classList.remove(ACTIONS_OPEN_DIALOG_MOD);

        if (target.closest('.' + COLUMN_ACTIONS_CLASS) && columnsCounter > 2 ) {
            container.removeChild(target.closest('.' + COLUMN_CLASS));
            columnsCounter--;
        }
    }

    // add new card

    if (isAddCardBtn) {
        var cardDialog = target.closest('.' + ACTIONS_CLASS).querySelector('.' + CARD_DIALOG_CLASS);

        if (cardDialog.value.length !== 0) {
            var message = cardDialog.value.replace(/\n\r?/g, '<br />');
            target.closest('.' + COLUMN_CLASS).querySelector('.' + COLUMN_CARDS_LIST).appendChild(createNewCard(message));
            cardDialog.value = '';
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

            cardsLists = cardsLists.concat([column.querySelector('.' + COLUMN_CARDS_LIST)]);

            // init again after added new column
            setupDragula(cardsLists);
        }
    }

    if (isOpenCardDialogBtn) {
        var closestColumn = target.closest('.' + COLUMN_CLASS);
        var columnContentHeight = closestColumn.querySelector('.' + COLUMN_CONTENT_CLASS).offsetHeight;
        var columnTitleHeight = closestColumn.querySelector('.' + COLUMN_TITLE_CLASS).offsetHeight;
        var cardActionHeight = closestColumn.querySelector('.' + CARD_ACTIONS_CLASS).offsetHeight;
        var columnHeight = closestColumn.offsetHeight - columnTitleHeight - cardActionHeight;

        if (columnContentHeight > columnHeight) {
            target.closest('.' + COLUMN_CONTENT_CLASS).scrollTop = target.closest('.' + COLUMN_CONTENT_CLASS).scrollHeight;
        }
    }
};
