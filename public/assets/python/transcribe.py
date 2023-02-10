import speech_recognition as sr

recognizer = sr.Recognizer()

def transcribe(file):
    audioFile = sr.AudioFile(file)
    with audioFile as source:
        audiodata = recognizer.record(source)
    transcript = recognizer.recognize_google(audiodata, language='es-AR', key=None)
    return transcript