const express = require('express');
const router = express.Router();
const {EventSchedule} = require('../models/eventschedule');

// Getting the EventSchedule data based on the selected USER.
router.get('/', async (req, res) => {
    console.log("User: ", req.query.user);
    const eventscheduleData = await EventSchedule.find({user: req.query.user});
    console.log("Response: ", eventscheduleData);
    res.status(200).send(eventscheduleData);
});

// Saving/ Updating the EventSchedule data.
router.post('/', async (req, res) => {

    if(req.body.id) {

      // Update the EventSchedule with the existing "_id".
      EventSchedule.findOneAndUpdate(
        {_id: req.body.id},
        {$set:{
          title: req.body.title,
          description: req.body.description,
          start: req.body.start,
          end: req.body.end,
          user: req.body.user
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
          end: req.body.end,
          user: req.body.user
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

// Removing the existing EventSchedule data based on it's ID.
router.delete('/', async (req, res) => {
      var isEventScheduleDeleted = false;
      console.log(`Deleting one record for USER: ${req.query.user} and ID: ${req.query.eventScheduleId}`);
      EventSchedule.findByIdAndRemove(req.query.eventScheduleId, (err, eventschedule) => {
          if (err) return res.status(500).send(err);

          console.log("EventSchedule successfully deleted for ID: ", eventschedule);
          res.status(200).send(eventschedule);
      });
  });

module.exports = router;
