// Node.js imports (CommonJS modules)
const express = require("express");
const fs = require("fs").promises; // read and write methods retrieved in the promise implementation
const path = require("path");

// Local imports (CommonJS modules)
const { processVotesData } = require("./process-data");
const { authenticate } = require("./auth");

const SERVER_PORT = 3000;
const CLIENT_ORIGIN = "http://127.0.0.1:8080";

const app = express();

const dataFile = path.join(__dirname, "data/data.json"); // equivalent to "./data/data.json"

/*********************************
 * Setup Express middleware
 * https://expressjs.com/en/guide/using-middleware.html
 *********************************/

// Support POSTing form data with URL encoded
//
// See these links about using "application/x-www-form-urlencoded" versus "multipart/form-data"
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST
// https://stackoverflow.com/questions/4007969/application-x-www-form-urlencoded-or-multipart-form-data
app.use(express.urlencoded({ extended: true }));

// // Enable CORS
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   next();
// });

// Enable CORS
//
// Testing Authenticated Endpoint
// Following: https://benborgers.com/posts/express-password-protect
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", CLIENT_ORIGIN);
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Headers", "authorization");

  next();
});

/*********************************
 * ./poll endpoint - GET handler
 *********************************/
app.get("/poll", async (req, res) => {
  //res.send("hello"); // original test

  let data = JSON.parse(await fs.readFile(dataFile, "utf-8"));

  data = processVotesData(data);

  res.json(data);
});

/**********************************
 * ./poll endpoint - POST handler
 **********************************/
app.post("/poll", async (req, res) => {
  const data = JSON.parse(await fs.readFile(dataFile, "utf-8"));

  data[req.body.add]++; // req.body represents the user's input (POST method passes a form object within the request body, body contains a query string created in the POST request options with add as a key)

  //console.log(req.body);

  await fs.writeFile(dataFile, JSON.stringify(data));

  res.end();
});

/**********************************
 * ./admin endpoint - GET handler
 **********************************/
app.get("/admin", async (req, res) => {
  //console.log(req.header("Origin"));

  const reject = () => {
    res.setHeader("www-authenticate", "Basic");
    res.sendStatus(401);
  };

  const authorization = req.headers.authorization;

  if (!authorization) {
    return reject();
  }

  if (!authenticate(authorization)) {
    return reject();
  } else {
    //res.send("hello"); // original test

    let data = JSON.parse(await fs.readFile(dataFile, "utf-8"));

    data = processVotesData(data);

    res.json(data);
  }
});

/*******************************************
 * Listen for connections on specified port
 *******************************************/
app.listen(SERVER_PORT, () => console.log("server is running..."));
