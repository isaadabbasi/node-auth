const router = require('express').Router();
const userRepository = require('../../repositories/user.repository');

router.post('/signup', (request, response) => {
  userRepository
    .save(request.body)
    .then(() => void response.sendStatus(201))
    .catch(err => void response.status(500).send(err.message));
});

module.exports = router;
