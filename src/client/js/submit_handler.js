function handleSubmit(event) {
    event.preventDefault()
    
    //grab the destination and travel dates input from the HTML
    let destination = {
        placename: document.getElementById('destination').value
    };

    // grab the travel start / end dates from the HTML
    let start_date =  document.getElementById('start').value;

    //https://stackoverflow.com/questions/2627650/why-javascript-gettime-is-not-a-function
    // parse a date in yyyy-mm-dd format
    function parseDate(input) {
        var parts = input.match(/(\d+)/g);
        // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
        return new Date(parts[0], parts[1]-1, parts[2]); // months are 0-based
    }

    // To calculate the time difference of two dates 
    // To calculate the no. of days between two dates 
    //var time_diff = parseDate(start_date).getTime() - parseDate(start_date).getTime(); 
    //var days_diff = time_diff / (1000 * 3600 * 24); 
    //console.log(days_diff);

    var days_diff = 7;

    let weather_api = "";

    if (days_diff <= 7) {
        weather_api = "current";
    } else {
        weather_api = "forecast";
    }

    //initialize forecast and image variables
    let weather = [];
    let image = "";

    //fetch location info (lat/long) from geocodes API
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
            start_date: destination.start_date,
            end_date: destination.end_date,
            api: weather_api
        }
        console.log(location); //debug: remove
        
        //fetch weather forecast for destination from weatherbit API
        fetch("http://localhost:8081/weather", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(location)
        })
        .then(res => res.json())
        .then(function(res) {
            console.log(res); //debug: remove
            
            if (weather_api == "current") {
                let temp = Math.round(res.data[0].temp * 9 / 5 + 32);
                weather = [`Current temperature: ${temp}`];
            } else {
                var i;
                for (i = 0; i < res.data.length; i++) {
                    let forecast_date = res.data[i].datetime;
                    let forecast_max = Math.round(res.data[i].max_temp * 9 / 5 + 32);
                    let forecast_min = Math.round(res.data[i].low_temp * 9 / 5 + 32);

                    let new_record = `${forecast_date}   Max: ${forecast_max}   Min: ${forecast_min}`
                    weather.push(new_record)
                }
            }
            console.log(weather);
        })
        .then(function() {
            //fetch image of destination from pixabay API
            fetch("http://localhost:8081/pixabay", {
            method: "POST",
            credentials: "same-origin",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(destination)
            })
            .then(res => res.json())
            .then(function(res) {
                console.log(res); //debug: remove

                image = res.hits[0].webformatURL;
                console.log(image);
            })
        })
        .then(Client.addTrip())
    })
}

export { handleSubmit }