const express = require("express");
const router = express.Router;

// import database
const connection = require("../config/database");

// index posts
router.get("/", function (req, res) {
  // query
  connection.query(
    "SELECT * FROM posts ORDER BY id DESC",
    function (err, rows) {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Internal Server Error",
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "List Data Post",
          data: rows,
        });
      }
    }
  );
});

module.exports = router;
