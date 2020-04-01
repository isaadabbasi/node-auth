const router = require('express').Router();

const userRepository = require('../../repositories/user.repository');
const Utils = require('../../utils');

router.post('/login', (request, response) => {
  userRepository
    .verify(request.body)
    .then((foodie = {}) => {
      const token = Utils.signJWT();
      response.setHeader('Authorization', token);
      response.status(200).send(foodie);
    })
    .catch((err) => void response.send(err.message));
});

module.exports = router;