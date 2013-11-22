from __future__ import absolute_import
from flask import Blueprint, request, jsonify
from flask.views import MethodView
from srv import login_mgr, db, model
from sqlalchemy.exc import IntegrityError

import datetime

api_user = Blueprint('user', __name__)

@login_mgr.user_loader
def load_user(uid):
    return model.User.get(uid)

class UserView(MethodView):
    def get(self):
        """
        login function
        """
        # TODO: valid what users input
        return "", 404

    def post(self):
        """
        submit function to create new user.
        """
        status_code = 200
        err = ""
        # try to create a new record in database
        data = request.get_json()
        # TODO: use my bdate temporary
        # TODO: gender
        u = model.User(
            data['email'],
            datetime.date(1980, 10, 4),
            data['passwd'],
            datetime.datetime.now()
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

api_user.add_url_rule("/p/users/", view_func=UserView.as_view("api-user"), methods=["GET", "POST", ])

