from flask import Flask
from flask import request
from flask_cors import CORS, cross_origin
from flask_pymongo import PyMongo
from flask_mail import Mail
from flask_mail import Message
from flask import json
from random import randint
import datetime

app = Flask(__name__)
mongo = PyMongo(app)
app.config.update(dict(
    DEBUG = True,
    MAIL_SERVER = 'smtp.gmail.com',
    MAIL_PORT = 587,
    MAIL_USE_TLS = True,
    MAIL_USE_SSL = False,
    MAIL_USERNAME = 'cmpe280sjsu@gmail.com',
    MAIL_PASSWORD = 'CMPE@*)sjsu',
))
mail = Mail(app)
CORS(app)

@app.route('/')
def hello_world():
  return 'Hello from SJSU awesome school!'

"""
This is the API for serving the sing up request
"""
@app.route('/signup', methods=['POST'])
def signup():
    emailInput = request.form['email']
    passwordInput = request.form['password']
    nameInput = request.form['name']
    majorInput = request.form['major']
    userID = randint(0,10000)  
    validID = False
    print(userID)  
    users = mongo.db.user

    for user in users.find({'email':emailInput}):    
        return "duplicate user id"

    validID = True 

    if validID is True and emailInput and passwordInput and nameInput and majorInput:
        users.insert({'user_id': userID, 'email': emailInput, 'password': passwordInput, 'name': nameInput, 'major': majorInput})
        return "sucessfully get the input, and insert the data"

    else:
        return 'no input'

"""
This is the API for serving the login request
"""
@app.route('/login', methods=['POST'])
def login():
    emailInput = request.form['email']
    passwordInput = request.form['password']
    users = mongo.db.user
    userRecord = False
    # userID = randint(0,10000)  
    if emailInput and passwordInput:
        #check user record
        for user in users.find({'email':emailInput, 'password': passwordInput}):    
            userRecord = True
            print("has user record")

        if userRecord is False:
            return "no user record"

        # get user data        
        loginResult = []
        for user in users.find({"email": emailInput}, {"_id":0}):
            loginResult.append(user)
        
        userJsonStr = json.dumps(loginResult)

        return userJsonStr

    else:
        return "no valid input"

"""
This is the API for serving the thread create request
"""
@app.route('/thread', methods=['POST', 'GET'])
def thread():
    titleInput = request.form['title']
    contentInput = request.form['content']
    useridInput = request.form['userid']
    topicInput = request.form['topic']
    curTime = datetime.date.today().strftime("%B %d, %Y")
    sessionid = randint(0,10000)
    print(sessionid)

    threads = mongo.db.thread
    if request.method == 'POST':
        threads.insert({
           'sessionid': sessionid,
           'userid': useridInput,
           'replynumber': 0,
           'title': titleInput,
           'content': contentInput,
           'topic': topicInput,
           'time': curTime,
           'reply': []
        })
        if titleInput and contentInput:
            return "thread insert successfully"
        else:
            return "no input"

"""
This is the API for getting the thread for certain field
"""
@app.route('/getThread', methods=['GET'])
def getThread():
    threads = mongo.db.thread

    fieldSearch = request.args.get('topic')
    if request.method == 'GET':
        result = []
        idArr = []
        for thread in threads.find({"topic": fieldSearch }, {"_id":0}):
            result.append(thread)
        jsonStr = json.dumps(result)
    
    return jsonStr

"""
This is the API for replying the thread
"""
@app.route('/replyThread', methods=['POST'])
def replyThread():
    threads = mongo.db.thread
    curTime = datetime.date.today().strftime("%B %d, %Y")
    sessionidInput = 2340
    useridInput = "12"
    contentInput = "sucess!"
    threads.update({"sessionid": sessionidInput},{ "$push": {"reply": {"$each": [{"userid": useridInput, "content": contentInput, "time": curTime}]}}})
    threads.update({"sessionid": sessionidInput}, {"$inc": {"replynumber": 1}})
    
    return "reply works!"

"""
This is the API for contact us
"""
@app.route("/contact", methods=['POST'])
def contact():
    curTime = datetime.date.today().strftime("%B %d, %Y")
    msg = Message("Hello", sender="cmpe280sjsu@gmail.com", recipients=["vincent881229@gmail.com"])
    mail.send(msg)
    return "success"


if __name__ == '__main__':
  app.run(debug = True)
