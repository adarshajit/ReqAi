from flask import request, Blueprint
import requests
import os
import json
import re
from .utils.extract_text_from_pdf import extract_text_from_pdf
from jira import JIRA

palmApi = Blueprint('palmApi', __name__)

key = os.environ.get("PALM_API_KEY")
url_formation = os.environ.get("URL")

@palmApi.route('/api/createJira', methods=['POST'])
def createJira():
  pdf_file = request.files['pdf_file']
  pdf_content = pdf_file.read()
  pdf_text = extract_text_from_pdf(pdf_content)
  prompt_dict = {"prompt": {"text":"""Break down the following Business Requirements Document into One single story in an array format which JIRA
rest APIs expect for story creation for given jira project key. format is as follows: {
                            summary: <A short heading for the ticket>,
                            description: <an elaborate explanation of this ticket>,
                            acceptanceCriteria: <acceptance criteria that needs to be satisfied>,
                            testCases: <test scenarios that needs to be tested>,
                            impactAnalysis: <an impact analysis for the feature>
} the output response should not start with 'json'
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


@palmApi.route('/api/createBrd', methods=['POST'])
def createBrd():
  body = request.get_json()
  problem_statement = body.get('problemStatement')

  prompt_dict = {"prompt": {"text": "Assume you are a Business Analyst. Create a Business Requirement Document(BRD) for the problem statement –" + problem_statement + "The BRD should be as detailed as possible and include descriptions of UI elements and flow, dependencies, assumptions, risks etc. This should be in markdown syntax"}}
  headers =  {
  "Content-Type": "application/json",
  "Accept": "application/json",
  }
  url = url_formation+":generateText?key="
  url += key
  response = requests.post(url, headers=headers, data=json.dumps(prompt_dict))
  return response.json()["candidates"][0]["output"]

@palmApi.route('/api/createDiagram/<ticket_id>', methods=['POST'])
def createDiagram():
  """Hit the PaLM API and return the diagram."""
  issue = jira.issue(str(ticket_id))
  prompt_dict = {"prompt": {"text":"""For the following user story, please output mermaid.js code to create a sequence diagram. The code should follow the standard format expected by mermaid and should be as detailed as possible:"""+ issue.fields.description}}

  headers =  {
  "Content-Type": "application/json",
  "Accept": "application/json",
  }
  

  url_formation = os.environ.get("URL")
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


