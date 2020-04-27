import "@babel/polyfill";
import { handleSubmit } from "../src/client/js/submit_handler";

// tests whether the handleSubmit function is defined
describe(handleSubmit, () => {
    test("it is defined", () => {
        expect(handleSubmit).toBeDefined
    });
});