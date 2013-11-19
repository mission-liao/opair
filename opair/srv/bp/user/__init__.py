from __future__ import absolute_import
from flask import Blueprint, current_app
from flask.views import MethodView
from srv import login_mgr, model

api_user = Blueprint('user', __name__)

"""
@login_mgr.user_loader
def load_user(uid):
    return model.User.get(uid)
"""

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
        # try to create a new record in database
        current_app.logger.error("mission post user")
        return "", 200

api_user.add_url_rule("/p/user/", view_func=UserView.as_view("api-user"), methods=["GET", "POST", ])

