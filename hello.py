from flask import Flask
from jira import JIRA
import getpass

app = Flask(__name__)

"""
USERNAME: 
adarsh.ajit@people10.com

PASSWORD/ API TOKEN: ATATT3xFfGF0qn4aCFi6g9dN087XY8LlOk0U3gviHZYuSqnl8CCpztRTiuxsPvXIk-xG9Fwb0WBbng8oJmqZdpBBHXPHH4yBtfqEb6GpUhvl5QvY8lUWvi2y5Qo2osQWqmIPGoQP84MJpPzmJymdxHLzQF27JeS7w3O2bR80x8_D8-Xq1p49tJg=746DD57E
"""

def connect_jira():
    print('Connecting to Jira...')
    # username will be your registered email id with your altassian account
    username = input('Jira username: ')
    # password will be your API token
    pwd = getpass.getpass('Jira password: ')
    try:
        jira = JIRA('https://people10-adarshajit.atlassian.net', basic_auth=(username, pwd))

        project_key = 'SCRUM'
        summary = 'TESTING TESTING, This is a test'  
        description = 'Issue Description' 
        issue_type = {'name': 'Bug'}  


        if jira.session():
            print("The user is authenticated successfully")

            # fetch issue details
            issue = jira.issue("SCRUM-1")

            print(f"Issue Key: {issue.key}")
            print(f"Summary: {issue.fields.summary}")
            print(f"Description: {issue.fields.description}")

            # Create an issue
            new_issue = jira.create_issue(project=project_key, summary=summary, description=description, issuetype=issue_type)

            print(f"New issue created with key: {new_issue.key}")

        else:
            print("Error in authenticating user!")
              
    except Exception as e:
        print('Error connecting to Jira!\n', e)

@app.route("/")
def hello_world():
    connect_jira()
    return "<h1>Hello, World!</h1>"