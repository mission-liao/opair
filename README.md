opair
=====

a web-app focuses on massive group-discussion

Dev environment prepare
=====
- virtualenv with python 2.7.x
- pip install flask
- sudo port install libevent
- CFLAGS="-I /opt/local/include -L /opt/local/lib" pip install gevent
  - [Refer to...](http://stackoverflow.com/questions/7630388/how-can-i-install-the-python-library-gevent-on-mac-os-x-lion)
- pip install sqlalchemy
- pip install tornado
