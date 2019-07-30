/* eslint-disable no-console */
const express = require("express");
const app = express();
const port = 3000;

app.get("/status", (req, res) => res.send({ message: 'Hello World!' }));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
