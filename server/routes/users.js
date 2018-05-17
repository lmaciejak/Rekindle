var express = require('express');
var router = express.Router();
var db = require('../db/queries');

const { loginRequired } = require("../auth/helpers");

/* GET users listing. */
router.get('/', db.getUser);
router.get('/getfriends/:userID', db.getUserFriends);
router.get('/searchbyuser/:search', db.searchByUser)

// router.get('/logout', db.logoutUser);

router.post('/register', db.createUser);
router.post('/login', db.loginUser);
router.post('/adduseravailability', loginRequired, db.addUserAvailability)

module.exports = router;
