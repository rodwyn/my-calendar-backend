const {response} = require('express');
const Event = require('../models/Event');

const getEvents = async( req, res = response ) => {
  const events = await Event.find().populate('user', 'name');

  res.status(201).json({
    ok: true,
    events
  });  
};

const createEvent = async( req, res = response ) => {
  const event = new Event(req.body);

  try {
    event.user = req.uid;
    const savedEvent = await event.save();

    res.json({
      ok: true,
      event: savedEvent
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error creating event."
    });
  }
};

const updateEvent = ( req, res = response ) => {
  res.status(201).json({
    ok: true,
    msg: 'updateEvent'
  });  
};

const deleteEvent = ( req, res = response ) => {
  res.status(201).json({
    ok: true,
    msg: 'deleteEvent'
  });  
};

module.exports = { createEvent, deleteEvent, getEvents, updateEvent };
