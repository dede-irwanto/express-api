const express = require("express");
const app = express();
const port = 3001;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// import route posts
const postsRouter = require("./routes/posts");
app.use("/api/posts", postsRouter);

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
