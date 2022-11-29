/*
  Event Routes 
  /api/events
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validateJWT } = require('../middlewares/validateJWT');
const { deleteEvent, createEvent, getEvents, updateEvent } = require('../controllers/events');

const router = Router();

// apply validateJWT middleware to each route 
router.use(validateJWT);

router.get('/', getEvents);
router.post('/',  createEvent);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);

module.exports = router;