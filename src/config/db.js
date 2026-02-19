const mongoose = require("mongoose");

const DB_URL = process.env.DB_URL ||"mongodb://127.0.0.1:27017/bookstore";

async function start() {
  await mongoose.connect(""+DB_URL);
  console.log("Connected to MongoDB");
}

module.exports = { start };