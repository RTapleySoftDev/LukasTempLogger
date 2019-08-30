import os
from client_api import validate_login, login_required
from flask import Flask, app, request, json, render_template, session, redirect, url_for
from werkzeug.security import check_password_hash, generate_password_hash
import json
from datetime import timedelta
import time
import datetime
import pandas as pd


def page_not_found(e):
  return render_template('404.html'), 404
# create and configure the app
app = Flask(__name__, static_url_path='/static')
app.secret_key = os.urandom(24)
app.register_error_handler(404, page_not_found)

ALLOWED_EXTENSIONS = set(['csv'])

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS


@app.route("/")
#@ssl_required
def x():
    return render_template('404.html'), 404
    
@app.route("/templogger", methods=['GET', 'POST'])
def index():
    if request.method == 'GET':
        if 's_username' not in session:
            return render_template('entry.html',
                                   the_name = """<span id = 'titlespan'>&nbsp</span>""")
        else:
            return redirect(url_for('all_data'))

@app.route('/register', methods=('GET', 'POST'))
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        error = None

        if not username:
            error = 'Username is required.'
        elif not password:
            error = 'Password is required.'

        if error is None:
            d = {"username":username, "password":generate_password_hash(password)}
            json.dump(d, open("text.txt",'w'))

            return redirect(url_for('login'))

        flash(error)

    return render_template('register.html')

@app.route('/processlogin',methods=['GET','POST'])
def process_login():

    if request.method == 'GET':
        if 's_username' not in session:
            time.sleep(10)
            return render_template('entry.html',
                                   message = """<span>Fill out the form below with Username and Password to Login.</span>""")
        else:
            return redirect(url_for('all_data'))


    if request.method == 'POST':
        username = request.form['user']
        password = request.form['pass']
        if(validate_login(username, password)):
            session.permanent = True
            app.permanent_session_lifetime = timedelta(seconds=3600)# 60 minutes
            session['s_username'] = username
            dt = datetime.datetime.now()
            f = open("loginfile.txt", "a")
            f.write("Login: %s %s %s"%(session['s_username'],dt.strftime("%c"),"\n"))

            return redirect(url_for('all_data'))

            ##return render_template("all_data.html",
                                   ##the_name = "<span id = 'titlespan'>Test Rig Dashboard &nbsp &nbsp &nbsp &nbsp Welcome %s.</span>"%(session['s_username']),
                                   ##username = session['s_username'])
        else:
            time.sleep(5)
            return render_template('entry.html',
                                    message = """<span class = 'red'>Wrong Username and Password Entered. Please Try Again.</span>""",)

@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('index'))

@app.route('/alldata')
@login_required
def all_data():
    return render_template("date_dash.html",
                           the_name = "<span id = 'titlespan'>Lukas Temperature Logger &nbsp &nbsp &nbsp &nbsp Welcome %s.</span>"%(session['s_username']),
                           username = session['s_username'])

@app.route('/getdropdownlist', methods = ["GET"])
@login_required
def GetdropDownList():
  fileList = os.listdir("static/files/")[:-1]

  ammendedFileList = [ f.replace('-','0') for f in fileList]
  ammendedFileList = [os.path.splitext(x)[0] for x in ammendedFileList]

  sortedFileList = sorted(ammendedFileList, reverse= True)
  return json.dumps(sortedFileList)

@app.route('/getdataforchart', methods = ['GET'])
@login_required
def getDataForChart():
  fileIn = request.args.get('file')
  fileApp = fileIn[:8] + "-" + fileIn[9:]
  fileApp = fileApp[:] + ".csv"
  csv_file = pd.DataFrame(pd.read_csv('static/files/'+fileApp, sep = ",", header = 0, index_col = False))
  return csv_file.to_json(orient = "records",  double_precision = 10, force_ascii = True, default_handler = None)

## App Rest API Calls ##
@app.route('/restgetfilelist',methods=['POST'])
def restGetFileList():
  if request.method == 'POST':
      username = request.form['user']
      password = request.form['pass']
      fileIn = request.form['file']
    
      if(validate_login(username, password)):

          fileList = os.listdir("static/files/")[:-1]

          ammendedFileList = [ f.replace('-','0') for f in fileList]
          ammendedFileList = [os.path.splitext(x)[0] for x in ammendedFileList]

          sortedFileList = sorted(ammendedFileList, reverse= True)
          return json.dumps(sortedFileList)
  return render_template('404.html'), 404

@app.route('/restgetfile',methods=['POST'])
def restGetFile():
  if request.method == 'POST':
      username = request.form['user']
      password = request.form['pass']
      fileIn = request.form['file']
    
      if(validate_login(username, password)):

        fileApp = fileIn[:8] + "-" + fileIn[9:]
        fileApp = fileApp[:] + ".csv"
        csv_file = pd.DataFrame(pd.read_csv('static/files/'+fileApp, sep = ",", header = 0, index_col = False))
        return csv_file.to_json(orient = "records",  double_precision = 10, force_ascii = True, default_handler = None)
        #return fileIn
  return render_template('404.html'), 404

@app.route('/restsavefile',methods=['POST'])
def restSaveFile():
  if request.method == 'POST':
      username = request.form['user']
      password = request.form['pass']
      fileIn = request.form['file']
      dataIn = request.form['data']
    
      if(validate_login(username, password)):
        df = pd.read_json(dataIn)
        df.to_csv('static/files/'+fileIn, index = False)


        return "OK"
  return render_template('404.html'), 404
  
                                      

if __name__ == "__main__":
    app.run( port=5002, debug=True)
