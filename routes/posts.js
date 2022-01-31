const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();

// import database
const connection = require("../config/database");

/**
 * INDEX POSTS
 */
router.get("/", function (req, res) {
  // query
  connection.query(
    "SELECT * FROM posts ORDER BY id desc",
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

/**
 * STORE POST
 */
router.post(
  "/store",
  [
    // validation
    body("title").notEmpty(),
    body("content").notEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
      });

      // define form data
      let formData = {
        title: req.body.title,
        content: req.body.content,
      };

      // insert query
      connection.query(
        "INSERT INTO posts SET ?",
        formData,
        function (err, rows) {
          // throw error
          if (err) {
            return res.status(500).json({
              status: false,
              message: "Internal Server Error",
            });
          } else {
            return res.status(200).json({
              status: true,
              message: "Insert Data Successfully",
              data: rows[0],
            });
          }
        }
      );
    }
  }
);

module.exports = router;
