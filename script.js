'use strict';

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
// var cardActionsContainers = document.querySelectorAll('.column__card-actions');
//  var addCardButton = column.querySelector('.js-add-card');

var createNewColumn = function () {
    var column = document.createElement('section');
    column.setAttribute('class', 'column');
    column.innerHTML = addColumnActions;

    return column;
};

columns.forEach(function(column) {
    console.log('1', columns.length);
    var cards = column.querySelectorAll('.card');

    if (cards.length === 0) {
        var openColumnDialogButton = column.querySelector('.js-open-column-dialog');
        var closeColumnDialogButton = column.querySelector('.js-close-column-dialog');

        openColumnDialogButton.addEventListener('click', function() {
            openColumnDialogButton.closest('.column__column-actions').classList.add('column__column-actions_open-dialog'); //TODO const class
            if (columns.length < 4) {
                container.appendChild(createNewColumn());
                columns.push(createNewColumn());
                console.log('2', columns.length);
            }
        });

        closeColumnDialogButton.addEventListener('click', function() {
            closeColumnDialogButton.closest('.column__column-actions').classList.remove('column__column-actions_open-dialog'); //TODO const class
            container.removeChild(createNewColumn());
            columns.push(createNewColumn());
        });
    } else {
        var openCardDialogButton = column.querySelector('.js-open-card-dialog');
        var closeCardDialogButton = column.querySelector('.js-close-card-dialog');

        openCardDialogButton.addEventListener('click', function() {
            openCardDialogButton.closest('.column__card-actions').classList.add('column__column-actions_open-dialog'); //TODO const class
        });

        closeCardDialogButton.addEventListener('click', function() {
            closeCardDialogButton.closest('.column__card-actions').classList.remove('column__column-actions_open-dialog'); //TODO const class
        });
    }
});
