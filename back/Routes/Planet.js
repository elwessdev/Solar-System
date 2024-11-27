const express = require('express');
const router = express.Router();
const planet = require("../Models/planet");

const isAuth = require('../middleware/passport');

// Current user
router.get('/current', isAuth(), (req, res) => {
    res.send({user: req.user});
});