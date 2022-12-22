const domVars = {};

window.addEventListener("load", () => {
  domVars.loginForm = document.getElementById("login-form");
  domVars.submitLoginBtn = document.getElementById("submit-login-button");
});

export { domVars };
