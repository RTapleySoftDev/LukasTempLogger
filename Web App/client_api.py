import pickle
import time
from functools import wraps
from flask import  url_for, redirect, session, request
import json
from werkzeug.security import check_password_hash, generate_password_hash

k = "k"
v = "v"
def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if session.get('s_username') == False:
            return redirect(url_for('index', next=request.url))
        if 's_username' not in session:
            time.sleep(1)
            return redirect(url_for('index', next=request.url))
        return f(*args, **kwargs)
    return decorated_function

def validate_login(user, password):
    check = False
    with open("text.txt", "r") as myFile:
        myJson = json.load(myFile)
        if myJson['username'] == user:
            if check_password_hash(myJson['password'], password):
                check = True

    return check
