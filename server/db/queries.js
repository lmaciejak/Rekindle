const db = require("./index");
const authHelpers = require("../auth/helpers");
const passport = require("../auth/local");

function createUser(req, res, next) {
  console.log('createuser')
  if(req.body.password.length <= 6) { 
    res.status(200).json({ 
      message: `password must be longer than 6 characters`
    })
    return
  }
  const hash = authHelpers.createHash(req.body.password);
  console.log('hash', hash)
  console.log('req.body.username',req.body.username)
  db
    .none(
      "INSERT INTO users (username, password_digest, full_name, email ) VALUES (${username}, ${password}, ${full_name}, ${email} )",
      { username: req.body.username, password: hash, full_name: req.body.full_name, email: req.body.email }
    )
    .then(() => {
      res.status(200).json({
        message: `created user: ${req.body.username}`
      })
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

module.exports = {
createUser,
loginUser, 

}