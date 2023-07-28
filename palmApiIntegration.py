from flask import Flask, jsonify, request

import requests

import google.ai.generativelanguage as glm
import google.generativeai as palm
import os

from google.generativeai.client import get_default_text_client
from google.generativeai.types import text_types
from google.generativeai.types import model_types
from google.generativeai.types import safety_types
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

# Sample data (usually, this should be stored in a database)


# Route to count characters in a string
@app.route('/api/createJira', methods=['POST'])
def createJira():
    palm.configure(api_key=os.environ["PALM_API_KEY"])
    # Replace with the actual URL provided by the "Palm" API documentation
    api_url = 'https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText'

    # Replace with your API key or any required authentication
    headers = {
        'Content-Type': 'application/json'
    }

    # Replace with your desired prompt for text generation
    prompt = "Once upon a time, there was a dragon. It lived in a"

    # Replace with any other required parameters according to the API documentation
    data = {
        'prompt': prompt,
        'max_tokens': 100,
        'temperature': 0.7,
    }

    try:
        # Send the POST request to the "Palm" API
        response = requests.post(api_url, headers=headers, json=data)

        # Handle the response
        if response.status_code == 200:
            # Successful request, process the generated text
            generated_text = response.json().get('generated_text')
            print("Generated Text:")
            print(generated_text)
        else:
            # Request failed, print the error message
            print("Request failed with status code: {response.status_code}")
            print(response.json())

    except requests.exceptions.RequestException as e:
        # Handle exceptions (e.g., connection error, timeout, etc.)
        print("Error occurred:", e)

if __name__ == '__main__':
    app.run(debug=True)

