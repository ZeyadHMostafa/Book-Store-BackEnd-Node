const express = require('express');

const authorController = require('../controllers/authorController');
const {validate} = require('../utils/apiError');
const handle = require('../utils/apiRouteHandler');
const authorSchema = require('../validators/authorSchema');

const router = express.Router();

router.route('/')
  .get(handle(() => authorController.getAll()))
  .post(
    validate(authorSchema),
    handle((req) => authorController.create(req.body))
  );

router.route('/:id')
  .get(handle((req) => authorController.getById(req.params.id)))
  .patch(
    validate(authorSchema),
    handle((req) => authorController.update(req.params.id, req.body))
  )
  .delete(
    handle((req) => authorController.delete(req.params.id))
  );

module.exports = router;
