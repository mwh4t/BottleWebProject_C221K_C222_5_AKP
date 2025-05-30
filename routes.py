"""
Routes and views for the bottle application.
"""

from bottle import route, view, response
from datetime import datetime

@route('/')
@route('/home')
@view('index')
def home():
    """Renders the home page."""
    return dict(
        year=datetime.now().year
    )

@route('/metrics')
@view('metrics')
def metrics():
    return

@route('/euler')
@view('euler')
def euler():
    return

@route('/hamilton')
@view('hamilton')
def hamilton():
    return
