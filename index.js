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
import fs from "fs";
import i18n from "i18n-express";
import i18next from "i18next";
import Backend from "i18next-http-backend";
import i18nextMiddleware, { LanguageDetector } from "i18next-express-middleware";
import enTranslations from './locales/en.json' assert { type: "json" };
import esTranslations from './locales/es.json' assert { type: "json" };
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import express from "express";
const port = process.env.PORT || 3000;

const app = express();

// View engine setup
// Set EJS as the template engine
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

// app.use(session({
//   secret: 'secret',
//   saveUnitialized: true,
//   resave: true
// }));

// app.use(i18n({
//   translationsPath: path.join(__dirname, 'i18n'),
//   siteLangs: ["es", "en"],
//   textsVarName: 'translation'
// }));

// app.use('/', indexRoutes);

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public/assets'));

// Logger
// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
// setup the logger
//app.use(logger('dev'));
app.use(logger('combined', { stream: accessLogStream }));
export {accessLogStream};

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use('/api/nlp', nlpRouter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(favicon('./public/assets/favicon.ico'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
  });


app.use(express.static("public"));
// app.use(express.json({ limit: "1mb" }));

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


// // Initialize i18next and add middleware
// i18next
//   .use(Backend)
//   .init({
//     lang: 'es',
//     resources: {
//       en: {
//         translation: enTranslations,
//       },
//       es: {
//         translation: esTranslations,
//       },
//     },
//   });

// app.use(i18nextMiddleware.handle(i18next));

// // Middleware to inject the `t` function into res.locals
// app.use((req, res, next) => {
//   res.locals.t = req.t;
//   next();
// });


// app.get('/index', (req, res) => {
//   res.render('index');
// });


// // LANGUAGE SWITCHING
// app.get('/change-language/:lng', (req, res) => {
//   const { lng } = req.params;
//   req.i18n.changeLanguage(lng);
//   res.redirect('/');
// });


// app.listen(port, () => {
//   console.log(`App listening at http://localhost:${port}`);
// });

app.listen(3000, '0.0.0.0', function() {
  console.log('Listening to port:  ' + 3000);
});

//module.exports = app;
export {app};