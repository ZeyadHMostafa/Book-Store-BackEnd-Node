const express = require('express');

const userController = require('../controllers/userController');
const {validate} = require('../utils/apiError');
const handle = require('../utils/apiRouteHandler');
const userSchema = require('../validators/userSchema');

const router = express.Router();

router.route('/')
  .get(handle(() => userController.getAll()))
  .post(
    validate(userSchema),
    handle((req) => userController.create(req.body))
  );

router.route('/:id')
  .get(handle((req) => userController.getById(req.params.id)))
  .patch(
    validate(userSchema),
    handle((req) => userController.update(req.params.id, req.body))
  )
  .delete(
    handle((req) => userController.delete(req.params.id))
  );

module.exports = router;
