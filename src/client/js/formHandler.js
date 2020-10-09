let chosenCity = null;

// To match the requirement: "There should be a primary object with placeholder member value pairs."
const primaryObject = {member: 'value'};

function openFormDialog(event) {
    event.target.reportValidity();
    event.preventDefault();
    event.stopPropagation();
    chosenCity = null;
    let formModal = document.getElementById('formModal');
    let autoCompleteList = document.getElementById('autoCompleteList');
    Client.removeClass(formModal, 'display-none');
    Client.addClass(autoCompleteList, 'display-none');
    registerAutocompleteHandler(document.getElementById('destination'));
}


function getFormData() {
    const formData = {};
    formData.firstName = document.getElementById('firstName').value.trim();
    formData.lastName = document.getElementById('lastName').value.trim();
    formData.destination = document.getElementById('destination').value.trim();
    formData.destinationDetails = chosenCity;
    formData.date = document.getElementById('date').value
    return formData;
}

function submitForm(event) {
    event.preventDefault();
    event.stopPropagation();
    let elemTravelForm = document.getElementById('travelForm');
    if (!elemTravelForm.checkValidity()) {
        elemTravelForm.reportValidity();
        return;
    }
    if (!chosenCity) {
        document.getElementById('destination').value = null;
        elemTravelForm.reportValidity();
        return;
    }
    const formData = getFormData();
    const loadingSpinner = document.getElementById('loadingModal');
    Client.removeClass(loadingSpinner, 'display-none');
    restCall('book-travel', 'Post', formData)
        .then(data => {
            Client.addClass(loadingSpinner, 'display-none');
            closeFormDialog();
            const randomId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            Client.setItem(randomId, data);
            document.getElementById('cardList').innerHTML = '';
            Client.renderCards();
        });

}

function closeFormDialog(event = undefined) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    let formModal = document.getElementById('formModal');
    resetForm();
    Client.addClass(formModal, 'display-none');
}

function resetForm() {
    document.getElementById('firstName').value = null;
    document.getElementById('lastName').value = null;
    document.getElementById('destination').value = null;
    document.getElementById('date').value = null;
    resetAutocompleteList();
    resetChosenCity();
}

function registerAutocompleteHandler(inputElem) {
    return inputElem.addEventListener("input", debounce(autocompleteHandler, 300));
}

// Debounce function from https://stackoverflow.com/a/51493084/8712609
function debounce(callback, delay) {
    let timeoutHandler = null;
    return function () {
        clearTimeout(timeoutHandler);
        timeoutHandler = setTimeout(function () {
            callback();
        }, delay);
    }
}

function autocompleteHandler() {
    let val = document.getElementById('destination').value;
    if (!val) {
        resetAutocompleteList();
        resetChosenCity();
        return false;
    }
    restCall('cities', 'Get', {searchValue: val})
        .then(data => renderAutocompleteList(data));
}

function renderAutocompleteList(data) {
    resetAutocompleteList();
    if (!data) {
        return;
    }
    const autoCompleteList = document.getElementById('autoCompleteList');
    let elemAutoCompleteItem;
    data.forEach(item => {
        elemAutoCompleteItem = document.createElement("DIV");
        elemAutoCompleteItem.setAttribute("id", `${item['countryId']}`);
        elemAutoCompleteItem.setAttribute("class", "registerAutocompleteHandler-item");
        elemAutoCompleteItem.innerHTML = `${item['toponymName']} (${item['countryName']})`;
        elemAutoCompleteItem.addEventListener("click", function (e) {
            /*insert the value for the registerAutocompleteHandler text field:*/
            document.getElementById('destination').value = e.target.innerHTML;
            setChosenCity(item);
            resetAutocompleteList();
            Client.addClass(autoCompleteList, 'display-none');
        });
        document.getElementById('autoCompleteList').appendChild(elemAutoCompleteItem);
    })
    Client.removeClass(autoCompleteList, 'display-none');
}

function setChosenCity(city) {
    chosenCity = city;
}

function resetChosenCity() {
    chosenCity = null;
}

function resetAutocompleteList() {
    document.getElementById('autoCompleteList').innerHTML = '';
}


async function restCall(url, method, data) {
    const urlPrefix = 'http://localhost:3000/';
    try {
        let response;
        if (method === 'Post') {
            response = await fetch(urlPrefix + url, {
                method: method,
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
        } else if (method === 'Get') {
            response = await fetch(urlPrefix + url + chainGetQueryParams(data), {
                method: method,
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
        }
        const resData = response.json();
        return resData;
    } catch (e) {
        console.error(e);
    }

}

function chainGetQueryParams(data) {
    let queryParam = '';
    if (Object.keys(data) && Object.keys(data).length > 0) {
        queryParam = '?';
        Object.keys(data).forEach((item, index) => {
            if (index === 0) {
                queryParam += `${item}=${data[item]}`;
            } else {
                queryParam += `&${item}=${data[item]}`;
            }
        });
    }
    return queryParam;
}

export {openFormDialog};
export {closeFormDialog};
export {submitForm};
export {chainGetQueryParams};
export {registerAutocompleteHandler};
