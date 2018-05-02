var express = require('express');
var router = express.Router();
var db = require('../db/queries');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/logout', loginRequired, db.logoutUser);


router.post('/register', db.registerUser);
router.post('/login', db.loginUser);

module.exports = router;
