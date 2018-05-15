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

module.exports = {
  createUser,
  loginUser,
  getUserFriends
};
