function renderCards() {
    const items = Client.getAllItems();
    if (!items || items.length < 1) {
        Client.removeClass(document.getElementById('welcomeCard'), 'display-none');
        Client.addClass(document.getElementById('cardListHeader'), 'display-none');
        return;
    }
    Client.addClass(document.getElementById('welcomeCard'), 'display-none');
    Client.removeClass(document.getElementById('cardListHeader'), 'display-none');
    const sortedItems = sortCards(items);
    sortedItems.forEach(sortedItems => {
        const data = sortedItems.value;
        renderCard(data, sortedItems.key);
        drawChart(data.weather, sortedItems.key);
    });
}

function renderCard(data, id) {
    const cardList = document.getElementById('cardList');
    let templateStr = '';
    const cardElemStr = `
            <div class="card ${data.styleClass}" id="card_${id}">
                <div class="card-ribbon">trip expired</div>
                <div class="card-header">
                    <h3>${data.form.destination}${data.daysLeft}</h3>
                </div>
                <div class="travel-data">
                    <div class="city-img">
                        <img src="${data.cityImage.url}" alt="Image of ${data.form.destination}" onerror="Client.setAlternativeImage(event)"/>
                    </div>
                    <div class="travel-information">
                        <span class="travel-information-key">Passenger: </span><span class="travel-information-value">${data.form.firstName} ${data.form.lastName}</span><br>
                        <span class="travel-information-key">Destination: </span><span class="travel-information-value">${data.form.destination}</span><br>
                        <span class="travel-information-key">Date: </span><span class="travel-information-value">${data.form.date}</span><br>
                        <span class="travel-information-key">Typical weather for then is: </span><span class="travel-information-value">High: ${Math.round(data.weatherDay.max_temp)} °C, Low: ${Math.round(data.weatherDay.min_temp)} °C</span>
                        <div class="clear-btn">
                            <button class="clickable" title="Delete trip." onclick="Client.removeCard(event)" id="cardBtn_${id}">remove trip</button>
                        </div>
                    </div>
                </div>
                <div class="weather-data" id="weatherData_${id}">
                    <canvas id="weatherChart_${id}"></canvas>
                </div>
            </div>`
    templateStr = `${templateStr}${cardElemStr}`;
    cardList.insertAdjacentHTML("beforeend", templateStr);
}

function drawChart(data, id) {
    const canvas = document.getElementById(`weatherChart_${id}`);
    canvas.style.backgroundColor = 'rgba(250, 250, 210, 1)';
    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',
        // The data for our dataset
        data: {
            labels: data.date,
            datasets: [
                {
                    label: 'min ℃',
                    borderColor: 'rgb(34, 178, 218)',
                    fill: false,
                    data: data.minTemp
                },
                {
                    label: 'max ℃',
                    borderColor: 'rgb(242, 53, 87)',
                    fill: false,
                    data: data.maxTemp
                }
            ]
        },
        // Configuration options go here
        options: {
            title: {
                display: true,
                text: `${data.name} - 16 days temperature forecast`
            },
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

function sortByDateDesc(a, b) {
    const dateA = new Date(a.value.form.date);
    const dateB = new Date(b.value.form.date);
    if (dateA < dateB) {
        return 1;
    }
    if (dateA > dateB) {
        return -1;
    }
    return 0;
}

function sortByDateAsc(a, b) {
    const dateA = new Date(a.value.form.date);
    const dateB = new Date(b.value.form.date);
    if (dateA < dateB) {
        return -1;
    }
    if (dateA > dateB) {
        return 1;
    }
    return 0;
}

// Future dates -> next coming up date is first
// Past dates -> nearest to current date is first
function sortCards(items) {
    let pastDates = [];
    let comingUpDates = [];
    items.forEach(item => {
        if (new Date(item.value.form.date) < new Date()) {
            item.value.styleClass = 'past-date';
            pastDates.push(item);
        } else {
            item.value.styleClass = 'coming-up-date';
            comingUpDates.push(item)
        }
    });
    comingUpDates = comingUpDates.sort(sortByDateAsc);
    pastDates = pastDates.sort(sortByDateDesc);
    return [...comingUpDates, ...pastDates];
}

function removeCard(event) {
    event.preventDefault();
    event.stopPropagation();
    if (window.confirm("The selected trip will be deleted. Are you sure?")) {
        const cardId = event.target.id.replace('cardBtn_', '');
        Client.removeItem(cardId);
        document.getElementById(`card_${cardId}`).remove();
        const items = Client.getAllItems();
        if (!items || items.length < 1) {
            Client.removeClass(document.getElementById('welcomeCard'), 'display-none');
            Client.addClass(document.getElementById('cardListHeader'), 'display-none');
        }
    }
}

function removeAllCards() {
    if (window.confirm("All trips will be deleted. Are you sure?")) {
        Client.removeAllItems();
        document.getElementById('cardList').innerHTML = '';
        Client.removeClass(document.getElementById('welcomeCard'), 'display-none');
        Client.addClass(document.getElementById('cardListHeader'), 'display-none');
    }
}

function setAlternativeImage(e) {
    e.target.src = './src/client/img/alternativeImage.jpg'
}

export {drawChart}
export {renderCards}
export {removeCard}
export {removeAllCards}
export {setAlternativeImage}
