from flask import request, Blueprint
import requests
import os
import json
import re
from ..utils.extract_text_from_pdf import extract_text_from_pdf
from ..utils.generate_diagram import generate_diagram
from jira import JIRA
from html2image import Html2Image

palmApi = Blueprint('palmApi', __name__)

PALM_API_KEY = os.environ.get("PALM_API_KEY")
PALM_API_BASE_URL = os.environ.get("PALM_API_BASE_URL")
PALM_API_URL = f'{PALM_API_BASE_URL}:generateText?key={PALM_API_KEY}'

username = os.environ.get("EMAIL_ID")
password = os.environ.get("API_TOKEN")
jira_instance = os.environ.get("JIRA_INSTANCE")

jira = JIRA(jira_instance, basic_auth=(username, password))

@palmApi.route('/api/createJira', methods=['POST'])
def createJira():
  pdf_file = request.files['pdf_file']
  pdf_content = pdf_file.read()
  pdf_text = extract_text_from_pdf(pdf_content)
  
  prompt_dict = {"prompt": {"text":"""Please analyze the provided business requirement document and generate user stories for each small feature. Break down the BRD to separate user stories which should have minimal effort. Create as many user stories as possible with acceptance criteria and test scenarios. For the acceptance criteria, add scenarios which account for the edge cases. Generate an output string in the following format with "@#$" before each new user story - 
  summary: ""; description: ""; test scenarios: ""; acceptance criteria: ""; impact analysis: "";
  """+ pdf_text}}

  headers =  {
  "Content-Type": "application/json",
  "Accept": "application/json",
  }

  response = requests.post(PALM_API_URL, headers=headers, data=json.dumps(prompt_dict))

  if response.status_code == 200:
    json_output = response.json()["candidates"][0]["output"]
    code = re.sub(r'^```\n', '', json_output)
    code = re.sub(r'\n```$', '', code)
    code = re.sub(r'```json', '', code)
    code = re.sub(r'^\s*json\s*{', '{', code)
    code = re.sub(r'`', '', code)

    return json.dumps(code)
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

  response = requests.post(PALM_API_URL, headers=headers, data=json.dumps(prompt_dict))
  return response.json()["candidates"][0]["output"]

@palmApi.route('/api/createDiagram', methods=['POST'])
def createDiagram():
  body = request.get_json()
  ticket_id = body.get("ticketId")
  diagramType = body.get("diagramType")

  issue = jira.issue(str(ticket_id))

  prompt_dict = {"prompt": {"text":"For the following user story, please output mermaid.js code to create a" + diagramType + "diagram. The code should follow the standard format expected by mermaid and should be as detailed as possible:"+ issue.fields.description}}

  headers =  {
  "Content-Type": "application/json",
  "Accept": "application/json",
  }
  
  response = requests.post(PALM_API_URL, headers=headers, data=json.dumps(prompt_dict))

  if response.status_code == 200:
    json_output = response.json()["candidates"][0]["output"]
    code = re.sub(r'^```\n', '', json_output)
    code = re.sub(r'\n```$', '', code)
    code = re.sub(r'```json','', code)
    code = re.sub(r'`','', code)
    code = re.sub(r'^mermaid\s*', '', code)
    
    attach_diagram(ticket_id, code)

    return code
  else:
    return None
  
def attach_diagram(issue_key, diagram_code):
    
    html_content = generate_diagram(diagram_code)
    # TO DO - Move to a constants file
    css = "body { background: white; margin: 3em} .mermaid { display: flex;justify-content: center;align-items: center; }" 
    hti = Html2Image()
    
    file_name = issue_key + '.jpg'

    # Convert HTML to an image using html2image
    hti.screenshot(html_str=html_content, css_str=css, save_as= file_name)
    
    with open(file_name, "rb") as image_file:
        jira.add_attachment(issue=issue_key, attachment= file_name)

    return {"message": "Diagram successfully uploaded", "data": issue_key }
