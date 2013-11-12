from __future__ import absolute_import
from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config.from_object('srv.config')
db = SQLAlchemy(app)

import srv.model
