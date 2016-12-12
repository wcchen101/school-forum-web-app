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
        users.insert({'userid': userID, 'email': emailInput, 'password': passwordInput, 'name': nameInput, 'major': majorInput})
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
    userNameInput = request.form['username']
    topicInput = request.form['topic']
    curTime = datetime.date.today().strftime("%B %d, %Y")
    sessionid = randint(0,10000)
    print(sessionid)

    threads = mongo.db.thread
    if request.method == 'POST':
        threads.insert({
           'sessionid': sessionid,
           'userid': useridInput,
           'username': userNameInput,
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
        for thread in threads.find({"topic": fieldSearch}, {"_id":0}):
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
    sessionidInput = request.form['sessionid']
    int_sessionInput = int(sessionidInput)
    useridInput = request.form['userid']
    usernameInput = request.form['username']
    contentInput = request.form['content']
    threads.update({"sessionid": int_sessionInput},{ "$push": {"reply": {"$each": [{"userid": useridInput, "username": usernameInput, "content": contentInput, "time": curTime}]}}})
    threads.update({"sessionid": int_sessionInput}, {"$inc": {"replynumber": 1}})
    
    return "reply works!"


"""
This is the API for updating the user profile
"""
@app.route('/updateUser', methods=['POST'])
def updateUser():
    userPasswordInput = request.form['password']
    userMajorInput = request.form['major']
    userNameInput = request.form['name']
    useridInput = request.form['userid']
    int_useridInput = int(useridInput)
    users = mongo.db.user
    users.update({"userid": int_useridInput}, {"$set": {"password": userPasswordInput, "name": userNameInput, "major": userMajorInput}})

    return "update sucess"

"""
This is the API for getting top 3 reply thread in each 
return value: json object like {[study], [life], [career], [events]}
"""
@app.route('/getTopThread', methods=['POST'])
def getTopThread():
    threads = mongo.db.thread

    resultStudy = []
    resultJob = []
    resultSport = []
    jsonArr = []

    # studyObj = threads.find({"topic":"study"}, {"_id":0}).limit(3).sort({"replynumber":-1})
    # print(studyObj)
    for thread in threads.find({"topic":"study"}, {"_id":0}).limit(3).sort("replynumber", -1):
        resultStudy.append(thread)
    jsonArr.append(resultStudy)

    for thread in threads.find({"topic":"life"}, {"_id":0}).limit(3).sort("replynumber", -1):
        resultSport.append(thread)
    jsonArr.append(resultSport)

    for thread in threads.find({"topic":"career"}, {"_id":0}).limit(3).sort("replynumber",-1):
        resultJob.append(thread)
    jsonArr.append(resultJob)

    for thread in threads.find({"topic":"events"}, {"_id":0}).limit(3).sort("replynumber",-1):
        resultJob.append(thread)
    jsonArr.append(resultJob)

    jsonStr = json.dumps(jsonArr)

    return jsonStr

"""
This is the API for getting thread regarding to each sessionid
"""
@app.route('/getThreadBySession', methods = ['GET'])
def getThreadBySession():

    threads = mongo.db.thread    
    sessionIdSearch = request.args.get('sessionid')
    int_essionIdSearch = int(sessionIdSearch)
    print(int_essionIdSearch)
    if request.method == 'GET':
        result = []
        idArr = []
        for thread in threads.find({"sessionid": int_essionIdSearch}, {"_id":0}):
            result.append(thread)
        jsonStr = json.dumps(result)

    return jsonStr    


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
