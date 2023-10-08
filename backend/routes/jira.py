from flask import jsonify, request, Blueprint
from jira import JIRA
from ..utils.serialize import serialize_attachment, serialize_comment, convert_property_value_to_string
import os
import jinja2
from ..constant import DESCRIPTION_TEMPLATE

jiraApi = Blueprint('jiraApi', __name__)

username = os.environ.get("EMAIL_ID")
password = os.environ.get("API_TOKEN")
jira_instance = os.environ.get("JIRA_INSTANCE")

jira = JIRA(jira_instance, basic_auth=(username, password))

@jiraApi.route("/tickets", methods = ["GET"])
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
    
@jiraApi.route("/ticket/<ticket_id>", methods = ["GET"])
def get_ticket(ticket_id):
    issue = jira.issue(str(ticket_id))

    hasAttachments = len(issue.fields.attachment) > 0
    hasComments = len(issue.fields.comment.comments) > 0
    attachments = [serialize_attachment(attachment) for attachment in issue.fields.attachment]
    comments = [serialize_comment(comment) for comment in issue.fields.comment.comments]

    ticket_details = {
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

    return jsonify(ticket_details)

@jiraApi.route("/ticket/create", methods = ["POST"])
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

@jiraApi.route("/ticket/create/bulk", methods = ["POST"])
def create_bulk_tickets():
    user_stories = request.get_json()

    issue_list = []

    for user_story in user_stories:
        summary = convert_property_value_to_string(user_story, "summary")
        description = convert_property_value_to_string(user_story, "description")
        acceptance_criteria = convert_property_value_to_string(user_story, "acceptanceCriteria")
        test_scenarios = convert_property_value_to_string(user_story, "testScenarios")
        impact_analysis = convert_property_value_to_string(user_story, "impactAnalysis")

        formatted_description = jinja2.Template(DESCRIPTION_TEMPLATE).render(description=description, acceptance_criteria=acceptance_criteria, test_scenarios=test_scenarios, impact_analysis=impact_analysis)

        ticket_data = {
            'project': 'SCRUM',
            'summary': summary,
            'description': formatted_description,
            'issuetype': {'name': 'Story'},
        }

        issue_list.append(ticket_data)

    jira.create_issues(field_list=issue_list)

    return "Tickets have been successfully created in bulk."

@jiraApi.route("/ticket/update/<issue_key>", methods=["PUT"])
def update_ticket(issue_key):
    body = request.get_json()

    ticket_data = {
        "summary": body.get("summary"),
        "description": body.get("description"),
    }

    issue = jira.issue(issue_key)
    issue.update(fields=ticket_data)

    return f"Issue {issue_key} updated successfully"

@jiraApi.route("/ticket/delete/<issue_key>", methods=["DELETE"])
def delete_ticket(issue_key):
    issue = jira.issue(issue_key)
    issue.delete()

    return f"Issue {issue_key} deleted successfully"