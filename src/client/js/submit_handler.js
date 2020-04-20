function handleSubmit(event) {
    event.preventDefault()
    
    let destination = {
        placename: document.getElementById('destination').value,
        postalcode: document.getElementById('zip').value
    };
    console.log(destination);

    let travel_dates = {
        start: document.getElementById('start').value,
        end: document.getElementById('end').value
    };
    console.log(travel_dates);

    fetch("http://localhost:8081/geo", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(destination)
    })
    .then(res => res.json())
    .then(function(res) {
        let location = res.geonames;
        console.log(location)
    })
}

export { handleSubmit }