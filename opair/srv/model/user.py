from __future__ import absolute_import
from srv import db
from flask.ext.login import UserMixin

class User(UserMixin, db.Model):
    """
    class User

    only kept static information here. For dynamic info, ex. last-login,
    we would kept them in other table
    """
    id = db.Column(db.Integer, primary_key=True)

    Email = db.Column(db.String(255), unique=True)
    Gender = db.Column(db.Enum('male', 'female', 'bi', 'none', name='gender_type'))
    bDate = db.Column(db.Date())

    joinTime = db.Column(db.DateTime())
    isActive = db.Column(db.Boolean(default=False))

    def __init__(self, email, gender, joinTime, bDate):
        self.email = email
        self.gender = gender
        self.bDate = bDate
        self.joinTime = joinTime
        self.isActive = False

    def __repr__(self):
        return '<User %s>' % self.email

