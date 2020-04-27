import "@babel/polyfill";
import { handleSubmit } from "../src/client/js/submit_handler";

describe(handleSubmit, () => {
    test("it is defined", () => {
        expect(handleSubmit).toBeDefined
    });
});