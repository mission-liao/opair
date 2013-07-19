'''
Created on Jul 19, 2013

@author: Mission Liao
'''

import tornado.ioloop
import tornado.web
import opair.web._2_be_patched_ as _2_be_patched_

from opair.web.route import urls

appl = tornado.web.Application(
        urls,
        cookie_secret=_2_be_patched_._cookie_patched,
        facebook_api_key=_2_be_patched_._facebook_api_key_patched,
        facebook_secret=_2_be_patched_._facebook_secret_patched)

if __name__ == "__main__":
    appl.listen(8080)
    tornado.ioloop.IOLoop.instance().start()