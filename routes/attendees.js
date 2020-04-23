const express = require('express');
const router = express.Router();
const { v1: uuidv1 } = require('uuid');
const {Attendees} = require('../models/attendees');


router.get('/', async (req, res) => {
    const attendeesData = await Attendees.find();
    res.status(200).send(attendeesData);
});

// Saving the Attendees data.
router.post('/', async (req, res) => {

      var attendeesObj = new Attendees({
          attendeeId: uuidv1(),
          text: req.body.text,
          value: req.body.value,
          color: req.body.color
      });
      console.log('attendeesObj:', attendeesObj);

      // Save the EventSchedule with the newly generated "_id".
      attendeesObj.save(function (err, attendeeResponse) {
        if (err) return console.error(err);
        console.log(attendeeResponse.text + " saved to Attendees collection.");
        res.status(200).send(attendeeResponse);
      });
});

// Removing the existing Attendees data based on it's attendeeId.
router.delete('/', async (req, res) => {
      console.log(`Deleting record for attendeeId: ${req.query.attendeeId}`);
      Attendees.findOneAndRemove({attendeeId: req.query.attendeeId}, (err, attendeeResponse) => {
          if (err) return res.status(500).send(err);

          console.log("Successfully deleted Attendee is: ", attendeeResponse);
          res.status(200).send(attendeeResponse);
      });
});

module.exports = router;
