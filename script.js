'use strict';

var ACTIONS_CLASS = 'column__actions';
var OPEN_DIALOG_CLASS = 'js-open-dialog';
var CLOSE_DIALOG_CLASS = 'js-close-dialog';
var ACTIONS_OPEN_DIALOG_MOD = 'column__actions_open-dialog'

var addColumnActions = `<div class="column__column-actions">
                            <input class="dialog dialog_column" placeholder="Введите название колонки">
                            <div class="buttons">
                                <svg class="buttons__icon js-close-column-dialog" width="15" height="15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M14.141 6.641H8.36V.86A.88.88 0 0 0 7.5 0a.88.88 0 0 0-.859.859V6.64H.86A.88.88 0 0 0 0 7.5c0 .458.4.859.859.859H6.64v5.782c0 .458.401.859.859.859a.88.88 0 0 0 .859-.859V8.36h5.782A.88.88 0 0 0 15 7.5a.88.88 0 0 0-.859-.859z" fill="#6B808C"/>
                                </svg>
                                <span class="button__icon"></span>
                                <button class="open-dialog-button js-open-column-dialog">
                                    Добавить еще одну колонку
                                </button>
                                <button class="add-button js-add-column">
                                    Добавить колонку
                                </button>
                            </div>
                        </div>`;

var container = document.querySelector('.container');
var columns = Array.from(document.querySelectorAll('.column'));
var createNewColumn = function () {
    var column = document.createElement('section');
    column.setAttribute('class', 'column');
    column.innerHTML = addColumnActions;

    return column;
};

container.onclick = function(event) {
    var target = event.target;
    var isOpenCardDialogBtn = target.classList.contains(OPEN_DIALOG_CLASS);
    var isCloseCardDialogBtn = target.classList.contains(CLOSE_DIALOG_CLASS);

    if (isOpenCardDialogBtn) {
        target.closest('.' + ACTIONS_CLASS).classList.add(ACTIONS_OPEN_DIALOG_MOD); // TODO хрень какая то с классами надо придумать название
    }

    if (isCloseCardDialogBtn || target.closest('.' + CLOSE_DIALOG_CLASS)) {
        target.closest('.' + ACTIONS_CLASS).classList.remove(ACTIONS_OPEN_DIALOG_MOD);
    }

    console.log('target', target);
    console.log('target.closest(CLOSE_DIALOG_CLASS)', target.closest(CLOSE_DIALOG_CLASS));
};


