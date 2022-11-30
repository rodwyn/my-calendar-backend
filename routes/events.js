/*
  Event Routes 
  /api/events
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validateJWT } = require('../middlewares/validateJWT');
const { fieldValidator } = require('../middlewares/fieldValidators');
const { deleteEvent, createEvent, getEvents, updateEvent } = require('../controllers/events');
const { isDate } = require('../helpers/isDate');

const router = Router();

// apply validateJWT middleware to each route 
router.use(validateJWT);

router.get('/', getEvents);
router.post(
  '/',
  [
    check('title', 'Title field is required').not().isEmpty(),
    check('start', 'Start date field is required').custom( isDate ),
    check('end', 'End date field is required').custom( isDate ),
    fieldValidator
  ],
  createEvent
);
router.put(
  '/:id',
  [
    check('title', 'Title field is required').not().isEmpty(),
    check('start', 'Start date field is required').custom( isDate ),
    check('end', 'End date field is required').custom( isDate ),
    fieldValidator
  ],
  updateEvent
);
router.delete('/:id', deleteEvent);

module.exports = router;