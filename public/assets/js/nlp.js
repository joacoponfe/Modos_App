const express = require('express');
const natural = require('natural');
const aposToLexForm = require('apos-to-lex-form');
const {removeStopwords, spa} = require('stopword');
const SpellChecker = require('simple-spellchecker');
const router = express.Router();
const translate = require('translation-google');
const dictionary = SpellChecker.getDictionarySync("es-ES");
const { AggressiveTokenizerEs } = natural;
const tokenizer = new AggressiveTokenizerEs();
const { SentimentAnalyzer, PorterStemmerEs } = natural;
const analyzer = new SentimentAnalyzer('Spanish', PorterStemmerEs, 'afinn');
const lorca = require('lorca-nlp');
const { once } = require('nodemon');

router.post('/s-analyzer', function(req, res, next) {
    const review = req.body;
    const originalText = review['text'];
    console.log('Original text: ', originalText);
    translate(originalText, {from: 'es', to: 'en'})
    .then(function(result) {
        console.log('Translated: ', result.text);
        //console.log('Translated from auto corrected: ', res.from.text.autoCorrected);
        console.log('Suggestions: ', result.from.text.value);
        const corrected = result.from.text.value.replace(/[\[\]]+/g,'');
        console.log('Corrected: ', corrected);
        //console.log('Did you mean: ', res.from.text.didYouMean);
        // If Google Translate provides spell-corrected text...
        if (corrected !== "") {
            var doc = lorca(corrected);
            var words = corrected.split(" "); // Use spell corrected text.
            var lowerCaseText = corrected.toLowerCase();
        }
        else {
            var doc = lorca(originalText);
            var words = originalText.split(" "); // Otherwise, use original text.
            var lowerCaseText = originalText.toLowerCase();
        }
        console.log('Words: ', words); // Get word list
        console.log('Lowercase: ', lowerCaseText);
        const alphaOnlyText = lowerCaseText.replace(/[^a-zA-Z\sáÁéÉíÍóÓúÚñÑ]+/g, '');  // Remove numerical tokens and/or characters that are NOT a-z or A-Z)
        console.log('Alpha only: ', alphaOnlyText);
        const tokenizedText = tokenizer.tokenize(alphaOnlyText);   // Tokenize text
        console.log('Tokenized: ', tokenizedText);
        const filteredText = removeStopwords(tokenizedText, spa);  // Remove stopwords (in spanish)
        console.log('Filtered stopwords: ', filteredText);

        // Save filtered Text to JSON file.
        

        analysis = analyzer.getSentiment(filteredText);            // Get sentiment analysis
        console.log('Sentiment analysis result: ', analysis);
        //analysis = -1;

        // Using Lorca
        // https://github.com/dmarman/lorca
        console.log('/// USING LORCA ///');
        const sentences = doc.sentences().get();
        console.log('Sentences: ', sentences);
        const words_lorca = doc.words().get();
        console.log('Words: ', words_lorca);
        const uniqueWords = doc.uniqueWords().get();
        console.log('Unique words: ', uniqueWords);
        const onceWords = doc.onceWords().get();
        console.log('Once words: ', onceWords);
        const wordFrequency = doc.concordance().get();
        console.log('Word Frequency: ', wordFrequency);
        // Sentiment
        const sentiment = doc.sentiment();
        console.log('Sentiment (Lorca): ', sentiment);
        const senticon = doc.sentiment('senticon');
        console.log('Sentiment (senticon): ', senticon);

        return analysis;
    })
    .then(() => res.status(200).json({ analysis }))
 
    //     var analysis = analyzer.getSentiment(filteredText);
    //     console.log('Sentiment analysis result: ', analysis);
    // }).catch(err => {
    //     console.error(err);
    // });

    //const words = review['text'].split(" ");
    //console.log('Words: ', words);
    //let spell_corrected = "";
    //words.forEach(spellCorrect);
    //function spellCorrect(value, index, array) {
    //    spell_check = dictionary.checkAndSuggest(value);
    //    misspelled = spell_check['misspelled'];
    //    suggestions = spell_check['suggestions'];
    //    console.log(spell_check['misspelled']);
    //    console.log(spell_check['suggestions']);
    //    correct_word = suggestions[0];
    //    if (misspelled == true) {
    //        spell_corrected += correct_word + " ";
    //    }
    //    else {
    //        spell_corrected += value + " ";
    //    }  
    //}
    //console.log('Spell corrected: ', spell_corrected);
    
    // // STEMMING? (si usamos el paquete SentimentAnalyzer, este lo hace automáticamente)
    //const { SentimentAnalyzer, PorterStemmer } = natural;
    //const analyzer = new SentimentAnalyzer('Spanish', PorterStemmer, 'afinn');
    //const analysis = analyzer.getSentiment(filteredReview);
    // console.log('Sentiment analysis result: ', analysis)
    // res.status(200).json({ analysis });
});

module.exports = router;
