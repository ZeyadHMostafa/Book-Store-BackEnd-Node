const express = require('express');

const route = express.Router();

route.post('/', (req, res, next) => {});
route.get('/:id', (req, res, next) => {});
route.patch('/:id', (req, res, next) => {});
route.delete('/:id', (req, res, next) => {});

module.exports = route;
