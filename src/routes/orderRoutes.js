const express = require('express');

const orderController = require('../controllers/orderController');
const {validate} = require('../utils/apiError');
const handle = require('../utils/apiRouteHandler');
const orderSchema = require('../validators/orderSchema');

const router = express.Router();

router.route('/')
  .get(handle(() => orderController.getAll()))
  .post(
    validate(orderSchema),
    handle((req) => orderController.create(req.body))
  );

router.route('/:id')
  .get(handle((req) => orderController.getById(req.params.id)))
  .patch(
    validate(orderSchema),
    handle((req) => orderController.update(req.params.id, req.body))
  )
  .delete(
    handle((req) => orderController.delete(req.params.id))
  );

module.exports = router;
