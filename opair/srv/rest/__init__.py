from __future__ import absolute_import
from flask import Flask
from flask.ext.login import LoginManager
from itsdangerous import URLSafeTimedSerializer

# base config package
import opair.conf
import pkgutil

app = Flask(__name__)
app.config.from_object('opair.conf')
# trying to update config
for loader, name, ispkg in pkgutil.walk_packages(opair.conf.__path__, opair.conf.__name__ + '.'):
    app.config.from_object(name)

# init database


# session encrypt/decrypt
login_serializer = URLSafeTimedSerializer(app.secret_key)

# init logger
import logging
app.logger.addHandler(logging.StreamHandler())
app.logger.setLevel(logging.INFO)

# put everything that need to be initialized with flask-object here.
# -- flask-login
login_mgr = LoginManager()
login_mgr.init_app(app)

from opair.srv.rest.bp import user
# init blueprints
# -- user
app.register_blueprint(user.api_user)

