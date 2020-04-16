import "@babel/polyfill";
import { handleSubmit } from "./js/submit_handler";

import "./styles/base.scss";
import "./styles/footer.scss";
import "./styles/form.scss";
import "./styles/header.scss";

window.addEventListener('load', (event) => {
    console.log('Page has been loaded')

    const submit = document.getElementById('submit')
    submit.addEventListener('click', Client.handleSubmit)
});

export {
    handleSubmit
}