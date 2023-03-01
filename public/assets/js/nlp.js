const express = require('express');
const natural = require('natural');
const aposToLexForm = require('apos-to-lex-form');
const {removeStopwords, spa} = require('stopword');
const router = express.Router();

router.post('/s-analyzer', function(req, res, next) {
    const review = req.body;
    console.log('Original text: ', review['text']);
    const lexedReview = aposToLexForm(review['text']); // convert contractions to standard lexicon (I'm -> I am, you're -> you are)
    console.log('Lexed: ', lexedReview);
    const casedReview = lexedReview.toLowerCase(); // convert to lowercase
    console.log('Lowercase: ', casedReview);
    const alphaOnlyReview = casedReview.replace(/[^a-zA-Z\sáÁéÉíÍóÓúÚñÑ]+/g, '');  // remove numerical tokens and/or characters that are NOT a-z or A-Z)
    console.log('Alpha only: ', alphaOnlyReview);
    //const { WordTokenizer } = natural;
    const { AggressiveTokenizerEs } = natural;
    //const tokenizer = new WordTokenizer();
    const tokenizer = new AggressiveTokenizerEs();
    const tokenizedReview = tokenizer.tokenize(alphaOnlyReview);
    console.log('Tokenized: ', tokenizedReview);
    // FALTA SPELL CHECK EN ESPAÑOL
    //console.log(spa); //print stopwords in spanish
    const filteredReview = removeStopwords(tokenizedReview, spa);
    console.log('Filtered stopwords: ', filteredReview);
    // STEMMING? (si usamos el paquete SentimentAnalyzer, este lo hace automáticamente)
    const { SentimentAnalyzer, PorterStemmer } = natural;
    const analyzer = new SentimentAnalyzer('Spanish', PorterStemmer, 'afinn');
    const analysis = analyzer.getSentiment(filteredReview);
    console.log('Sentiment analysis result: ', analysis)

    res.status(200).json({ analysis });
});
module.exports = router;
