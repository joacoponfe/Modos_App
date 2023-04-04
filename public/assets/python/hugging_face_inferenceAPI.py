import requests
import time

original_text = "Me imagine una sala donde una persona tocaba el piano, con oyentes sentados frente a el. Una sala oscura, con iluminacion solo en el artista. La sala era con paredes de madera y las butacas en posición tipo anfiteatro."
t0 = time.time()

### TRANSLATION
API_URL = "https://api-inference.huggingface.co/models/Helsinki-NLP/opus-mt-es-en"
headers = {"Authorization": "Bearer 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"}

def query(payload):
	response = requests.post(API_URL, headers=headers, json=payload)
	return response.json()

output = query({
	"inputs": original_text})

translation = output[0]["translation_text"]

### SUMARIZATION
API_URL = "https://api-inference.huggingface.co/models/pszemraj/long-t5-tglobal-base-16384-book-summary"
headers = {"Authorization": "Bearer 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"}

def query(payload):
	response = requests.post(API_URL, headers=headers, json=payload)
	return response.json()
	
output2 = query({
	"inputs": translation})


### Stable diffusion --> Este modelo en particular intenta resumir el texto como si fuese 
### un cuento. Se pueden buscar otros modelos.
API_URL = "https://api-inference.huggingface.co/models/CompVis/stable-diffusion-v1-4"
headers = {"Authorization": "Bearer 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"}

def query(payload):
	response = requests.post(API_URL, headers=headers, json=payload)
	return response.content
image_bytes = query({
	"inputs": output2[0]["summary_text"],
})
# You can access the image with PIL.Image for example
import io
from PIL import Image
image = Image.open(io.BytesIO(image_bytes))
image.save("test.jpeg")
t1 = time.time()

total = t1-t0
print(f"Original text: {original_text}")
print(output)
print(output2)
print(f"tiempo de request:{total}")