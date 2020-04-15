const express = require('express');
const router = express.Router();
const {EventSchedule} = require('../models/eventschedule');

//var attendeesObj = new Attendees({"text":"Ayush","value":1,"color":"#ef701d"},{"text":"Bhoodeo","value":2,"color":"#5fb1f7"},{"text":"Sujit","value":3,"color":"#5fb1f7"},{"text":"Danish","value":4,"color":"#35a964"},{"text":"Sunakshi","value":5,"color":"#35a964"},{"text":"Srashti","value":6,"color":"#35a964"},{"text":"Rajesh","value":7,"color":"#35a964"},{"text":"Arjun","value":8,"color":"#35a964"});


router.get('/', async (req, res) => {
    console.log("User: ", req.query.user);
    const eventscheduleData = await EventSchedule.find();
    console.log("Response: ", eventscheduleData);
    res.status(200).send(eventscheduleData);
});

router.post('/', async (req, res) => {

    if(req.body.id) {

      // Update the EventSchedule with the existing "_id".
      EventSchedule.findOneAndUpdate(
        {_id: req.body.id},
        {$set:{
          title: req.body.title,
          description: req.body.description,
          start: req.body.start,
          end: req.body.end
        }},
        {new: true},
        function (err, eventschedule) {
          if (err) return console.error(err);
          console.log(eventschedule.title + " updated to Event Schedule collection.");
          res.status(200).send(eventschedule);
      });
    } else {
      var eventscheduleObj = new EventSchedule({
          //_id: req.body._id,
          title: req.body.title,
          description: req.body.description,
          start: req.body.start,
          end: req.body.end
      });
      console.log('eventscheduleObj:', eventscheduleObj);

      // Save the EventSchedule with the newly generated "_id".
      eventscheduleObj.save(function (err, eventschedule) {
        if (err) return console.error(err);
        console.log(eventschedule.title + " saved to Event Schedule collection.");
        res.status(200).send(eventschedule);
      });
    }

  });

module.exports = router;
