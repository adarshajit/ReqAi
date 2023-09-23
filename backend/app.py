from flask import Flask
from flask_cors import CORS

from .routes.jira import jiraApi
from .routes.bard import palmApi

app = Flask(__name__)
CORS(app)

app.register_blueprint(jiraApi)
app.register_blueprint(palmApi)

if __name__ == '__main__':
  app.run(debug=True)
