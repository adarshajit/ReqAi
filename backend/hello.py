from flask import Flask, jsonify, request
from dotenv import load_dotenv
from jira import JIRA
from flask_cors import CORS
from .utils.extract_text_from_pdf import extract_text_from_pdf
from .utils.generate_diagram import generate_diagram
from .utils.serialize import serialize_attachment, serialize_comment
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
    return generate_diagram(mermaid_code)

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

@app.route("/ticket/update/<issue_key>", methods=["PUT"])
def update_ticket(issue_key):
    body = request.get_json()

    ticket_data = {
        "summary": body.get("summary"),
        "description": body.get("description"),
    }

    issue = jira.issue(issue_key)
    issue.update(fields=ticket_data)

    return f"Issue {issue_key} updated successfully"

@app.route("/ticket/delete/<issue_key>", methods=["DELETE"])
def delete_ticket(issue_key):
    issue = jira.issue(issue_key)
    issue.delete()

    return f"Issue {issue_key} deleted successfully"

@app.route('/upload', methods=['POST'])
def upload_file():
    pdf_file = request.files['pdf_file']
    pdf_content = pdf_file.read()
    pdf_text = extract_text_from_pdf(pdf_content)
    
    print(pdf_text)
    return {"message": "File successfully uploaded", "data": pdf_text }