/**
 * @description Function runs when the user clicks on the "Add Trip" button. 
 *   The function takes the destination and start date input by the user. Then 
 *   uses requests to 3 APIs (geonames, weatherbit, and pixabay) to pull in 
 *   current/forecasted weather and image of destination. Finally, the add_trip
 *   function is called to update the DOM with the new trip information.
 */
function handleSubmit(event) {
    event.preventDefault()

    //validate that the user entered a destination.. If not, send alert.
    if (document.getElementById('destination').value == "") {
        return window.alert("Please enter a destination.");
    } 

    //validate that the user entered a date.. If not, send alert.
    if (!document.getElementById('start').value) {
        return window.alert("Please enter a start date");
    }

    //grab the destination and travel start date input from the HTML
    const destination = {
        placename: document.getElementById('destination').value
    };
    const start_date =  document.getElementById('start').value;

    /**
     * @description parses inputted date in yyyy-mm-dd format
     *   https://stackoverflow.com/questions/2627650/why-javascript-gettime-is-not-a-function
     * @param {string} input - start date input by user
     * @returns {Date} Date format of input value
     */
    function parseDate(input) {
        var parts = input.match(/(\d+)/g);
        // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
        return new Date(parts[0], parts[1]-1, parts[2]); // months are 0-based
    }

    //calculate the time difference between trip start date and today's date
    const now = new Date().getTime();
    const time_diff = parseDate(start_date).getTime() - now; 
    const days_diff = Math.round(time_diff / (1000 * 3600 * 24)); 

    /**
     * Determine which weather api to pull data from
     * - if days_diff <= 7, pull the current weather
     * - else pull the forecasted weather
     */ 
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
        //input data for the weather api
        const location = {
            longitude: res.geonames[0].lng,
            latitude: res.geonames[0].lat,
            api: weather_api
        }
        
        //fetch weather forecast for destination from weatherbit API
        fetch("http://localhost:8081/weather", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(location)
        })
        .then(res => res.json())
        .then(function(res) {           
            /**
             * Store the data received from weatherbit API
             * - It will either be one value or multiple depending on the 
             *   API used.
             */
            if (weather_api == "current") {
                let temp = Math.round(res.data[0].temp * 9 / 5 + 32);
                weather = [`Current temperature: ${temp}`];
            } else {
                var i;
                for (i = 0; i < res.data.length; i++) {
                    const forecast_date = res.data[i].datetime;
                    const forecast_max = Math.round(res.data[i].max_temp * 9 / 5 + 32);
                    const forecast_min = Math.round(res.data[i].low_temp * 9 / 5 + 32);

                    const new_record = `${forecast_date.slice(5)}   Max: ${forecast_max}   Min: ${forecast_min}`
                    weather.push(new_record)
                }
            }
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
                //if image URL is returned by pixabay, use that image
                if (res.hits[0]) {
                    image = res.hits[0].webformatURL;
                } else { //else show an image of chicago (can be changed)
                    window.alert("Sorry, no image was found for your destination. Here's a pic of a dog.");
                    image = 'https://loremflickr.com/450/300/dog';
                }
            })
            .then(function() {
                //add new trip to webpage
                Client.addTrip(destination, start_date, weather, image, days_diff);
            })
        })
    })
}

export { handleSubmit }