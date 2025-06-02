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

@route('/about')
@view('about')
def about():
    return

@route('/euler')
@view('euler')
def euler():
    return

@route('/hamilton')
@view('hamilton')
def hamilton():
    return

@route('/metrics')
@view('metrics')
def metrics():
    return

@route('/theory')
@view('theory')
def theory():
    return