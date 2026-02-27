const express = require('express');

const bookController = require('../controllers/bookController');
const {authorize, authenticate} = require('../services/authService');
const {validate} = require('../utils/apiError');
const handle = require('../utils/apiRouteHandler');
const upload = require('../utils/upload');
const {bookSchema, bookUpdateSchema} = require('../validators/bookSchema');

const router = express.Router();
router.route('/count').get(
  handle((req) => {
    // #swagger.tags = ['Books']
    // #swagger.summary = 'Get total book count'
    return bookController.count(req);
  })
);

router
  .route('/')
  .get(
    handle((req) => {
      // #swagger.tags = ['Books']
      // #swagger.summary = 'List all books'
      return bookController.getAll(req);
    })
  )
  .post(
    authenticate,
    authorize('admin'),
    upload.single('bookCover'),
    validate(bookSchema),
    handle((req) => {
      // #swagger.tags = ['Books']
      // #swagger.summary = 'Create new book'
      // #swagger.security = [{ "bearerAuth": [] }]
      /* #swagger.parameters['bookCover'] = {
            in: 'formData',
            type: 'file',
            required: true,
            description: 'Cover image for the book'
      } */
      /* #swagger.requestBody = {
            required: true,
            content: { "application/json": { schema: { $ref: "#/definitions/bookSchema" } } }
      } */
      return bookController.create(req);
    }, 201)
  );

router
  .route('/:id')
  .get(
    handle((req) => {
      // #swagger.tags = ['Books']
      // #swagger.summary = 'Get book by ID'
      return bookController.getById(req);
    })
  )
  .patch(
    authenticate,
    authorize('admin'),
    upload.single('bookCover'),
    validate(bookUpdateSchema),
    handle((req) => {
      // #swagger.tags = ['Books']
      // #swagger.summary = 'Update book details'
      // #swagger.security = [{ "bearerAuth": [] }]
      /* #swagger.requestBody = {
            required: true,
            content: { "application/json": { schema: { $ref: "#/definitions/bookUpdateSchema" } } }
      } */
      return bookController.update(req);
    })
  )
  .delete(
    authenticate,
    authorize('admin'),
    handle((req) => {
      // #swagger.tags = ['Books']
      // #swagger.summary = 'Delete a book'
      // #swagger.security = [{ "bearerAuth": [] }]
      return bookController.delete(req);
    })
  );

router.route('/author/:authorId').get(
  handle((req) => {
    // #swagger.tags = ['Books']
    // #swagger.summary = 'Get books by specific author'
    return bookController.getBooksByAuthor(req);
  })
);

router.route('/category/:categoryId').get(
  handle((req) => {
    // #swagger.tags = ['Books']
    // #swagger.summary = 'Get books by specific category'
    return bookController.getBooksByCategory(req);
  })
);

module.exports = router;
