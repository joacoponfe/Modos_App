// const cookieParser = require('cookie-parser');
// const multer = require('multer');
// const logger = require('morgan');
// const bodyParser = require('body-parser');
// const favicon = require('serve-favicon');
//const path = require('path');
//const express = require('express');
//const nlpRouter = require('./public/assets/js/nlp');

import cookieParser from "cookie-parser";
import multer from "multer";
import logger from "morgan";
import bodyParser from "body-parser";
import favicon from "serve-favicon";
import path from "path";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    const fileNameArr = file.originalname.split('.');
    cb(null, `${Date.now()}.${fileNameArr[fileNameArr.length - 1]}`);
  },
});
const upload = multer({ storage });


import express from "express";
const port = process.env.PORT || 3000;

const app = express();
// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public/assets'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use('/api/nlp', nlpRouter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(favicon('./public/assets/favicon.ico'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
  });


app.use(express.static('uploads'));

app.post('/record', upload.single('audio'), (req, res) => res.json({ success: true }));

app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));

app.post("/api", (request, response) => {
  console.log("I got a request!");
  console.log(request.body);
  const data = request.body;
  response.json(data);
});

// 404 PAGE
app.use(function(req, res, next){
  res.status(404).sendFile(path.join(__dirname, 'public/404_page.html'));
});

// LOGGING WITH WINSTON
import winston from "winston";
 
const winstonLogger = winston.createLogger({
   transports: [
       new winston.transports.Console()
     ]
 });

export {winstonLogger};

// app.listen(port, () => {
//   console.log(`App listening at http://localhost:${port}`);
// });

app.listen(3000, '0.0.0.0', function() {
  console.log('Listening to port:  ' + 3000);
});

//module.exports = app;
export {app};

// // include and initialize the rollbar library with your access token
// var Rollbar = require('rollbar')
// var rollbar = new Rollbar({
//   accessToken: '26d5a5b7fc81436d8d00d2615067e63a',
//   captureUncaught: true,
//   captureUnhandledRejections: true,
// })

// // record a generic message and send it to Rollbar
// rollbar.log('Hello world!')