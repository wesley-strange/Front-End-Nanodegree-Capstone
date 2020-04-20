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
            longitude: res.postalCodes[0].lng,
            latitude: res.postalCodes[0].lat,
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
            data = res.data;
        })
    })
}

export { handleSubmit }