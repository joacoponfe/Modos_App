from pysentimiento import create_analyzer

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
    hate_speech_values = hate_speech_output.probas

    return sentiment_values, emotion_values, hate_speech_values