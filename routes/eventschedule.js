const express = require('express');
const router = express.Router();
const { v1: uuidv1 } = require('uuid');
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
    console.log("req.body.eventScheduleId: ", req.body.eventScheduleId);
    if(req.body.eventScheduleId) {

      // Update the EventSchedule with the existing "eventScheduleId".
      EventSchedule.findOneAndUpdate(
        {eventScheduleId: req.body.eventScheduleId},
        {$set:{
          title: req.body.title,
          description: req.body.description,
          start: req.body.start,
          end: req.body.end,
          user: req.body.user,
          attendees: req.body.attendees
        }},
        {new: true},
        function (err, eventschedule) {
          if (err) return console.error(err);
          console.log(eventschedule.title + " updated to Event Schedule collection.");
          res.status(200).send(eventschedule);
      });
    } else {
      var eventscheduleObj = new EventSchedule({
          eventScheduleId: uuidv1(),
          title: req.body.title,
          description: req.body.description,
          start: req.body.start,
          end: req.body.end,
          user: req.body.user,
          attendees: req.body.attendees
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

// Removing the existing EventSchedule data based on it's eventScheduleId.
router.delete('/', async (req, res) => {
      console.log(`Deleting one record for USER: ${req.query.user} and ID: ${req.query.eventScheduleId}`);
      EventSchedule.findOneAndRemove({eventScheduleId: req.query.eventScheduleId}, (err, eventschedule) => {
          if (err) return res.status(500).send(err);

          console.log("Successfully deleted EventSchedule is: ", eventschedule);
          res.status(200).send(eventschedule);
      });
  });

module.exports = router;
