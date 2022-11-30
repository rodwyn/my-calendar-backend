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

const updateEvent = async( req, res = response ) => {
  const eventId = req.params.id;

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      res.status(404).json({
        ok: false,
        msg: "Event does not exist."
      });
    }

    if (event.user.toString() !== req.uid) {
      res.status(401).json({
        ok: false,
        msg: "User does not have privileges to update this event."
      });
    }

    const newEvent = {
      ...req.body,
      user: uid
    };

    const updatedEvent = await Event.findByIdAndUpdate(eventId, newEvent, { new: true } )
    res.status(201).json({
      ok: true,
      event: updatedEvent
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error updating event."
    });
  }
};

const deleteEvent = ( req, res = response ) => {
  res.status(201).json({
    ok: true,
    msg: 'deleteEvent'
  });  
};

module.exports = { createEvent, deleteEvent, getEvents, updateEvent };
