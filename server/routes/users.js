var express = require('express');
var router = express.Router();
var db = require('../db/queries');

const { loginRequired } = require("../auth/helpers");

/* GET users listing. */
router.get('/', db.getUser);
router.get('/getfriends/:userID', db.getUserFriends);
router.get('/searchbyuser/:search', db.searchByUser); 
router.get('/getalluseravailabilities', db.getAllUserAvailabilities)
router.get('/gethangoutinfo/:hangoutID', db.getHangoutInfo)
router.get('/getprofile/:userID', db.getProfile)
router.get('/checkfriend/:userID', db.checkFriend)
router.get('/getdashboardhangouts', db.getDashboardHangouts)
router.get('/logout', loginRequired, db.logoutUser);
router.get('/getinvitedfriends/:availabilityID', db.getInvitedFriends);



router.post('/register', db.createUser);
router.post('/login', db.loginUser);
router.post('/adduseravailability', loginRequired, db.addUserAvailability); 
router.post('/shareavailability/:availabilityID', loginRequired, db.shareAvailabilityWithFriend); 
router.post('/makehangout', db.makeHangout);
router.post('/confirmplan', db.confirmPlan);  
router.post('/sendFriendRequest', db.sendFriendRequest)
router.post('/unfriend/:userID', db.unfriend)
router.post('/deleteavailability/:availabilityID', db.deleteAvailability)

module.exports = router;
