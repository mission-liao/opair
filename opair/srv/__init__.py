from __future__ import absolute_import
from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy
from flask.ext.login import LoginManager
from flask.ext.pymongo import PyMongo
from itsdangerous import URLSafeTimedSerializer

# base config package
import srv.config

import pkgutil

app = Flask(__name__)
app.config.from_object('srv.config')
# trying to update config
for loader, name, ispkg in pkgutil.walk_packages(srv.config.__path__, srv.config.__name__ + '.'):
    app.config.from_object(name)

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
# -- flask-pymongo
mongo = PyMongo(app)

from srv.bp import user
from srv.bp import miitup
# init blueprints
# -- user
app.register_blueprint(user.api_user)
# -- miitup
app.register_blueprint(miitup.api_topic)
app.register_blueprint(miitup.api_tag)

import srv.model

