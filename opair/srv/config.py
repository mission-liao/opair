import os
from datetime import timedelta

# the path of dir
basedir = os.path.abspath(os.path.dirname(__file__))
rootdir = os.path.dirname(basedir)
dbdir = os.path.join(rootdir, 'db')

# secret key
# TODO: patch it in product
SECRET_KEY = '?\xbf,\xb4\x8d\xa3"<\x9c\xb0@\x0f5\xab,w\xee\x8d$0\x13\x8b83'

# database
SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(dbdir, 'app.db')

# cookie
REMEMBER_COOKIE_DURATION = timedelta(days=7)

# debug
DEBUG = True 
PROPAGATE_EXCEPTION = True
PRESERVE_CONTEXT_ON_EXCEPTION = True
