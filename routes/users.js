const express = require('express');
const router = express.Router();
const {Validate,User} = require('../models/users');

router.get('/', async (req, res) => {
    const users = await Users.find();
    res.send(users);
  });


  // creating new user.
  router.post('',async (req,res)=>{
      const {error} = Validate(req.body);
      if(error) return res.status(400).send(error.details[0].message);

      const user = new User({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        skills:req.body.skills
      });
      user = await user.save();

      res.status(200).send(user);
  });

  router.put('/:id', async (req, res) => {
    const { error } = Validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    const user = await User.findByIdAndUpdate(req.params.id,
      { 
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        skills:req.body.skills
      }, { new: true });
  
    if (!user) return res.status(404).send('The User with the given ID was not found.');
    
    res.send(user);
  });

  module.exports = router;