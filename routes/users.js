const express = require('express');
const router = express.Router();
const {Validate,User} = require('../models/users');

router.get('/', async (req, res) => {
    const users = await Users.find();
    res.send(users);
  });

  // router.get('/:id/:name', (request, response) => {
  //   response.send(`You are requesting for id: ${request.params.id} and name: ${request.params.name}.`);
  // });

  router.post('',async (req,res)=>{
      const {error} = Validate(req.body);
      if(error) return res.status(400).send(error.details[0].message);

      const user = new User({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        skills:req.body.skills
      });
      user = await user.save();

      res.send(user);
  });


  module.exports = router;