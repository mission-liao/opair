import os

basedir = os.path.abspath(os.path.dirname(__file__))
rootdir = os.path.dirname(basedir)
dbdir = os.path.join(rootdir, 'db')

SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(dbdir, 'app.db')

