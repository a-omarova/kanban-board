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
