import { domVars } from "./dom.js";
import { submitLogin } from "./authtest.js";

window.addEventListener("load", () => {
  domVars.submitLoginBtn.addEventListener("click", submitLogin);
});
