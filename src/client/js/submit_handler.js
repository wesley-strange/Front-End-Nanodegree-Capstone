function handleSubmit(event) {
    event.preventDefault()
    
    //grab the destination input from the HTML
    let destination = {
        placename: document.getElementById('destination').value,
        postalcode: document.getElementById('zip').value
    };
    console.log(destination); //debug: remove

    //grab the travel dates input from the HTML
    let travel_dates = {
        start: document.getElementById('start').value,
        end: document.getElementById('end').value
    };
    console.log(travel_dates); //debug: remove

    //fetch location info (lat/long) from Geocodes API
    fetch("http://localhost:8081/geo", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(destination)
    })
    .then(res => res.json())
    .then(function(res) {
        let location = {
            longitude: res.geonames[0].lng,
            latitude: res.geonames[0].lat,
        }
        console.log(location); //debug: remove

        fetch("http://localhost:8081/weather", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(location)
        })
        .then(res => res.json())
        .then(function(res) {
            console.log(res); //debug: remove
            let forecast = [];
            
            var i;
            for (i = 0; i < res.data.length; i++) {
                let forecast_date = res.data[i].datetime;
                let forecast_max = Math.round(res.data[i].max_temp * 9 / 5 + 32);
                let forecast_min = Math.round(res.data[i].low_temp * 9 / 5 + 32);

                let new_record = `${forecast_date}   Max: ${forecast_max}   Min: ${forecast_min}`
                forecast.push(new_record)
            }
            console.log(forecast);
        })
        .then(function() {
            fetch("http://localhost:8081/pixabay", {
            method: "POST",
            credentials: "same-origin",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(destination)
            })
            .then(res => res.json())
            .then(function(res) {
                console.log(res); //debug: remove
            })
        })
    })
}

export { handleSubmit }