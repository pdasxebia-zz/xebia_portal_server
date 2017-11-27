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

router.get('/login', function (req, res, next) {
  //console.log(req);
  //sess=req.app.locals.session;
  req.session.data=sessiondb;
  
  sess=req.session.data;
  if (typeof (req.session.profile) != "undefined" && req.session.profile>0 ) {
   res.redirect("/failed");
  }else{

  var check;
  Admins.find({
    where: {
      username: req.param("username"),
      password: req.param("password"),
    }
  }).then(
    admins => {
      
      if(admins){
        check = admins.get('username');
        console.log(check);
        if (admins.get('username')) {
          
          //sess.user.id=admins.get('username');
          sess.user.id="test";
          sess.user.name=admins.get('firstname');
          sess.user.profile=admins.get('profile');
          sess.user.email=admins.get('email');
          res.send(resp.login);
          
        } else {
          res.send("failed");
        }
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