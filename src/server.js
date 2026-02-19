require('dotenv').config();

const app = require('./app');
const db = require('./config/db');

app.start();
db.start();
