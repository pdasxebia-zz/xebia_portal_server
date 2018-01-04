// app/routes.js
module.exports = function(app, passport,Employee,Accounts) {
	var resp = require("../config/response.json");
	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	app.get('/accountlist', function(req, res) {
		if (req.isAuthenticated() || req.body.authToken==req.sessionID){
			Accounts.findAll({raw: true}).then((emp)=>res.send(emp)); // load the index.ejs file
		}else{
			res.statusCode=401;
			res.send(resp.accessApiVioaltion);
		}
		
	});

	app.get('/account/:id', function(req, res) {
		if (req.isAuthenticated() || req.body.authToken==req.sessionID){
			Accounts.findOne({where:{id:req.params.id},raw: true}).then((emp)=>res.send(emp)); // load the index.ejs file
		}else{
			res.statusCode=401;
			res.send(resp.accessApiVioaltion);
		}
		
	});

	app.put('/account/:id', function(req, res) {
		res.header('Access-Control-Allow-Credentials', true);
		var msg;
		if (req.isAuthenticated() ){
			err=resp.dataIncomplete;
			res.statusCode=400;
			data=req.body;
			if(Object.keys(data).length === 0 && data.constructor === Object){
				msg=resp.insuficientData;
			}
			if(!("name" in data )||data.name.length<3|| !(/^[a-z A-Z]*$/i.test(data.name))){
				err.description="Please enter a valid name.";
				msg=err;
			}
			if(!("id" in data ) ){
				err.description="Please enter a valid ID for account.";
				msg=err;
			}
			
			if(msg==null){
				Accounts.findOne({where:{id:req.params.id},raw: true}).then((emp)=>{
				console.log(data)
				Accounts.update(data,
					{where:
						{id:req.params.id}
					}
				).then(()=>{
					res.statusCode=200;
					msg=resp.dataInserted;
					res.send(msg);
				});
			}).catch(function(err){
				msg=resp.phantomError;
				msg.description=err.original.sqlMessage;
			});
		}else{
			res.send(msg)
		}
			 // load the index.ejs file
		}else{
			res.statusCode=401;
			res.send(resp.accessApiVioaltion);
		}
		
	});



	

	app.post('/create/account/', function(req, res) {
		//console.log(req.headers.authtoken);
		//console.log(req.sessionID);
		res.header('Access-Control-Allow-Credentials', true);
		var msg;
		if (  req.isAuthenticated()){
			err=resp.dataIncomplete;
			res.statusCode=400;
			data=req.body;
			
			if(Object.keys(data).length === 0 && data.constructor === Object){
				msg=resp.insuficientData;
			}
			if(!("name" in data )||data.name.length<3|| !(/^[a-zA-Z]*$/i.test(data.name))){
				err.description="Please enter a valid name.";
				msg=err;
			}
			
			if(msg==null){
			
					 Accounts.create(data).then(()=>{
						res.statusCode=200;
						res.send(resp.dataInserted);
					}).catch(function (err) {
						msg=resp.dataIncomplete;
						msg.description=err;
						res.send(msg);
					  });
				 
				//account.create(data).then();
			}else{
				res.send(msg);
			}
			
			
		}else{
			res.statusCode=401;
			res.send(resp.accessApiVioaltion);
		}
		
	});
	
};

// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}

