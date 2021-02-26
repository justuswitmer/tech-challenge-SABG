require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const zipcodeRouter = require('./routes/zipcodes.router.js');

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/** ---------- MIDDLEWARE ---------- **/
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/** ---------- ROUTES ---------- **/
app.use('/zipcodes', zipcodeRouter);

app.use(express.static('build'));

const port = 5000;

/** ---------- START SERVER ---------- **/
app.listen(port, () => {
  console.log('Listening on port: ', port);
});

module.exports = app;