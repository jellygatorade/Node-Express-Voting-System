import { domVars } from "./dom.js";

let endpoint = "http://localhost:3000/admin";

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

  // Make the fetch request
  const response = await fetch(endpoint, FetchRequestOptions);
  const data = response.json();

  console.log(response);
  console.log(data);
}

export { submitLogin };
