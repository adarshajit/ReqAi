from flask import Flask, jsonify, request
from jira import JIRA
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)

username = os.environ.get("EMAIL_ID")
password = os.environ.get("API_TOKEN")
jira_instance = os.environ.get("JIRA_INSTANCE")

jira = JIRA(jira_instance, basic_auth=(username, password))

@app.route("/")
def hello_world():
    return "<h1>Hello, World!</h1>"


@app.route("/tickets", methods = ["GET"])
def get_all_tickets():
    jql_query = 'project = SCRUM'
    issues = jira.search_issues(jql_query)

    tickets = []
    for issue in issues:
        ticket = {
            "key": issue.key,
            "summary": issue.fields.summary,
            "description": issue.fields.description
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