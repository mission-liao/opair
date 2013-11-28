from __future__ import absolute_import
from srv import db, login_serializer
from flask.ext.login import UserMixin

class User(UserMixin, db.Model):
    """
    class User

    only kept static information here. For dynamic info, ex. last-login,
    we would kept them in other table
    """
    id = db.Column(db.Integer, primary_key=True)

    email = db.Column(db.String(255), unique=True)
    password = db.Column(db.String(64))
    gender = db.Column(db.Enum('male', 'female', 'bi', 'none', name='gender_type'))
    bDate = db.Column(db.Date())

    joinTime = db.Column(db.DateTime())
    isActivate = db.Column(db.Boolean(), default=False)

    def __init__(self, email, bDate, passwd, joinTime, gender='none'):
        self.email = email
        self.bDate = bDate
        self.password = passwd
        self.joinTime = joinTime
        self.isActivate = False
        self.gender = gender

    def __repr__(self):
        return '<User %s>' % self.email

    def get_auth_token(self):
        return login_serializer.dumps(self.email, self.password)

