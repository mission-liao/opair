'''
Created on Jul 19, 2013

@author: Mission Liao
'''

# TODO: before process each request, remember to check
# if current state is value for processing. Design/Find
# a best state-machine for handling these requests

# TODO: how to design for balance between web-app and REST


from tornado.auth import FacebookGraphMixin
from tornado.web import RequestHandler

# TODO: fix these 2 imports, it's not beautiful
# to import decorator in this way.
from tornado.web import asynchronous
from tornado.gen import coroutine

class BaseHandler(RequestHandler):
    def get_current_user(self):
        return self.get_secure_cookie("usr")


class MainHandler(BaseHandler):
    def get(self):
        # check if login already
        if not self.current_user:
            # TODO: replace magic-string with name,
            # and tornado should offer some utility for this already
            self.redirect("/login/")
            return

        # TODO: dev code, remove it before production
        self.write("".join(["Hi, ", self.get_secure_cookie("usr").decode("utf-8")]))
        self.write(
                   "<html>"
                   "    <body>"
                   "        <form method=\"post\">"
                   "        LEAVE!! <input type=\"submit\" value=\"Logout\">"
                   "        </form>"
                   "    </body>"
                   "</html>"
                   )
 
        # TODO: show default dashboard
        
    def post(self):
        # TODO: this post is just a quick way to clear cookie
        # remove this method before production
        self.clear_cookie("usr")
        self.redirect("/login/")
        
        # TODO: it seems clearing cookie and logout should be
        # bundled in one function.
        

class RegisterHandler(BaseHandler):
    def get(self):
        # TODO: test code to add buttons for login dev
        # remove them before production.
        self.write(
                   "<html>"
                   "    <body>"
                   "        <form method=\"post\">"
                   "        User-name: <input type=\"text\" name=\"new_username\"><br>"
                   "        Password: <input type=\"password\" name=\"new_pwd\">"
                   "        GO!! <input type=\"submit\" value=\"Register\">"
                   "        </form>"
                   "        <a href=\"/login/facebook/\">login with facebook "
                   "    </body>"
                   "</html>"
                   )
    
    def post(self):
        pass

class LoginHandler(BaseHandler):
    def get(self):
        # TODO: test code to add buttons for login dev
        # remove them before production.
        self.write(
                   "<html>"
                   "    <body>"
                   "        <form method=\"post\">"
                   "        User-name: <input type=\"text\" name=\"username\"><br>"
                   "        Password: <input type=\"password\" name=\"pwd\">"
                   "        BACK!! <input type=\"submit\" value=\"Login\"><br>"
                   "        </form>"
                   "        <a href=\"/login/facebook/\">login with facebook "
                   "    </body>"
                   "</html>"
                   )

        # TODO: in this page, add a href to /register

    def post(self):
        # TODO: it seems tornado would map both url-query-param and post
        # data to self.arguments, try to separate it or just find a way
        # to stop accepting url containing query-string
        
        # TODO: right now we accept all possible strings as user-name and
        # password, this is dev behavior, should be refined before production.

        self.set_secure_cookie("usr", self.get_argument("username"))
        self.redirect("/")


class LoginWithFB_Handler(BaseHandler, FacebookGraphMixin):
    @asynchronous
    @coroutine
    def get(self):
        url_ = (self.request.protocol + "://" + self.request.host + "/login/facebook/")
        
        if self.get_argument("code", False):
            user = yield self.get_authenticated_user(
                redirect_uri=url_,
                client_id=self.settings["facebook_api_key"],
                client_secret=self.settings["facebook_secret"],
                code=self.get_argument("code")
            )
            
            # TODO: parse information from 'user' parameter
            
        else:
            yield self.authorize_redirect(
                redirect_uri=url_,
                client_id=self.settings["facebook_api_key"],
                extra_params={"scope": "read_stream,offline_access"})


class UserHandler(BaseHandler):
    def get(self):
        pass


class AnotherUserHandler(BaseHandler):
    def get(self, user_id):
        pass


class TopicListHandler(BaseHandler):
    def get(self):
        pass


class TopicHandler(BaseHandler):
    def get(self, topic_id):
        pass


__all__ = [
           'MainHandler',
           'RegisterHandler',
           'LoginHandler',
           'UserHandler',
           'AnotherUserHandler',
           'TopicListHandler',
           'TopicHandler',
           ]

urls = [
        (r"/", MainHandler),
        (r"/register/?", RegisterHandler),
        (r"/login/?", LoginHandler),
        (r"/login/facebook/?", LoginWithFB_Handler),
        (r"/user/?", UserHandler),
        (r"/user/([0-9]+)/?", AnotherUserHandler),
        (r"/topic/?", TopicListHandler),
        (r"/topic/([0-9]+)/?", TopicHandler),
        ]
