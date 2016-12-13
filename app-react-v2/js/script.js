var { Router,
    Route,
    IndexRoute,
    IndexLink,
    Link } = ReactRouter;

var destination = document.querySelector("#container");

var currentTopic;
var currentThreads;
var loginStatus = false;
var alertMessage;


var o = {};

var Store = {
  saveThreadList: function(state, topic) {
    o['threads'] = state;
    o['topic'] = topic;
  },
  getThreadList: function() {
    return o['threads'];
  },
  getThreadTopic: function () {
    return o['topic'];
  }
};



var Home = React.createClass({

  getInitialState: function() {
    return {
      tops: undefined
    }
  },

  componentDidMount: function(){
    this.getTopThread();

  },

  componentWillReceiveProps: function(nextProps){
    this.getTopThread();
  },

getTopThread: function () {

  $.ajax({
    url: 'http://ec2-54-183-220-7.us-west-1.compute.amazonaws.com/getTopThread',
    // url: 'http://127.0.0.1:5000/getTopThread',
    type: 'POST',
    success: function(response) {
      console.log("top threads success");
      console.log(response);
      var obj = $.parseJSON(response);
      this.setState({tops: obj});
    }.bind(this),
    error: function(error) {
      console.log("top threads fail");
      console.log(error);
    }
  });

},

contact: function (event) {
  event.preventDefault();
  $.ajax({
    url: 'http://ec2-54-183-220-7.us-west-1.compute.amazonaws.com/contact',
    // url: 'http://127.0.0.1:5000/contact',
    data: $('#contact-form').serialize(),
    type: 'POST',
    success: function(response) {
      console.log("email success");
      console.log(response);
    },
    error: function(error) {
      console.log("email fail");
      console.log(error);
    }
  });

},

render: function() {

  var tops1, tops2, tops3, tops4;

  // Response is not here yet
  if ( !this.state.tops ) {
    return <div>Loading..</div>
  }

  // Result array is empty
  if ( this.state.tops.length === 0 ) {
    tops = <div><h3>No result found..</h3></div>;

  } else {
    // Normal Case
    tops1 = this.state.tops[0].map(function(item) {
      return (
        <div className="ellipses"><Link to={"/topics/study/" + item.sessionid}>{item.title}</Link></div>
      );
    });

    tops2 = this.state.tops[1].map(function(item) {
      return (
        <div className="ellipses"><Link to={"/topics/life/" + item.sessionid}>{item.title}</Link></div>
      );
    });

    tops3 = this.state.tops[2].map(function(item) {
      return (
        <div className="ellipses"><Link to={"/topics/career/" + item.sessionid}>{item.title}</Link></div>
      );
    });

    tops4 = this.state.tops[3].map(function(item) {
      return (
        <div className="ellipses"><Link to={"/topics/events/" + item.sessionid}>{item.title}</Link></div>
      );
    });
  }

    return (
      <div>
        <div>
          <section>
            {/*<div class="page-header" id="gallery">*/}
            {/*<h2>Gallery.<small> Check our the Awesome Gallery </small></h2>*/}
            {/*</div>*/}
            <div id="myCarousel" className="carousel slide" data-ride="carousel">
              {/* Indicators */}
              <ol className="carousel-indicators">
                <li data-target="#myCarousel" data-slide-to={0} className="active" />
                <li data-target="#myCarousel" data-slide-to={1} />
                <li data-target="#myCarousel" data-slide-to={2} />
                <li data-target="#myCarousel" data-slide-to={3} />
              </ol>
              {/* Wrapper for slides */}
              <div className="carousel-inner" role="listbox">
                <div className="item active">
                  <img src="img/townhall.jpg" alt="tower hall" />
                  <div className="carousel-caption">
                    <h1>San Jose State University Town Hall</h1>
                    <p className="lead">Description</p>
                    <hr />
                    <a className="btn btn-large btn-warning" href="#">More Information</a>
                    <br />
                  </div>
                </div>
                <div className="item">
                  <img src="img/library.jpg" alt="townhall night" />
                  <div className="carousel-caption">
                    <h1>San Jose State University Library</h1>
                    <p className="lead">Description</p>
                    <hr />
                    <a className="btn btn-large btn-warning" href="#">More Information</a>
                    <br />
                  </div>
                </div>
                <div className="item">
                  <img src="img/football.jpg" alt="football match" />
                  <div className="carousel-caption">
                    <h1>San Jose State University Football Match</h1>
                    <p className="lead">Description</p>
                    <hr />
                    <a className="btn btn-large btn-warning" href="#">More Information</a>
                    <br />
                  </div>
                </div>
                <div className="item">
                  <img src="img/aviation.jpg" alt="aviation" />
                  <div className="container">
                    <div className="carousel-caption">
                      <h1>San Jose State University Aviation</h1>
                      <p className="lead">Description</p>
                      <hr />
                      <a className="btn btn-large btn-warning" href="#">More Information</a>
                      <br />
                    </div>
                  </div>
                </div>
              </div>
              {/* Left and right controls */}
              <a className="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
                <span className="glyphicon glyphicon-chevron-left" aria-hidden="true" />
                <span className="sr-only">Previous</span>
              </a>
              <a className="right carousel-control" href="#myCarousel" role="button" data-slide="next">
                <span className="glyphicon glyphicon-chevron-right" aria-hidden="true" />
                <span className="sr-only">Next</span>
              </a>
            </div>
          </section>
        </div>

        <div className="container">
          <section>
            <div className="page-header" id="hottopic">
              <h2>Top Posts</h2>
            </div>{/* End Page Header */}
            <div className="row">
              <div className="col-sm-3">
                <blockquote className="studytopic">
                  <h4 className="topic">Study</h4>
                  <hr />
                  {tops1}
                </blockquote>
              </div>
              <div className="col-sm-3">
                <blockquote className="lifetopic">
                  <h4 className="topic">Life</h4>
                  <hr />
                  {tops2}
                </blockquote>
              </div>

              <div className="col-sm-3">
                <blockquote className="jobreference">
                  <h4 className="topic">Career</h4>
                  <hr />
                  {tops3}
                </blockquote>
              </div>

              <div className="col-sm-3">
                <blockquote className="discusstopic">
                  <h4 className="topic">Events</h4>
                  <hr />
                  {tops4}
                </blockquote>
              </div>
            </div>
          </section>
        </div> {/* End of Recent Post Section */}


        <div className="container">
          <section>
            <div className="page-header" id="about">
              <h2>About us</h2>
            </div>
            <div className="row">
              <div className="col-sm-1 control-label">
                <label><strong>Mission:</strong></label>
              </div>
              <div className="col-sm-11">
                <p>Our mission is to help San Jose Student to success in many fields</p>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <strong>Team Members Introduction: </strong>
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-sm-3">
                <img src="img/long.jpg" className="photoHolder" />
                <br />
                <p>My name is Yunlong Xu, I am the website developer at SJSU BBS</p>
              </div>
              <div className="col-sm-3">
                <img src="img/huan.jpg" className="photoHolder" />
                <br />
                <p>My name is Huan Li, I am the website developer at SJSU BBS</p>
              </div>
              <div className="col-sm-3">
                <img src="img/alan.jpg" className="photoHolder" />
                <br />
                <p>My name is Alan Chen, I am the website developer at SJSU BBS</p>
              </div>
              <div className="col-sm-3">
                <img src="img/kent.png" className="photoHolder" />
                <br />
                <p>My name is Kent Hung, I am the website developer at SJSU BBS</p>
              </div>
            </div>
          </section>
        </div>

        <br/>
        <br/>


        <div className="container contactContainer">
          <section>
            <div className="page-header" id="contact">
              <h2>Contact US <small>If you have any questions, please feel free to contact with us</small></h2>
            </div>{/* End of Page Header */}
            <div className="row">
              <div className="col-sm-4">
                <p>Send us a message, or contact us from address below</p>
                <address>
                  <strong>San Jose State BBS</strong><br />
                  1 Washington Sq <br />
                  San Jose, CA 95192 <br />
                  Tel: +1-408-123-4567
                </address>
              </div>
              <div className="col-sm-8">
                <form id="contact-form" className="form-horizontal">
                  <div className="form-group">
                    <label htmlFor="user-email" className="col-sm-2 control-label">Email</label>
                    <div className="col-sm-10">
                      <input type="text" name="email" className="form-control" id="user-email" placeholder="Please enter your Email" />
                    </div>
                  </div>{/* End Form Group */}
                  <div className="form-group">
                    <label htmlFor="user-url" className="col-sm-2 control-label">Title</label>
                    <div className="col-sm-10">
                      <input type="text" name="title" className="form-control" id="user-url" placeholder="Title" />
                    </div>
                  </div>{/* End Form Group */}
                  <div className="form-group">
                    <label htmlFor="user-message" className="col-sm-2 control-label">Any Message</label>
                    <div className="col-sm-10">
                      <textarea name="body" id="user-message" className="form-control" cols={20} rows={10} placeholder="Enter Your Message" defaultValue={""} />
                    </div>
                  </div>{/* End Form Group */}
                  <div className="form-group">
                    <div className="col-sm-10 col-sm-offset-2">
                      <button onClick={this.contact} className="btn btn-warning">Submit</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>{/* End of Row */}
          </section>{/* End of Contact US section */}
        </div>
      </div>
    );
  }
});



var TopicComponent = React.createClass({

  render: function() {
    return (
      <div className="container topic-container">
        <section>
          <div className="row" id="topics">
            <Link to={"/topics/study"}>
              <div className="col-sm-4 customizeWidth studyGallery topic">
                <div className="pictureShadow1">
                  <p className="title1" value="study">Study</p>
                </div>
              </div>
            </Link>
            <Link to={"/topics/life"}>
              <div className="col-sm-4 customizeWidth lifeGallery topic">
                <div className="pictureShadow2">
                  <p className="title2" value="life">Life</p>
                </div>
              </div>
            </Link>

            <Link to={"/topics/career"}>
              <div className="col-sm-4 customizeWidth careerGallery topic">
                <div className="pictureShadow3">
                  <p className="title3" value="career">Career</p>
                </div>
              </div>
            </Link>
          </div>
          <div className="row">
            <Link to={"/topics/transportation"}>
              <div className="col-sm-4 customizeWidth transportGallery topic">
                <div className="pictureShadow4">
                  <p className="title4" value="transportation">Transportation</p>
                </div>
              </div>
            </Link>
            <Link to={"/topics/events"} >
              <div className="col-sm-4 customizeWidth eventGallery topic">
                <div className="pictureShadow5">
                  <p className="title5" value="events">Events</p>
                </div>
              </div>
            </Link>
            <Link to={"/topics/travel"} >
              <div className="col-sm-4 customizeWidth travelGallery topic">
                <div className="pictureShadow6">
                  <p className="title6" value="travel">Travel</p>
                </div>
              </div>
            </Link>
          </div>
        </section>
      </div>
    );
  }
});




// Thread List Component
var ThreadListComponent = React.createClass({
  getInitialState: function() {
    return {
      threads: undefined
    }
  },

  componentDidMount: function(){

    this.getThreads();

    // var topic = this.props.params.topic;
    // var state = Store.getThreadList();
    // var storeTopic = Store.getThreadTopic();
    // if (storeTopic === topic) {
    //   this.setState(state);
    // } else {
    //   this.getThreads();
    // }

  },

  componentWillUnmount: function() {
    // Store.saveThreadList(this.state, this.props.params.topic);
  },

  componentWillReceiveProps: function(nextProps){
    this.getThreads();
  },



  getThreads: function() {
    var topic = this.props.params.topic;
    console.log(topic);
    $.ajax({
      url: 'http://ec2-54-183-220-7.us-west-1.compute.amazonaws.com/getThread?topic=' + topic,
      // url: 'http://127.0.0.1:5000/getThread?topic=' + topic,
      type: 'GET',
      success: function(response) {
        console.log("success");
        var obj = $.parseJSON(response);
        console.log(obj);

        if (this.isMounted()) {
          this.setState({
            threads: obj
          });
        }

        currentThreads = obj;
        currentTopic = topic;
      }.bind(this),
      error: function(error) {
        console.log("fail");
        console.log(error);
      }
    });

  },

  postNewThread: function () {
    console.log(localStorage.getItem('loginStatus'));
    if (localStorage.getItem('loginStatus') == "true") {
      var user = $.parseJSON(localStorage.getItem('currentUser'))[0];
      console.log()
      $.ajax({
        url: 'http://ec2-54-183-220-7.us-west-1.compute.amazonaws.com/thread',
        // url: 'http://127.0.0.1:5000/thread',
        data: { title:$("#title").val(), content:$("#content").val(), topic: this.props.params.topic, userid:user.userid, username:user.name},
        type: 'POST',
        success: function(response) {
          console.log("success");
          console.log(response);

          $("#collapseExample").collapse('hide');
          this.getThreads();
          // this.forceUpdate();
        }.bind(this),
        error: function(error) {
          console.log("fail");
          console.log(error);
        }
      });
    } else {
      $('#alert-modal').modal('show');
    }

  },

  render: function() {

    var listItems;
    var topic = this.props.params.topic;

    // Response is not here yet
    if ( !this.state.threads ) {
      return <div>Loading..</div>
    }

    // Result array is empty
    if ( this.state.threads.length === 0 ) {
      listItems = <div><h3>No result found..</h3></div>;

    } else {
      // Normal Case
      listItems = this.state.threads.map(function(item) {
        return (
          <div className="media thread-item">
            <div className="media-left" href="#">
              <img className="media-object user-pic" src="img/icon-user-default.png" alt="Generic placeholder image" />
              <span>{item.username}</span>
            </div>
            <div className="media-body">
              <div>
                <Link to={"/topics/" + topic + "/" + item.sessionid}>
                  <h3 className="media-heading">{item.title}</h3>
                  <p>{item.content}</p>
                </Link>
              </div>
              <div>
                <p className="post-info"><span>{item.replynumber} Replies,</span> <span>Posted On: {item.time}</span></p>
              </div>
            </div>
          </div>
        );
      });
    }

    return (
      <div className="container thred-list-view">
        <div className="row">
          <h1>Threads</h1>
          <div>
            <h2 className="topic-header" style={{display: 'inline'}}>Topic: {this.props.params.topic.capitalizeFirstLetter()} </h2>
            <button style={{display: 'inline'}} className="btn btn-lg btn-primary pull-right" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
              Start New Thread
            </button>
          </div>
        </div>
        <div className="row collapse collapse-row" id="collapseExample">
          <div className="card card-block">
            <h3>Start a new thread </h3>
            <form className="form-horizontal" role="form" id="new-thread-form">
              <div className="form-group row">
                <label htmlFor="title" className="col-xs-2 col-form-label">Title</label>
                <div className="col-xs-10">
                  <input className="form-control" type="text" placeholder="Thread Title" id="title" name="title" />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="content" className="col-xs-2 col-form-label">Content</label>
                <div className="col-xs-10">
                  <textarea rows={10} className="form-control" type="text" placeholder="What's this thread about?" id="content" name="content" defaultValue={""} />
                </div>
              </div>
              <button id="new-thread-button" onClick={this.postNewThread} data-toggle="collapse" className="btn btn-lg btn-success pull-right">Post</button>
            </form>
          </div>
        </div>
        <div className="row thread-list">
          {listItems}
        </div>
      </div>
    );
  }

});


var ThreadComponent = React.createClass({
  getInitialState: function() {
    return {
      curr: undefined
    }
  },

  componentDidMount: function(){
    this.getThreadBySession();
  },

  componentWillReceiveProps: function(nextProps){
    this.getThreadBySession();
  },


  replyThread: function () {

    if (localStorage.getItem('loginStatus') == "true") {
      var user = $.parseJSON(localStorage.getItem('currentUser'))[0];
      $.ajax({
            url: 'http://ec2-54-183-220-7.us-west-1.compute.amazonaws.com/replyThread',
            // url: 'http://127.0.0.1:5000/replyThread',
            data: {content:$("#reply-content").val(), sessionid:this.props.params.sessionid, userid:user.userid, username:user.name},
            type: 'POST',
            success: function(response) {
              console.log("success");
              console.log(response);
              this.getThreadBySession();
            }.bind(this),
            error: function(error) {
              console.log("fail");
              console.log(error);
            }
          });
    } else {
      $('#alert-modal').modal('show');
    }

  },

  getThreadBySession: function() {
    // console.log(this.props.params.sessionid);
    var sessionid = this.props.params.sessionid;
    $.ajax({
      url: 'http://ec2-54-183-220-7.us-west-1.compute.amazonaws.com/getThreadBySession?sessionid=' + sessionid,
      // url: 'http://127.0.0.1:5000/getThreadBySession?sessionid=' + sessionid,
      type: 'GET',
      success: function(response) {
        console.log("success");
        console.log(response);
        var obj = $.parseJSON(response)
        if (this.isMounted()) {
          this.setState({curr: obj[0]});
        }
      }.bind(this),
      error: function(error) {
        console.log("fail");
        console.log(error);
      }
    });




  },

  render: function() {

    if ( !this.state.curr ) {
      return <div>Loading..</div>
    }

    var replies;
    if ( this.state.curr.reply.length === 0 ) {
      replies = <div><h3>No Reply</h3></div>;

    } else {
      // Normal Case
      replies = this.state.curr.reply.map(function(item) {
        return (
          <div className="media">
            <div className="media post post-reply">
              <div className="media-left">
                <img className="media-object user-pic" src="img/icon-user-default.png" alt="Generic placeholder image" />
                <span>{item.username}</span>
              </div>
              <div className="media-body">
                <div>
                  <p>{item.content}</p>
                </div>
                <div>
                  <p className="post-info"><span>Replied On: {item.time}</span></p>
                </div>
              </div>
            </div>
            <hr/>
          </div>
        );
      });
    }

    // console.log(currentThreads);
    // console.log(this.state.curr);

    return (
      <div className="container">
        <div className="row">
          <h1>Thread</h1>
          <div className="thread">
            <div className="media post post-head">
              <div className="media-left">
                <img className="media-object user-pic" src="img/icon-user-default.png" alt="Generic placeholder image" />
                <span>{this.state.curr.username}</span>
              </div>
              <div className="media-body">
                <div>
                  <h2 className="media-heading">{this.state.curr.title}</h2>
                  <p>{this.state.curr.content}</p>
                </div>
                <div className="pull-left">
                  <p className="post-info"><span>Posted On: {this.state.curr.time}</span></p>
                </div>
                <div className="post-button pull-right">
                  <a href="#reply-div" className="btn btn-info" role="button">Reply</a>
                </div>
              </div>
            </div>

            {replies}

            <div id="reply-div" className="reply-div">
              <form className="form-horizontal" role="form" id="reply-form">
                <div className="form-group row">
                  <label htmlFor="content" className="col-xs-2 col-form-label">Content</label>
                  <div className="col-xs-10">
                    <textarea rows={10} className="form-control" type="text" placeholder="What do you have in mind?" id="reply-content" name="content" defaultValue={""} />
                  </div>
                </div>
                <button id="reply-button" onClick={this.replyThread} data-toggle="collapse" className="btn btn-lg btn-success pull-right">Reply</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  },

});



var ProfileComponent = React.createClass({

  render: function() {

    var userInfo;

    if (localStorage.getItem('loginStatus') == "true") {
      var user = $.parseJSON(localStorage.getItem('currentUser'))[0];
      userInfo = (
        <form className="user-form">
          <div className="form-group"> {/* Full Name */}
            <label htmlFor="full_name_id" className="control-label">Name</label>
            <input readonly disabled="true" type="text" value={user.name} className="form-control" id="full_name_id" name="name" placeholder="John Deer" />
          </div>
          <div className="form-group"> {/* Street 1 */}
            <label htmlFor="email" className="control-label">Email Address</label>
            <input readonly disabled="true" type="text" value={user.email} className="form-control" id="email" name="street1" placeholder="Email address, P.O. box, company name, c/o" />
          </div>
          <div className="form-group"> {/* City*/}
            <label htmlFor="major" className="control-label">Major</label>
            <input readonly disabled="true" type="text" value={user.major} className="form-control" id="major" name="major" placeholder="Major" />
          </div>
        </form>
      );
    } else {
      userInfo = (
        <h3>Please Log In</h3>
      );
    }

    return (

      <div className="container">
        <div className="row">
        <div className="col-md-8 col-md-offset-2">
        <h2>My Profile</h2>
        <div className="media">
        <div className="profile-img" href="#">
          <img className="media-object user-pic" src="img/icon-user-default.png" alt="Generic placeholder image" />
        </div>

      </div>
          {userInfo}
        </div>
        </div>
      </div>


    );
  }
});



var App = React.createClass({
  getInitialState: function() {

    var status;
    if (localStorage.getItem('loginStatus') == "true") {
      status = true;
    } else {
      status = false;
    }
    return {
      loggedin: status,
      user: undefined
    }
  },

  login: function (event) {
    event.preventDefault();
    $.ajax({
      url: 'http://ec2-54-183-220-7.us-west-1.compute.amazonaws.com/login',
      // url: 'http://127.0.0.1:5000/login',
      data: $('#login-form').serialize(),
      type: 'POST',
      success: function(response) {
        console.log("login success");
        console.log(response);
        var obj = $.parseJSON(response);
        // currentUser = obj[0];
        localStorage.setItem('loginStatus', true);
        localStorage.setItem('currentUser', response);
        this.setState({loggedin: true, user: obj[0]});

        console.log("aaa");
        // console.log($.parseJSON(localStorage.getItem('currentUser')));

        $('#loginModal').modal('toggle');

      }.bind(this),
      error: function(error) {
        console.log("login fail");
        console.log(error);
        // console.log("Status: " + this.state.loggedin);
      }
    });
  },

  register: function (event) {
    event.preventDefault();
    $.ajax({
          url: 'http://ec2-54-183-220-7.us-west-1.compute.amazonaws.com/signup',
          // url: 'http://127.0.0.1:5000/signup',
          data: $('#signup-form').serialize(),
          type: 'POST',
          success: function(response) {
            console.log("success");
            console.log(response);
            // this.setState({loggedin: true});
            // console.log("Status: " + this.state.loggedin);
            $('#signupModal').modal('toggle');
          }.bind(this),
          error: function(error) {
            console.log("fail");
            console.log(error);
          }
        });
  },

  logout: function () {
    this.setState({loggedin: false, user: undefined});
    localStorage.setItem('loginStatus', false);
    localStorage.setItem('currentUser', "");
    console.log(localStorage.getItem('loginStatus'));
  },

  render: function () {

    var userDiv;

    if (this.state.loggedin) {
      userDiv = (
        <ul className="nav navbar-nav navbar-right">

          <li><Link to="/profile">Hi, {$.parseJSON(localStorage.getItem('currentUser'))[0].name}</Link></li>
          <li><a href="#" onClick={this.logout}><span className="glyphicon glyphicon-log-out" />Logout</a></li>
        </ul>
      );
    } else {
      userDiv = (
        <ul className="nav navbar-nav navbar-right">
          <li><a href="#" data-toggle="modal" data-target="#signupModal"><span className="glyphicon glyphicon-user" /> Sign Up</a></li>
          <li><a href="#" data-toggle="modal" data-target="#loginModal"><span className="glyphicon glyphicon-log-in" /> Login</a></li>
        </ul>
      );
    }


    return (
      <div>
        <div className="wrapper navbarcolor">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </button>
              <Link to="/" activeClassName="navbar-brand">SJSU bbs</Link>
            </div>{/* End Navbar Header */}
            <div className="collapse navbar-collapse" id="myNavbar">
              <ul className="nav navbar-nav" id="navcolor">

              <li><IndexLink to="/" activeClassName="active">Home</IndexLink></li>
              <li><Link to="/topics" activeClassName="active">Topics</Link></li>

                {/*
                // <li><a href="#home">Home</a></li>
                // <li><a href="#hottopic">Recent Post</a></li>
                // <li><a href="#topics">Topics</a></li>
                // <li><a href="#about">About us</a></li>
                // <li><a href="#contact">Contact us</a></li>
                */}

              </ul> {/* Navbar button */}
              {userDiv}
            </div>{/* signup and sign in button */}
          </div>{/* End Container */}
        </div>
        {/* End navbar */}
        {/* Login Modal */}
        <div className="modal fade" id="loginModal" tabIndex={-1} role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
                <h4 className="modal-title" id="myModalLabel">Login</h4>
              </div>
              <div className="modal-body">
                <form id="login-form">
                  <div className="form-group">
                    <label htmlFor="email" className="control-label">Email</label>
                    <input type="email" placeholder="Email" name="email" className="form-control" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password_id" className="control-label">Password</label>
                    <input type="password" placeholder="Password" name="password" className="form-control" required />
                  </div>
                  <button id="login-button" onClick={this.login} className="btn btn-success btn-block">Login</button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Login Modal */}
        <div className="modal fade" id="alert-modal" tabIndex={-1} role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
                <h4 className="modal-title" id="myModalLabel">Login</h4>
              </div>
              <div className="modal-body">
                Please login..
              </div>
            </div>
          </div>
        </div>

        <div className="modal fade" id="signupModal" tabIndex={-1} role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
                <h4 className="modal-title" id="myModalLabel">Login</h4>
              </div>
              <div className="modal-body">
                <form id="signup-form">
                  <div className="form-group"> {/* Full Name */}
                    <label htmlFor="full_name_id" className="control-label">Full Name</label>
                    <input type="text" className="form-control" id="full_name_id" name="name" placeholder="John Deer" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email" className="control-label">Email</label>
                    <input type="email" className="form-control" id="email" name="email" placeholder="email" />
                  </div>
                  <div className="form-group"> {/* Full Name */}
                    <label htmlFor="password_id" className="control-label">Password</label>
                    <input type="password" className="form-control" id="password_id" name="password" placeholder="Password" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="major" className="control-label">Major</label>
                    <input type="text" className="form-control" id="major" name="major" placeholder="Major" />
                  </div>
                  <div className="form-group"> {/* Submit Button */}
                    <button id="signup-button" onClick={this.register} className="btn btn-primary btn-block">Sign Up</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>


        <div className="content">
          {this.props.children}
        </div>


      </div>

    )
  }
});

$(document).ready(function() {
  console.log(localStorage.getItem('loginStatus'));

  ReactDOM.render(
    <Router>
      <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="topics/:topic" component={ThreadListComponent} handler={this.getThreads} />
        <Route path="topics/:topic/:sessionid" component={ThreadComponent} handler={this.getThreadBySession} />
        <Route path="topics" component={TopicComponent} />
        <Route path="profile" component={ProfileComponent} />

      </Route>
    </Router>,
    destination
  );

});


String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
