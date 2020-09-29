function renderCards(data) {
    renderCard(data);
    drawChart(data.weather);
}

function renderCard(data) {
    const cardList = document.getElementById('cardList');
    let templateStr = '';
    // for (let card in cards) {
        const cardElemStr = `
            <div class="card">
                <div class="city-img">
                    <img src="${data.cityImage.url}" alt="Image of ${data.form.destination}" onerror="Client.alternativeImage(event)"/>
                </div>
                <div class="card-travel-data">
                    <span>Destination: ${data.form.destination}</span><br>
                    <span>Date: ${data.form.date}</span><br>
                    <span>Typical weather for then is: High: ${Math.round(data.weatherDay.max_temp)} °C, Low: ${Math.round(data.weatherDay.min_temp)} °C</span>
                </div>
                <div class="card-personal-data">
                    <span>Name: ${data.form.firstName} ${data.form.lastName}</span><br>
                </div>
                <div class="weather-data" id="weatherData">
                    <canvas id="weatherChart"></canvas>
                </div>
            </div>`
        templateStr = `${templateStr}${cardElemStr}`;
    // }
    cardList.insertAdjacentHTML("afterbegin", templateStr);
    // resultsBox.style.display = 'block';

}

function drawChart(data) {
    const canvas = document.getElementById("weatherChart");
    canvas.style.backgroundColor = 'rgba(174, 236, 241, 1)';
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
                text: `Temperature in ${data.name}`
            },
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

function clearAllCards() {
    Client.clear();
    document.getElementById('cardList').innerHTML = '';
}

function alternativeImage(e) {
    e.target.src = './src/client/img/alternativeImage.jpg'
}

export {drawChart}
export {renderCards}
export {clearAllCards}
export {alternativeImage}
