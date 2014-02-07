from __future__ import absolute_import
from flask import Blueprint, request, jsonify, json, current_app
from flask.views import MethodView
from flask.ext.login import login_required
from bson import json_util
from srv import mongo

api_topic = Blueprint('topic', __name__)

class TopicView(MethodView):

    @login_required
    def post(self):
        """
        an attempt to create a new topic
        """
        data = request.get_json()
        # TODO: input validation

        topic_id = mongo.db.topics.insert(data)
        # convert objectId back to json
        tid = json.dumps(topic_id, default=json_util.default, separators=(',', ':'))
        return jsonify(id=tid, error=""), 200

    def get(self, topic_id):
        """
        get a topic based on an id
        """
        return "", 200

class TopicSearchView(MethodView):

    def get(self):
        """
        search a topic based on keyword-matching
        """
        current_app.logger.error("topic search get")
        return "", 200


api_topic.add_url_rule('/r/topics/', view_func=TopicView.as_view('res-topic-post'), methods=['POST', ])
api_topic.add_url_rule('/r/topics/<int:topic_id>', view_func=TopicView.as_view('res-topic-get'), methods=['GET', ])
api_topic.add_url_rule('/p/topics/q', view_func=TopicSearchView.as_view('api-topic-query'), methods=['GET', ])

