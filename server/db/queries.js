const db = require("./index");
const authHelpers = require("../auth/helpers");
const passport = require("../auth/local");

function createUser(req, res, next) {
  console.log("createuser");
  if (req.body.password.length <= 6) {
    res.status(200).json({
      message: `password must be longer than 6 characters`
    });
    return;
  }
  const hash = authHelpers.createHash(req.body.password);
  console.log("hash", hash);
  console.log("req.body.username", req.body.username);
  db
    .none(
      "INSERT INTO users (username, password, email, full_name ) VALUES (${username}, ${password}, ${email}, ${full_name} )",
      {
        username: req.body.username,
        password: hash,
        email: req.body.email,
        full_name: req.body.full_name
      }
    )
    .then(() => {
      res.status(200).json({
        message: `created user: ${req.body.username}`
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).send("error creating user");
    });
}

function loginUser(req, res, next) {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.log(err);
      res.status(500).send("error while trying to log in");
    } else if (!user) {
      res.status(401).send("invalid username/password");
    } else if (user) {
      req.logIn(user, function(err) {
        if (err) {
          res.status(500).send("error");
        } else {
          res.status(200).send(user);
        }
      });
    }
  })(req, res, next);
}

function getUserFriends(req, res, next) {
  db
    .any(
      `SELECT * FROM friendships JOIN users ON(friend_befriended=user_id) WHERE friend_initial=$1 OR friend_befriended=$1`,
      [req.params.userID]
    )
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      res.json(error);
    });
}

function searchByUser(req, res, next) {
  db
    .any(
      `SELECT FULL_name, USER_id FROM users WHERE LOWER(username) LIKE LOWER('%${
        req.params.search
      }%') OR LOWER(full_name) LIKE LOWER('%${req.params.search}%')`
    )
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      res.json(error);
    });
}

function getUser(req, res, next) {
  db
    .any(
      `SELECT user_id, username, email, full_name, user_img
          FROM users
          WHERE user_id=$1`,
      [req.user.user_id]
    )
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      res.json(error);
    });
}

/* post */
function shareAvailabilityWithFriend(req, res, next) {
  return db
    .task(t => {
      const invitees = req.body.invitees;
      console.log('invitees', invitees)
      const queries = invitees.map(invitee => {
        return t.none(
          "INSERT INTO availabilityshares (availability_id, usertosharewith_id) " +
            "VALUES (${availability_id}, ${usertosharewith_id})",
          {
            availability_id: req.params.availabilityID,
            usertosharewith_id: invitee.value
          }
        );
      });
      return t.batch(queries);
    })
    .then(data => {
      res.json("success");
    })
    .catch(error => {
      res.json(error);
    });
}

function addUserAvailability(req, res, next) {
  return db
    .one(
      "INSERT INTO availabilities (availability_user_id, availability_starttime, availability_endtime, availability_title)" +
     " VALUES (${availability_user_id}, TIMESTAMP ${availability_starttime}, TIMESTAMP ${availability_endtime}, ${availability_title})" + 
     " RETURNING availability_id",
      {
        availability_user_id: req.user.user_id,
        availability_starttime: req.body.availability_starttime,
        availability_endtime: req.body.availability_endtime,
        availability_title: req.body.availability_title
      }
    )
    .then(data => {
      res.json({ availability_id: data.availability_id});
    })
    .catch(error => {
      res.json(error);
    });
}

module.exports = {
  createUser,
  loginUser,
  getUserFriends,
  searchByUser,
  getUser,
  addUserAvailability,
  shareAvailabilityWithFriend
};
