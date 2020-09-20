function renderCards() {
}

function drawChart(data) {
    const canvas = document.getElementById("weatherChart");
    canvas.style.backgroundColor = 'rgba(242, 53, 87, 0.1)';
    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',
        // The data for our dataset
        data: {
            labels: data.weatherDescription,
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
