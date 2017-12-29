// app/routes.js
module.exports = function(app, passport,Employee,Address) {
	var resp = require("../config/response.json");
	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	app.get('/addresslist/:id', function(req, res) {
		if (req.isAuthenticated() || req.body.authToken==req.sessionID){
			Employee.findAll({where:{emp_id:req.params.id},raw: true}).then((emp)=>res.send(emp)); // load the index.ejs file
		}else{
			res.statusCode=401;
			res.send(resp.accessApiVioaltion);
		}
		
	});

	app.get('/address/:id/:type', function(req, res) {
		if (req.isAuthenticated() || req.body.authToken==req.sessionID){
			Employee.findOne({where:{emp_id:req.params.id,type:req.params.type},raw: true}).then((emp)=>res.send(emp)); // load the index.ejs file
		}else{
			res.statusCode=401;
			res.send(resp.accessApiVioaltion);
		}
		
	});

	app.put('/address/:id/:type', function(req, res) {
		res.header('Access-Control-Allow-Credentials', true);
		if (req.isAuthenticated() ){
			err=resp.dataIncomplete;
			res.statusCode=400;
			data=req.body;
			if(Object.keys(data).length === 0 && data.constructor === Object){
				res.send(resp.insuficientData);
			}
			if(!("address_type" in data )||data.address_type.length<3|| !(/^[a-zA-Z]*$/i.test(data.address_type))){
				err.description="Please enter a valid address type.";
				res.send(err);
			}
			if(!("add_line1" in data ) || data.add_line1.length<3|| !(/\w+/g.test(data.add_line1))){
				err.description="Please enter a Address line.";
				res.send(err);
			}
			
			if(!("state" in data ) ||data.state.length<3|| !(/^[a-z A-Z]*$/i.test(data.state))){
				err.description="Please enter the state.";
				res.send(err);
			}
			if(!("country" in data ) ||data.country.length<3|| !(/^[a-z A-Z]*$/i.test(data.country))){
				err.description="Please enter a valid the country.";
				res.send(err);
			}
			if(!("pincode" in data ) ||data.country.length<3|| !(/^[a-z A-Z]*$/i.test(data.country))){
				err.description="Please enter a valid Type of employee.";
				res.send(err);
			}
			if(!("emp_id" in data ) || data.emp_id.length<3|| !(/\w+/g.test(data.emp_id))){
				err.description="Please enter a valid ID for employee.";
				res.send(err);
			}
			
			Address.findOne({where:{emp_id:req.params.id,address_type:req.params.type},raw: true}).then((emp)=>{
				console.log(data)
				Address.update(data,
					{where:
						{emp_id:req.params.id,address_type:req.params.type}
					}
				).then(()=>{
					res.statusCode=200;
					res.send(resp.dataInserted);
				});
			}).catch(resp.phantomError); // load the index.ejs file
		}else{
			res.statusCode=401;
			res.send(resp.accessApiVioaltion);
		}
		
	});



	

	app.post('/address/:id', function(req, res) {
		//console.log(req.headers.authtoken);
		//console.log(req.sessionID);
		res.header('Access-Control-Allow-Credentials', true);
		if (  req.isAuthenticated()){
			err=resp.dataIncomplete;
			res.statusCode=400;
			data=req.body;
			console.log(data.name.length);
			if(Object.keys(data).length === 0 && data.constructor === Object){
				res.send(resp.insuficientData);
			}
			if(!("address_type" in data )||data.address_type.length<3|| !(/^[a-zA-Z]*$/i.test(data.address_type))){
				err.description="Please enter a valid address type.";
				res.send(err);
			}
			if(!("add_line1" in data ) || data.add_line1.length<3|| !(/\w+/g.test(data.add_line1))){
				err.description="Please enter a Address line.";
				res.send(err);
			}
			
			if(!("state" in data ) ||data.state.length<3|| !(/^[a-z A-Z]*$/i.test(data.state))){
				err.description="Please enter the state.";
				res.send(err);
			}
			if(!("country" in data ) ||data.country.length<3|| !(/^[a-z A-Z]*$/i.test(data.country))){
				err.description="Please enter a valid the country.";
				res.send(err);
			}
			if(!("pincode" in data ) ||data.country.length<3|| !(/^[a-z A-Z]*$/i.test(data.country))){
				err.description="Please enter a valid Type of employee.";
				res.send(err);
			}
			if(!("emp_id" in data ) || data.emp_id.length<3|| !(/\w+/g.test(data.emp_id))){
				err.description="Please enter a valid ID for employee.";
				res.send(err);
			}
			
			Address.sync().then(() => {
				// Table created
				return Address.create(data).then(()=>{
					res.statusCode=200;
					res.send(resp.dataInserted);
				}).catch(function (err) {
					res.send(resp.phantomError);
				  });
			  });
			//Employee.create(data).then();
			
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

function SkillValidator(obj){
	flag=true;
	obj.forEach(element => {
		if(Object.keys(element).length!=3)
		flag=false;	
		if(!element.skill)
		flag=false;
		if(!element.level)
		flag=false;
		if(!element.version)
		flag=false;
	});
	return flag;
}