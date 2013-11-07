__all__ = ['app']

from flask import Flask

app = Flask(__name__);

@app.route('/')
def test():
    pass
