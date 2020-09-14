function openFormDialog(event) {
    event.preventDefault();
    event.stopPropagation();
    let formModal = document.getElementById('formModal');
    Client.removeClass(formModal, 'display-none');
}

function closeFormDialog(event) {
    event.preventDefault();
    event.stopPropagation();
    let formModal = document.getElementById('formModal');
    Client.addClass(formModal, 'display-none');
}

function submitForm() {

}

export {openFormDialog};
export {closeFormDialog};
export {submitForm};
