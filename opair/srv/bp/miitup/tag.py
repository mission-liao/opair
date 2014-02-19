from __future__ import absolute_import
from flask import Blueprint, request, jsonify, current_app
from flask.views import MethodView
from flask.ext.login import login_required
from srv import mongo


api_tag = Blueprint('tag', __name__)


class TagSearchView(MethodView):
    """
    """

    @login_required
    def get(self):
        """
        suggest tags based on a partial keyword
        """
        keyword = request.args.get('kw')
        # search by string matching.
        kw_match = []
        for k in mongo.db.tags.find({'kw': {'$regex': '^' + keyword, '$options': 'i'}}).limit(5):
            kw_match.append(k['kw'])

        return jsonify(suggest=kw_match, error=""), 200


api_tag.add_url_rule('/p/tags/q', view_func=TagSearchView.as_view('api-tag-query'), methods=['GET', ])

