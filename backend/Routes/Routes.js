const express = require('express');
const router = express.Router();
const { signupUser } = require('../Controllers/Controller');

router.post('/SignUp', signupUser);

module.exports = router;
