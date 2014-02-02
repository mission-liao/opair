import os
from datetime import timedelta

def get_sql_uri():
    # the path of dir
    basedir = os.path.abspath(os.path.dirname(__file__))
    rootdir = os.path.dirname(basedir)
    dbdir = os.path.join(rootdir, 'db')

    return 'sqlite:///' + os.path.join(dbdir, 'app.db')

# secret key
# TODO: patch it in product
SECRET_KEY = '?\xbf,\xb4\x8d\xa3"<\x9c\xb0@\x0f5\xab,w\xee\x8d$0\x13\x8b83'

# database
SQLALCHEMY_DATABASE_URI = get_sql_uri()

# cookie
REMEMBER_COOKIE_DURATION = timedelta(days=7)

# debug
DEBUG = True 
PROPAGATE_EXCEPTION = True
PRESERVE_CONTEXT_ON_EXCEPTION = True
