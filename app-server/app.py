from flask import Flask
from flask import request
from flask_cors import CORS, cross_origin
from flask_pymongo import PyMongo
from flask import json

app = Flask(__name__)
mongo = PyMongo(app)
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
    users = mongo.db.user

    users.insert({'email': emailInput, 'password': passwordInput})

    if emailInput and passwordInput:
        return "sucessfully get the input"

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

    if emailInput and passwordInput:
        for user in users.find({'email':emailInput, 'password': passwordInput}):    
            return "correct user"    
    else:
        return "no user"

"""
This is the API for serving the thread create request
"""
@app.route('/thread', methods=['POST'])
def thread():
    titleInput = request.form['title']
    contentInput = request.form['content']
    threads = mongo.db.thread

    if request.method == 'POST':
        threads.insert({
           'title': titleInput,
           'content': contentInput,
           'time': '2016-12-8',
           'reply': {'content': 'good', 'userid': '1', 'time': '2016'}
        })
        if titleInput and contentInput:
            return "thread insert successfully"
        else:
            return "no input"

    # if request.method == 'POST':
    #     result = ['']
    #     # idArr = ['']
    #     for thread in threads.find({}, {"_id":0}):
    #         result.append(thread)
    #     jsonStr = json.dumps(result)

    #     # for id in threads.find({}, {"_id":1}):
    #     #     idArr.append(id)
    #     return jsonStr

    # if titleInput and contentInput:
    #     return "thread insert successfully"
    # else:
    #     return "no input"
@app.route('/getThread', methods=['GET'])
def getThread():
    threads = mongo.db.thread
    result = []
    idArr = []
    for thread in threads.find({}, {"_id":0}):
        result.append(thread)
    jsonStr = json.dumps(result)

    for id in threads.find({}, {"_id":1}):
        idArr.append(id)
    return jsonStr

if __name__ == '__main__':
  app.run(debug = True)
