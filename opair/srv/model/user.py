from __future__ import absolute_import
from srv import sql, login_serializer
from flask.ext.login import UserMixin

class User(UserMixin, sql.Model):
    """
    class User

    only kept static information here. For dynamic info, ex. last-login,
    we would kept them in other table
    """
    id = sql.Column(sql.Integer, primary_key=True)

    email = sql.Column(sql.String(255), unique=True)
    password = sql.Column(sql.String(64))
    gender = sql.Column(sql.Enum('male', 'female', 'bi', 'none', name='gender_type'))
    bDate = sql.Column(sql.Date())
    location = sql.Column(sql.Integer, default=0)

    joinTime = sql.Column(sql.DateTime())

    def __init__(self, email, bDate, passwd, joinTime, gender='none', loc=0):
        self.email = email
        self.bDate = bDate
        self.password = passwd
        self.joinTime = joinTime
        self.gender = gender
        self.location = loc

    def __repr__(self):
        return '<User %s>' % self.email

    def get_auth_token(self):
        return login_serializer.dumps(self.email, self.password)

