const express = require('express');
const natural = require('natural');
const aposToLexForm = require('apos-to-lex-form');
const SW = require('stopword');
const router = express.Router();

router.post('/s-analyzer', function(req, res, next) {
    console.log('ffff');
    const { review } = req.body;
    const lexedReview = aposToLexForm(review); // convert contractions to standard lexicon (I'm -> I am, you're -> you are)
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

    res.status(200).json({ analysis });
});
module.exports = router;
