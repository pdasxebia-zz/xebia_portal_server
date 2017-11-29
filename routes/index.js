var express = require('express');
var router = express.Router();
var Admins = require("../models/AdminSchema");
var resp = require("../config/response.json");
var sessiondb = require("../config/sessiondb");

/* GET home page. */
router.get('/', function (req, res,panna) {
  //sess=req.app.locals.session;
  req.session.data=sessiondb;
  sess=req.session.data;
  console.log(sess);
  if(sess==""|| sess.user.id==0){
    res.send(resp.notSignedIn);
  }else{
    res.send(sess);
  }
  

  //res.render('index', { title: 'Express' });
});

router.post('/login', function (req, res, next) {
  //console.log(req);
  console.log(typeof req.body);
  //sess=req.app.locals.session;
  req.session.data=sessiondb;
  
  sess=req.session.data;
  if (typeof (req.session.profile) != "undefined" && req.session.profile>0 ) {
   res.redirect("/failed");
  }else{

  var check;

  let user="";
  let pass="";
  if( Object.keys(req.body).length === 0){
    user= req.headers.username;
    pass= req.headers.password;
  }else{
    user= req.body.username;
    pass= req.body.password;
  }
  Admins.find({
    where: {
      username: user,
      password: pass,
    }
  }).then(
    admins => {
      console.log(admins);
      if(admins!=null){
        check = admins.get('username');
        console.log(check);
        if (admins.get('username')) {
          
          //sess.user.id=admins.get('username');
          sess.user.id="test";
          sess.user.name=admins.get('firstname');
          sess.user.profile=admins.get('profile');
          sess.user.email=admins.get('email');
          resp.login.authToken=req.sessionID;
          res.send(resp.login);
          
        } else {
          res.send(resp.userCredentialsWrong);
        }
      }else {
        res.statusCode=401;
        res.send(resp.userCredentialsWrong);
      }
     
    }
    );


}});

router.get('/signout', function (req, res, next) {
  sess=req.app.locals.session;
  sess.user="";
  res.send(resp.signout);
});




module.exports = router