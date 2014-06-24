from __future__ import absolute_import
from flask import Flask
from celery import Celery
import logging
from .util import register_all_blueprints


def create_app(package_name, settings_override=None):
    app = Flask(package_name, instance_relative_config=True)

    # try to import config module under the package
    try:
        config_path = package_name + '.config'
        
        __import__(config_path)
        app.config.from_object(config_path)
    except ImportError:
        pass

    # TODO: update config from py_file to allow production config

    # the final step is to override by settings provided by caller.
    app.config.from_object(settings_override)

    return app


def create_rest_app(app=None, package_name=None, blueprint_module=None):
    app = app or (package_name and create_app(package_name)) or create_app('opair.srv')

    # init logging
    app.logger.addHandler(logging.StreamHandler())
    app.logger.setLevel(logging.INFO)

    # register blue-prints
    register_all_blueprints(app, blueprint_module)
    
    return app


def create_celery_app(app=None, package_name=None):
    app = app or (package_name and create_app(package_name)) or create_app('opair.srv')

    celery = Celery(__name__, broker=app.config['CELERY_BROKER_URL'])
    celery.config.update(app.config)

    TaskBase = celery.Task
    class ContextTask(TaskBase):
        abstract = True
        def __call__(self, *args, **kwargs):
            with app.app_context():
                return TaskBase.__call__(self, *args, **kwargs)

    celery.task = ContextTask
    return celery

