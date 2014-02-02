from __future__ import absolute_import
from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy
from flask.ext.login import LoginManager
from itsdangerous import URLSafeTimedSerializer

app = Flask(__name__)
app.config.from_object('srv.config')

# session encrypt/decrypt
login_serializer = URLSafeTimedSerializer(app.secret_key)

# init logger
import logging
app.logger.addHandler(logging.StreamHandler())
app.logger.setLevel(logging.INFO)

# put everything that need to be initialized with flask-object here.
# -- flask-sqlalchemy
sql = SQLAlchemy(app)
# -- flask-login
login_mgr = LoginManager()
login_mgr.init_app(app)


from srv.bp import user
from srv.bp import miitup
# init blueprints
# -- user
app.register_blueprint(user.api_user)
app.register_blueprint(miitup.api_topic)

import srv.model

