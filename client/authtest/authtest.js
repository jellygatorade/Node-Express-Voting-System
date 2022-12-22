let endpoint = "http://localhost:3000/admin";

// For basic auth
const FetchRequestOptions = {
  method: "GET", // *GET, POST, PUT, DELETE, etc.
  mode: "cors",
  withCredentials: true,
  credentials: "include",
  headers: {
    Authorization: "Basic " + window.btoa("ben:my-favorite-password"),
  },
};

// GET the existing data (data.json on server)
const response = await fetch(endpoint, FetchRequestOptions);
const data = response.json();

console.log(response);
console.log(data);
