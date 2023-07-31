from flask import Flask, jsonify, request

import requests

import google.ai.generativelanguage as glm
import google.generativeai as palm
import os
import json

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
  """Hit the PaLM API and return the generated text."""
  key = os.environ.get("PALM_API_KEY")
  url_formation = os.environ.get("URL")
  if request.is_json:
        data = request.get_json()
  if "requirements" in data:
            prompt = data["requirements"]
  prompt_dict = {"prompt": {"text": prompt}}
  if "fontStyle" in data:
            model_name = data["fontStyle"]
  prompt_dict = {"prompt": {"text": prompt}}
  headers = {
  "Content-Type": "application/json",
  "Accept": "application/json",
  }
 
 
  
  
  url = url_formation+"{}:generateText?key=".format(model_name)
  url += key
  
  response = requests.post(url, headers=headers, data=json.dumps(prompt_dict))

  if response.status_code == 200:
    json_output = response.json()["candidates"][0]["output"]
    
    return json_output
  else:
    return None


if __name__ == '__main__':
    app.run(debug=True)

