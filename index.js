const express = require("express");
const app = express();
const port = 3001;

// import body parser
const bodyParser = require("body-parser");

// parser application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// import route posts
const postsRouter = require("./routes/posts");
app.use("/api/posts", postsRouter);

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
