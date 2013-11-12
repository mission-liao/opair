from __future__ import absolute_import
from srv import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    email = db.Column(db.String(255), unique=True)
    gender = db.Enum('male', 'female', 'bi', 'none', name='gender_type')
    join_time = db.DateTime()
    b_date = db.Date()

    def __init__(self, email, gender, join_time, b_date):
        self.email = email
        self.gender = gender
        self.join_time = join_time
        self.b_date = b_date

