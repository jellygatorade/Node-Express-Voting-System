import { domVars } from "./dom.js";

let endpoint = "http://localhost:3000/admin";
let data; // does data need to be defined globally?

function resetAwaitingResponseUI() {
  domVars.awaitResponseDiv.style.display = "inline";
  domVars.waitingForResponse.style.display = "inline";
  domVars.loginSuccess.style.display = "none";
  domVars.loginFailed.style.display = "none";

  domVars.authenticatedContent.innerHTML = "";
}

async function submitLogin(event) {
  event.preventDefault();

  // Retrieve data from the form
  const creds = new FormData(domVars.loginForm);
  let formJSON = Object.fromEntries(creds.entries());
  //console.log(formJSON);

  // For basic auth
  const FetchRequestOptions = {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors",
    withCredentials: true,
    credentials: "include",
    headers: {
      Authorization:
        "Basic " + window.btoa(`${formJSON.username}:${formJSON.password}`),
    },
  };

  // Display awaiting response UI
  resetAwaitingResponseUI();

  // Make the fetch request
  const response = await fetch(endpoint, FetchRequestOptions)
    .then((response) => {
      console.log(response);

      if (response.ok) {
        // Login successful

        // Change awaiting response UI
        domVars.waitingForResponse.style.display = "none";
        domVars.loginSuccess.style.display = "inline";

        data = response.json();
        return data;
      } else {
        // Login failed

        // Change awaiting response UI
        domVars.waitingForResponse.style.display = "none";
        domVars.loginFailed.style.display = "inline";

        throw new Error("Something went wrong");
      }
    })
    .then((data) => {
      console.log(data);
      domVars.authenticatedContent.innerHTML = JSON.stringify(data, null, 2);
    })
    .catch((error) => {
      console.log(error);
    });
}

export { submitLogin };
