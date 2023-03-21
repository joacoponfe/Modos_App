const fs = require('fs');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const logger = require('morgan');
const natural = require('natural');
const aposToLexForm = require('apos-to-lex-form');
const SW = require('stopword');
const bodyParser = require('body-parser');
const Datastore = require("nedb")

const database = new Datastore('database.db');
database.loadDatabase();




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
const path = require('path');
const express = require('express');
const port = process.env.PORT || 3000;
const nlpRouter = require('./public/assets/js/nlp');

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
app.use('/api/nlp', nlpRouter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
  database.insert(data);
  });
// app.post("/text_input", (request, response) => {
//   console.log("I got a request!");
//   console.log(request.body);
//   const data = request.body;
//   database.insert({data:"data"});

//   response.json({
//     status: "success",
//     latitude: data.lat,
//     longitude: data.lon,

//   });
// });
//app.post('/text_input', function(req, res, next) {
//  const review  = req.body;
//  console.log(review['text']);
//  const lexedReview = aposToLexForm(review['text']); // convert contractions to standard lexicon (I'm -> I am, you're -> you are)
//  console.log(lexedReview);
//  const casedReview = lexedReview.toLowerCase(); // convert to lowercase
//  console.log(casedReview);
//  const alphaOnlyReview = casedReview.replace(/[^a-zA-Z\s]+/g, '');  // remove numerical tokens and/or characters that are NOT a-z or A-Z)
//  console.log(alphaOnlyReview);
//  const { WordTokenizer } = natural;
//  const tokenizer = new WordTokenizer();
//  const tokenizedReview = tokenizer.tokenize(alphaOnlyReview);
//  console.log(tokenizedReview);
  // FALTA SPELL CHECK EN ESPAÑOL
//  const filteredReview = SW.removeStopwords(tokenizedReview);
//  console.log(filteredReview);
  // STEMMING? (si usamos el paquete SentimentAnalyzer, este lo hace automáticamente)
//  const { SentimentAnalyzer, PorterStemmer } = natural;
//  const analyzer = new SentimentAnalyzer('Spanish', PorterStemmer, 'afinn');
//  const analysis = analyzer.getSentiment(filteredReview);
//  console.log(analysis)
  //const analysis = 1;
//  res.status(200).json({ analysis });
//});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

module.exports = app;