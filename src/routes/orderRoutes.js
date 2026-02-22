const express = require('express');

const orderController = require('../controllers/orderController');
const {validate} = require('../utils/apiError');
const handle = require('../utils/apiRouteHandler');
const orderSchema = require('../validators/orderSchema');

const router = express.Router();

router
  .route('/')
  .get(handle((req) => orderController.getAll(req)))
  .post(
    validate(orderSchema),
    handle((req) => orderController.create(req))
  );

router
  .route('/:id')
  .get(handle((req) => orderController.getById(req)))
  .patch(
    validate(orderSchema),
    handle((req) => orderController.update(req))
  )
  .delete(handle((req) => orderController.delete(req)));

module.exports = router;
