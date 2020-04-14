const express = require('express');
const router = express.Router();
const {Attendees} = require('../models/attendees');

var attendeesObj = new Attendees({"text":"Ayush","value":1,"color":"#ef701d"},{"text":"Bhoodeo","value":2,"color":"#5fb1f7"},{"text":"Sujit","value":3,"color":"#5fb1f7"},{"text":"Danish","value":4,"color":"#35a964"},{"text":"Sunakshi","value":5,"color":"#35a964"},{"text":"Srashti","value":6,"color":"#35a964"},{"text":"Rajesh","value":7,"color":"#35a964"},{"text":"Arjun","value":8,"color":"#35a964"});


router.get('/', async (req, res) => {
    const attendees = await Attendees.find();
    res.status(200).send(attendees);
  });

  module.exports = router;