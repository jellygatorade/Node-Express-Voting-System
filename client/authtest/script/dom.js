const domVars = {};

window.addEventListener("load", () => {
  domVars.loginForm = document.getElementById("login-form");
  domVars.submitLoginBtn = document.getElementById("submit-login-button");

  domVars.awaitResponseDiv = document.getElementById("await-response-div");
  domVars.waitingForResponse = document.getElementById("waiting-for-response");
  domVars.loginSuccess = document.getElementById("login-success");
  domVars.loginFailed = document.getElementById("login-failed");

  domVars.authenticatedContent = document.getElementById(
    "authenticated-content-div"
  );
});

export { domVars };
