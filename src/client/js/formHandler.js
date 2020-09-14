function openFormDialog(event) {
    event.target.reportValidity();
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

function submitForm(event) {
    event.preventDefault();
    event.stopPropagation();
    let elemTravelForm = document.getElementById('travelForm');
    if (!elemTravelForm.checkValidity()) {
        elemTravelForm.reportValidity();
        return;
    }
}

export {openFormDialog};
export {closeFormDialog};
export {submitForm};
