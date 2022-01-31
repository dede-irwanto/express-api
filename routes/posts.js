const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();

// import database
const connection = require("../config/database");

/**
 * INDEX POSTS
 */
router.get("/", (req, res) => {
  // query
  connection.query("SELECT * FROM posts ORDER BY id desc", (err, rows) => {
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
  });
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
    }

    // define form data
    let formData = {
      title: req.body.title,
      content: req.body.content,
    };

    // insert query
    connection.query("INSERT INTO posts SET ?", formData, (err, rows) => {
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
    });
  }
);

/**
 * SHOW POST
 */
router.get("/:id", (req, res) => {
  let id = req.params.id;
  connection.query(`SELECT * FROM posts WHERE id=${id}`, (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "Internal Server Error!",
      });
    }

    if (rows.length <= 0) {
      // if posts not found
      return res.status(404).json({
        status: false,
        message: "Data Post Not Found!",
      });
    } else {
      // posts found
      return res.status(200).json({
        status: true,
        message: "Detail Data Post",
        data: rows[0],
      });
    }
  });
});

/**
 * UPDATE POST
 */
router.patch(
  "/update/:id",
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
    }

    // id post
    let id = req.params.id;

    // data post
    let formData = {
      title: req.body.title,
      content: req.body.content,
    };

    // update query
    connection.query(
      `UPDATE posts SET ? WHERE id = ${id}`,
      formData,
      (err, rows) => {
        if (err) {
          // if error
          return res.status(500).json({
            status: false,
            message: "Internal Server Error",
          });
        } else {
          // if not error
          return res.status(200).json({
            status: true,
            message: "Update Data Successfully",
          });
        }
      }
    );
  }
);

/**
 * DELETE POST
 */
router.delete("/delete/:id", (req, res) => {
  let id = req.params.id;

  connection.query(`DELETE FROM posts WHERE id = ${id}`, (err, rows) => {
    if (err) {
      // if error
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
      });
    } else {
      // not error
      return res.status(200).json({
        status: true,
        message: "Delete Data Successfully",
      });
    }
  });
});

module.exports = router;
