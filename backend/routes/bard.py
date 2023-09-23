from flask import request, Blueprint
import requests
import os
import json
import re
from ..utils.extract_text_from_pdf import extract_text_from_pdf

palmApi = Blueprint('palmApi', __name__)

@palmApi.route('/api/createJira', methods=['POST'])
def createJira():
  """Hit the PaLM API and return the generated text."""
  key = os.environ.get("PALM_API_KEY")
  url_formation = os.environ.get("URL")
  pdf_file = request.files['pdf_file']
  pdf_content = pdf_file.read()
  pdf_text = extract_text_from_pdf(pdf_content)
  prompt_dict = {"prompt": {"text":"""Break down the following Business Requirements Document into user three stories in JSON format which JIRA
rest APIs expect for story creation for given jira project key. Create an array of jsons with all the user stories. Each json should include the following sections: 1. Summary: this should be a short heading for the
story(this summary should be in plain english and SHOULD NOT be same as the user story or in user
story format) 2. Description: This should include three sections, namely user story, Acceptance Criterea
and Test Cases 3. Impact Analysis: This should include an impact analysis for the user story 4. KEY: This
should be XXXX
Business Requirement Document:"""+ pdf_text}}
  headers =  {
  "Content-Type": "application/json",
  "Accept": "application/json",
  }
  url = url_formation+":generateText?key="
  url += key
  response = requests.post(url, headers=headers, data=json.dumps(prompt_dict))

  if response.status_code == 200:
    json_output = response.json()["candidates"][0]["output"]
    code = re.sub(r'^```\n', '', json_output)
    code = re.sub(r'\n```$', '', json_output)
    code = re.sub(r'```json','', json_output)
    code = re.sub(r'`','',json_output)
    
    return code
  else:
    return None
  
if __name__ == '__main__':
    app.run(debug=True)
