const express = require('express');

const bookController = require('../controllers/bookController');
const {authorize, authenticate} = require('../services/authService');
const {validate} = require('../utils/apiError');
const handle = require('../utils/apiRouteHandler');
const upload = require('../utils/upload');
const {bookSchema, bookUpdateSchema} = require('../validators/bookSchema');

const router = express.Router();

router.route('/count').get(handle((req) => bookController.count(req)));

router
  .route('/')
  .get(handle((req) => bookController.getAll(req)))
  .post(
    authenticate,
    authorize('admin'),
    upload.single('bookCover'),
    validate(bookSchema),
    handle((req) => bookController.create(req), 201)
  );

router
  .route('/:id')
  .get(handle((req) => bookController.getById(req)))
  .patch(
    authenticate,
    authorize('admin'),
    upload.single('bookCover'),
    validate(bookUpdateSchema),
    handle((req) => bookController.update(req))
  )
  .delete(handle((req) => bookController.delete(req)));

router
  .route('/author/:authorId')
  .get(handle((req) => bookController.getBooksByAuthor(req)));

router
  .route('/category/:categoryId')
  .get(handle((req) => bookController.getBooksByCategory(req)));

module.exports = router;
