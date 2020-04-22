import "@babel/polyfill";
import { handleSubmit } from "./js/submit_handler";
import { addTrip } from "./js/add_trip";

import "./styles/base.scss";
import "./styles/footer.scss";
import "./styles/form.scss";
import "./styles/header.scss";
import "./styles/trip.scss";

window.addEventListener('load', (event) => {
    console.log('page loaded')
    const submit = document.getElementById('add_trip')
    submit.addEventListener('click', Client.handleSubmit)
});

export {
    handleSubmit,
    addTrip
}