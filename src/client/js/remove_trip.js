/**
 * @description Removes trip from the webpage
 */
function removeTrip(element) {
    //Removes trip box from screen when "Remove Trip" button is clicked
    element.parentNode.parentNode.parentNode.remove();
}

export { removeTrip }