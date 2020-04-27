/**
 * @description Adds new trip to the webpage using information input by user
 *   and returned by the APIs.
 * @param {string} dest: destination
 * @param {string} start: start date of trip
 * @param {Array} weath: current or forecasted weather
 * @param {string} image: url of image to display for trip
 * @param {number} days_diff: number of days until trip start date
 */
function addTrip(dest, start, weath, image, days_diff) {
    //generates a random trip_id between 0 and 1 used to remove trip if needed
    const trip_id = Math.random();

    //initialize new DocumentFragment to build new trip post
    let trip_frag = new DocumentFragment();

    //create trip post div
    let trip_div = document.createElement('div');
    trip_div.classList.add("trip_post");
    trip_div.classList.add(trip_id);

    /**
     * Build image section for trip post
     * - Create image div
     */
    let image_div = document.createElement('div');
    image_div.classList.add("image");

    let image_pic = document.createElement('img');
    image_pic.setAttribute("src", image);
    //image_pic.setAttribute("height", "300");
    //image_pic.setAttribute("width", "450");

    image_div.appendChild(image_pic);
    trip_div.appendChild(image_div);

    /**
     * Build details section for trip post
     * - Create details div
     * - Create destination details div
     * - Create start date div
     * - Create countdown div
     *   > Show how many days the trip is away
     *   > Display an expired message if trip is in the past
     * - Create weather div
     * - Create button div
     * - Finally, append the new tirp post to the trip_frag document
     */
    let details_div = document.createElement('div');
    details_div.classList.add("details");

    let destination = document.createElement('div');
    destination.classList.add("trip");

    let dest_name = document.createElement('h2');
    dest_name.textContent = "Trip to " + dest.placename;
    destination.appendChild(dest_name);
    details_div.appendChild(destination);

    let departing = document.createElement('div');
    departing.classList.add("trip");
    departing.textContent = "Starts on: " + start;
    details_div.appendChild(departing);

    let countdown = document.createElement('div');
    countdown.classList.add("trip");
    if (days_diff < 0) {
        countdown.textContent = "Trip expired. Hope you had fun!!";
    } else {
        countdown.textContent = "Only " + days_diff + " days away!!";
    }
    
    details_div.appendChild(countdown);

    let weather = document.createElement('div');
    weather.classList.add("trip");
    if (weath.length > 1) {
        var i;
        var text = "";
        for (i = 0; i < 5; i++) {
            if (i == 0) {
                text = text + weath[i];
            } else {
                text = text + "\n" + weath[i]
            }
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
    button.setAttribute("id", trip_id);
    button.addEventListener('click', function(event) {
        Client.removeTrip(this)
    })
    button_div.appendChild(button);

    details_div.appendChild(button_div);
    
    trip_div.appendChild(details_div);

    trip_frag.appendChild(trip_div);


    //append new trip fragment to the trip grid in HTML
    const trip_section = document.querySelector("#trip_grid");
    trip_grid.appendChild(trip_frag);
}

export { addTrip }