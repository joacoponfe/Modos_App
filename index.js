const fs = require('fs');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const logger = require('morgan');
const natural = require('natural');
const aposToLexForm = require('apos-to-lex-form');
const SW = require('stopword');
const bodyParser = require('body-parser');

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
app.post('/text_input', function(req, res, next) {
  const review  = req.body;
  console.log(review['text']);
  const lexedReview = aposToLexForm(review['text']); // convert contractions to standard lexicon (I'm -> I am, you're -> you are)
  const casedReview = lexedReview.toLowerCase(); // convert to lowercase
  const alphaOnlyReview = casedReview.replace(/[^a-zA-Z\s]+/g, '');  // remove numerical tokens and/or characters that are NOT a-z or A-Z)
  const { WordTokenizer } = natural;
  const tokenizer = new WordTokenizer();
  const tokenizedReview = tokenizer.tokenize(alphaOnlyReview);
  // FALTA SPELL CHECK EN ESPAÑOL
  const filteredReview = SW.removeStopwords(tokenizedReview);
  // STEMMING? (si usamos el paquete SentimentAnalyzer, este lo hace automáticamente)

  const { SentimentAnalyzer, PorterStemmer } = natural;
  const analyzer = new SentimentAnalyzer('Spanish', PorterStemmer, 'afinn');
  const analysis = analyzer.getSentiment(filteredReview);
  //const analysis = 1;
  res.status(200).json({ analysis });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

module.exports = app;