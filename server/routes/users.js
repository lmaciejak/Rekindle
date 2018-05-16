var express = require('express');
var router = express.Router();
var db = require('../db/queries');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/getfriends/:userID', db.getUserFriends);
router.get('/searchbyuser/:search', db.searchByUser)

// router.get('/logout', db.logoutUser);

router.post('/register', db.createUser);
router.post('/login', db.loginUser);

module.exports = router;
