from __future__ import absolute_import
from flask import Blueprint, request, jsonify, current_app
from flask.views import MethodView
from flask.ext.login import login_user
from srv import login_mgr, db, model, app, login_serializer
from sqlalchemy.exc import IntegrityError
from datetime import datetime

import hashlib

api_user = Blueprint('user', __name__)


def hash_password(password):
    m = hashlib.sha1()
    m.update(password)
    m.update(app.secret_key)
    return m.hexdigest()


@login_mgr.token_loader
def load_token(token):
    """
    decrypt token and load User
    """
    current_app.logger.error('mission 4')
    max_age = app.config["REMEMBER_COOKIE_DURATION"].total_seconds()

    data = login_serializer.loads(token, max_age=max_age)
    u = model.User.query.filter_by(email=data[0])

    if u and data[1] == u.password:
        return u
    return None


class LoginView(MethodView):
    def post(self):
        """
        a login attempt
        """
        # try to create a new record in database
        data = request.get_json()

        u = model.User.query.filter_by(email=data['email']).first()
        if u:
            if u.password == hash_password(data['password']):
                login_user(u)
                return jsonify(id=u.id, error=""), 200
            else:
                return jsonify(error="Password Wrong"), 401

        return jsonify("User not exists"), 404
 

class UserView(MethodView):
    def get(self):
        """
        get a specific user resource
        """
        pass

    def post(self):
        """
        submit function to create new user.
        """
        status_code = 200
        err = ""
        # try to create a new record in database
        data = request.get_json()

        # convert date string to date object
        d = datetime.strptime(data['bday'], '%Y-%m-%d')
        # create User object
        # TODO: input validation
        u = model.User(
            data['email'],
            d.date(),
            hash_password(data['password']),
            datetime.now(),
            data['gender']
        )

        db.session.add(u)
        try:
            db.session.commit()
        except IntegrityError:
            # the email already used
            db.session.rollback()

            # error code for conflict
            status_code = 409
            err = "this email already exists"

        # TODO: auto perform login when new account created

        return jsonify(id=u.id, error=err), status_code


api_user.add_url_rule("/r/users/", view_func=UserView.as_view("res-user"), methods=["GET", "POST", ])
api_user.add_url_rule("/p/login/", view_func=LoginView.as_view("api-login"), methods=["POST", ])

