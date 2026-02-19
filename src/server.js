require('dotenv').config();

const app = require('./app');

app.start();

const db = require('./config/db');

db.start();
