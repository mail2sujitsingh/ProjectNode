const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const users = await Users.find();
    res.send(users);
  });