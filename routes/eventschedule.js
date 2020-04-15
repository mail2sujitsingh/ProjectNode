const express = require('express');
const router = express.Router();
const {EventSchedule} = require('../models/eventschedule');

//var attendeesObj = new Attendees({"text":"Ayush","value":1,"color":"#ef701d"},{"text":"Bhoodeo","value":2,"color":"#5fb1f7"},{"text":"Sujit","value":3,"color":"#5fb1f7"},{"text":"Danish","value":4,"color":"#35a964"},{"text":"Sunakshi","value":5,"color":"#35a964"},{"text":"Srashti","value":6,"color":"#35a964"},{"text":"Rajesh","value":7,"color":"#35a964"},{"text":"Arjun","value":8,"color":"#35a964"});


router.get('/', async (req, res) => {
    console.log("User: ", req.query.user);
    const eventscheduleData = await EventSchedule.find();
    res.status(200).send(eventscheduleData);
});

router.post('/', async (req, res) => {
    var eventscheduleObj = new EventSchedule({
        title: req.body.title,
        description: req.body.description,
        start: req.body.start,
        end: req.body.end
    });
    console.log('eventscheduleObj:', eventscheduleObj);

    // save model to database
    eventscheduleObj.save(function (err, eventschedule) {
      if (err) return console.error(err);
      console.log(eventschedule.title + " saved to Event Schedule collection.");
    });

    res.status(200).send("Success");

  });

module.exports = router;
