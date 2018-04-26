var pgp = require("pg-promise")({});
var connectionString = "postgres://localhost/rekindle";
var db = pgp(connectionString);

module.exports = db;