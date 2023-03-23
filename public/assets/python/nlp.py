from autocorrect import Speller
#from spellchecker import SpellChecker
from pysentimiento import create_analyzer
from spanlp.palabrota import Palabrota
from spanlp.domain.countries import Country
from spanlp.domain.strategies import JaccardIndex
from spanlp.domain.strategies import CosineSimilarity
import nltk
nltk.download('stopwords')
from nltk import corpus
import regex as re
import spacy
import es_core_news_md


# Create sentiment, emotion and hate speech analyzers in Spanish
sentiment_analyzer = create_analyzer(task="sentiment", lang="es")
emotion_analyzer = create_analyzer(task="emotion", lang="es")
hate_speech_analyzer = create_analyzer(task="hate_speech", lang="es")

def analyze_text(text):
    sentiment_output = sentiment_analyzer.predict(text)
    emotion_output = emotion_analyzer.predict(text)
    hate_speech_output = hate_speech_analyzer.predict(text)

    sentiment_values = sentiment_output.probas
    emotion_values = emotion_output.probas
    hate_speech_values = hate_speech_output

    return sentiment_values, emotion_values, hate_speech_values

def remove_stopwords(words, stopwords):
        words_clean = []
        for w in words:
          if not w in stopwords: # si no es stopword, la agregamos a la lista
            words_clean.append(w.lower())
        return words_clean

textRaw = 'Una niña va a su primer día de jardín de infantes. El día es cálido y soleado. Todo es brillante y lleno de entusiasmo. El ambiente es totalmente amigable y habrá posibilidad de relacionarse afectuosamente con compañeros. La emoción del primer día es muy positiva.'

# SPELLING CORRECTION
spell = Speller('es') # Está bueno, pero le faltan las tildes
#spell = SpellChecker(language='es')
textSpellCheck = spell(textRaw)

# DEEPL TRANSLATE (FALTA)

# TEXT SUMMARIZATION (FALTA, NLTK?)

# SENTIMENT, EMOTION AND HATE SPEECH ANALYSIS
sentiment_values, emotion_values, hate_speech_values = analyze_text(textSpellCheck)
isHateful = hate_speech_values.output

# SWEAR WORD REMOVAL
palabrota = Palabrota(censor_char="*", countries=[Country.ARGENTINA]) # Está bueno, pero no saca puteadas con números (mi3rda, put0)
textCensored = palabrota.censor(textSpellCheck) # Swear words are censored with * 
textClean = textCensored.replace("*", "")

# LEMMATIZATION
spacy_nlp = es_core_news_md.load()
document = spacy_nlp(textClean)
lemmatizedText = ''
for token in document:
    # Get the lemma for each token
    lemma = token.lemma_.lower()
    lemmatizedText += lemma + ' '

# STOPWORD REMOVAL AND CONVERTING TO LOWERCASE
wordList =  re.sub('[^A-zÀ-ÿ ]+', '', lemmatizedText).split(" ")
stopwords_es = corpus.stopwords.words('spanish')
contentWords = remove_stopwords(wordList, stopwords_es)

# REMOVE EMPTY STRINGS FROM LIST
finalWords = contentWords

while("" in finalWords):
    finalWords.remove("")


print(f'Original text: {textRaw}')
print(f'Spell corrected: {textSpellCheck}')
print(f'Sentiment analysis: {sentiment_values}')
print(f'Emotion Values: {emotion_values}')
print(f'Hate Speech: {hate_speech_values}')
print(f'Censored text: {textCensored}')
print(f'Clean text: {textClean}')
print(f'Lemmatized: {lemmatizedText}')
print(f'Content words: {contentWords}')
print(f'Final words: {finalWords}')

lines = [f'Original text: {textRaw}', f'Spell corrected: {textSpellCheck}', 
         f'Sentiment analysis: {sentiment_values}', f'Emotion Values: {emotion_values}',
           f'Hate Speech: {hate_speech_values}', f'Censored text: {textCensored}', 
           f'Clean text: {textClean}', f'Lemmatized: {lemmatizedText}',
             f'Content words: {contentWords}', f'Final words: {finalWords}']
with open('output.txt', 'w') as f:
    for line in lines:
        f.write(line)
        f.write('\n')