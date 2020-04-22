function addTrip(dest, start, weath, image, days_diff) {
    //initialize new DocumentFragment to build new trip
    let trip_frag = new DocumentFragment();

    //create trip post div
    let trip_div = document.createElement('div');
    trip_div.classList.add("trip_post");

    //append image to the new trip div
    let image_div = document.createElement('div');
    image_div.classList.add("left");

    let image_pic = document.createElement('img');
    image_pic.setAttribute("src", image);
    image_pic.setAttribute("height", "300");
    image_pic.setAttribute("width", "450");

    image_div.appendChild(image_pic);
    trip_div.appendChild(image_div);


    //append details to the new trip div
    let details_div = document.createElement('div');
    details_div.classList.add("right");

    let destination = document.createElement('div');
    destination.textContent = "Upcoming trip to: " + dest.placename;
    details_div.appendChild(destination);

    let departing = document.createElement('div');
    departing.textContent = "Starts on: " + start;
    details_div.appendChild(departing);

    let countdown = document.createElement('div');
    countdown.textContent = "Only " + days_diff + " days away!!";
    details_div.appendChild(countdown);

    let weather = document.createElement('div');
    if (weath.length > 1) {
        var i;
        var text = "";
        for (i = 0; i < 5; i++) {
            if (i == 0) {
                text = text + weath[i];
            }
            text = text + "\n" + weath[i]
        }
        weather.innerText = "Upcoming forecast: \n" + text;
    } else {
        weather.textContent = weath;
    }
    
    details_div.appendChild(weather);

    let button_div = document.createElement('div');
    button_div.classList.add("form_item");
    let button = document.createElement('input');
    button.setAttribute("type", "submit");
    button.setAttribute("value", "Remove Trip");
    button_div.appendChild(button);

    details_div.appendChild(button_div);
    
    trip_div.appendChild(details_div);

    trip_frag.appendChild(trip_div);


    //append new trip fragment to the trip grid in HTML
    const trip_section = document.querySelector("#trip_grid");
    trip_grid.appendChild(trip_frag);
}

export { addTrip }