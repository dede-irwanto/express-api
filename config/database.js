let mysql = require("mysql");

let connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "user_express_api",
  password: "password_express_api",
  database: "db_express_api",
});

connection.connect(function (error) {
  if (!!error) {
    console.log(error);
  } else {
    console.log("Connection Successfully");
  }
});

module.exports = connection;
