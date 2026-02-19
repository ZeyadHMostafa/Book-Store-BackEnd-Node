require("dotenv").config();

const app = require("./app"); //starts automaitcally
app;

const db = require("./config/db");
db.start;
