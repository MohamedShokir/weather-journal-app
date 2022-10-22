// Setup empty JS object to act as endpoint for all routes
const projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require("body-parser");
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));

//post route

const addFeeling = (req, res) => {
  projectData["date"] = req.body.date;
  projectData["contentData"] = req.body.contentData;
  projectData["temp"] = req.body.temp;
  res.send(projectData);
};
app.post("/addFeeling", addFeeling);

//get route
const getFeeling = (req, res) => {
  res.send(projectData);
};
app.get("/all", getFeeling);

// Setup Server
const port = 3000;

const listeningFunc = () => {
  console.log(`Running server on port:${port}`);
};

app.listen(port, listeningFunc);
