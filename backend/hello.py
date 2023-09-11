from flask import Flask, jsonify, request
from jira import JIRA
from dotenv import load_dotenv
from flask_cors import CORS
import PyPDF2
from io import BytesIO
import os

load_dotenv()

app = Flask(__name__)

CORS(app)

username = os.environ.get("EMAIL_ID")
password = os.environ.get("API_TOKEN")
jira_instance = os.environ.get("JIRA_INSTANCE")

jira = JIRA(jira_instance, basic_auth=(username, password))

@app.route("/")
def hello_world():
    mermaid_code = """
sequenceDiagram
    Alice->>John: Hello John, how are you?
    John-->>Alice: Great!
    Alice-)John: See you later!
"""
    return mermaid_chart(mermaid_code)

def serialize_comment(comment):
    return {
        "author": comment.author.displayName,
        "created": comment.created,
        "body": comment.body
    }

def serialize_attachment(attachment):
    return {
        "filename": attachment.filename,
        "url": attachment.content,
    }


@app.route("/tickets", methods = ["GET"])
def get_all_tickets():
    jql_query = 'project = SCRUM'
    issues = jira.search_issues(jql_query)

    tickets = []

    for issue in issues:
        hasAttachments = len(issue.fields.attachment) > 0
        hasComments = len(issue.fields.comment.comments) > 0
        attachments = [serialize_attachment(attachment) for attachment in issue.fields.attachment]
        comments = [serialize_comment(comment) for comment in issue.fields.comment.comments]
        
        ticket = {
            "key": issue.key,
            "summary": issue.fields.summary,
            "description": issue.fields.description,
            "issueType": issue.fields.issuetype.name,
            "labels": issue.fields.labels,
            "attachments": attachments,
            "hasAttachments": hasAttachments,
            "comments": comments,
            "hasComments": hasComments,
            "created": issue.fields.created,
        }

        tickets.append(ticket)
    
    return jsonify(tickets)
    
@app.route("/ticket/<ticket_id>", methods = ["GET"])
def get_ticket(ticket_id):
    issue = jira.issue(str(ticket_id))

    ticket_details = {
        "key": issue.key,
        "summary": issue.fields.summary,
        "description": issue.fields.description
    }

    return jsonify(ticket_details)

@app.route("/ticket/create", methods = ["POST"])
def create_ticket():

    body = request.get_json()

    ticket_data = {
        "project": body.get("project"),
        "summary": body.get("summary"),
        "description": body.get("description"),
        "issuetype": {"name": body.get("issuetype")}
    }

    new_issue = jira.create_issue(fields=ticket_data)

    return f"New issue created with key: {new_issue.key}"

@app.route('/upload', methods=['POST'])
def upload_file():
    pdf_file = request.files['pdf_file']
    pdf_content = pdf_file.read()
    pdf_text = extract_text_from_pdf(pdf_content)
    
    print(pdf_text)
    return {"message": "File successfully uploaded", "data": pdf_text }

def extract_text_from_pdf(pdf_content):
    pdf_reader = PyPDF2.PdfReader(BytesIO(pdf_content))
    pdf_text = ''
    
    for page_num in range(len(pdf_reader.pages)):
        page = pdf_reader.pages[page_num]
        pdf_text += page.extract_text()
    
    return pdf_text

def mermaid_chart(mindmap_code):
    html_code = f"""
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css">
    <div class="mermaid">{mindmap_code}</div>
    <script src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"></script>
    <script>mermaid.initialize({{startOnLoad:true}});</script>
    """
    return html_code
