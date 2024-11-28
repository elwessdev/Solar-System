const express = require('express');
const router = express.Router();
const quiz = require("../Models/quiz");

const isAuth = require('../middleware/passport');

// Current user
router.get('/current', isAuth(), (req, res) => {
    res.send({user: req.user});
});

module.exports = router;