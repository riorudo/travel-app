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
                <div class="card-travel-data">
                    <span>Destination: ${data.form.destination}</span><br>
                    <span>Date: ${data.form.date}</span>
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

export {drawChart}
export {renderCards}
