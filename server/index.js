const express = require("express");
const fs = require("fs").promises; // read and write methods retrieved in the promise implementation
const path = require("path");

const { processVotesData } = require("./process-data");

const app = express();
const dataFile = path.join(__dirname, "data.json"); // equivalent to "./data.json"

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

/********************************************************
 * Testing Authenticated Endpoint
 * Following: https://benborgers.com/posts/express-password-protect
 */

// Enable CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:8080");
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Headers", "authorization");

  next();
});

// Response to GET request at the ./poll endpoint
app.get("/poll", async (req, res) => {
  //res.send("hello"); // original test

  let data = JSON.parse(await fs.readFile(dataFile, "utf-8"));

  data = processVotesData(data);

  res.json(data);
});

// Response to POST request at the ./poll endpoint
app.post("/poll", async (req, res) => {
  const data = JSON.parse(await fs.readFile(dataFile, "utf-8"));

  data[req.body.add]++; // req.body represents the user's input (POST method passes a form object within the request body)

  //console.log(req.body);

  await fs.writeFile(dataFile, JSON.stringify(data));

  res.end();
});

//////////////////////////////////////////////////////////////////

// Response to GET request at the ./poll endpoint
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

  const [username, password] = Buffer.from(
    authorization.replace("Basic ", ""),
    "base64"
  )
    .toString()
    .split(":");

  if (!(username === "ben" && password === "my-favorite-password")) {
    return reject();
  }

  //res.send("hello"); // original test

  let data = JSON.parse(await fs.readFile(dataFile, "utf-8"));

  data = processVotesData(data);

  res.json(data);
});

app.listen(3000, () => console.log("server is running..."));
