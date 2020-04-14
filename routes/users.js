const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const users = await Users.find();
    res.send(users);
  });

  router.get('/:id/:name', (request, response) => {
    response.send(`You are requesting for id: ${request.params.id} and name: ${request.params.name}.`);
  });

  module.exports = router;