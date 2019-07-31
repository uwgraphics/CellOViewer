/* eslint-disable no-console */
const express = require("express");
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
  
const app = express();
app.use(morgan('combine'))
app.use(bodyParser.json())
app.use(cors())

const port = 3000;
app.set('port', process.env.PORT || port)
app.get("/", (req, res) => res.send('Hello World!'));

app.listen(process.env.PORT || 3000, () => {
  console.log(`Example app listening on port ${port}!`);
});
