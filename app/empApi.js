// app/routes.js
module.exports = function (app, passport, Employee) {
	var resp = require("../config/response.json");
	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	app.get('/employeelist', function (req, res) {
		if (req.isAuthenticated() || req.body.authToken == req.sessionID) {
			Employee.findAll({ raw: true }).then((emp) => res.send(emp)); // load the index.ejs file
		} else {
			res.statusCode = 401;
			res.send(resp.accessApiVioaltion);
		}

	});

	app.get('/employee/:id', function (req, res) {
		if (req.isAuthenticated() || req.body.authToken == req.sessionID) {
			Employee.findOne({ where: { emp_id: req.params.id }, raw: true }).then((emp) => res.send(emp)); // load the index.ejs file
		} else {
			res.statusCode = 401;
			res.send(resp.accessApiVioaltion);
		}

	});

	app.put('/employee/:id', function (req, res) {
		res.header('Access-Control-Allow-Credentials', true);
		if (req.isAuthenticated()) {
			err = resp.dataIncomplete;
			res.statusCode = 400;
			data = req.body;
			if (Object.keys(data).length === 0 && data.constructor === Object) {
				res.send(resp.insuficientData);
			}
			if (!("name" in data) || data.name.length < 3 || !(/^[a-z A-Z]*$/i.test(data.name))) {
				err.description = "Please enter a valid name.";
				res.send(err);
			}
			if (!("emp_id" in data) || data.emp_id.length < 3 || !(/\w+/g.test(data.emp_id))) {
				err.description = "Please enter a valid ID for employee.";
				res.send(err);
			}
			if (!("emp_type" in data) || data.emp_type.length < 3 || !(/^[a-z A-Z]*$/i.test(data.emp_type))) {
				err.description = "Please enter a valid Type of employee.";
				res.send(err);
			}
			if (!("phone" in data) || data.phone.length < 3) {
				err.description = "Please enter a valid Phone number of employee.";
				res.send(err);
			}
			if (!("email" in data) || data.email.length < 3 || !(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(data.email))) {
				err.description = "Please enter a valid Phone number of employee.";
				res.send(err);
			}
			Employee.findOne({ where: { emp_id: req.params.id }, raw: true }).then((emp) => {
				console.log(data)
				Employee.update(data,
					{
						where:
							{ emp_id: req.params.id }
					}
				).then(() => {
					res.statusCode = 200;
					res.send(resp.dataInserted);
				});
			}).catch(resp.phantomError); // load the index.ejs file
		} else {
			res.statusCode = 401;
			res.send(resp.accessApiVioaltion);
		}

	});



	app.put('/skillset/:id', function (req, res) {
		res.header('Access-Control-Allow-Credentials', true);
		if (req.isAuthenticated()) {
			err = resp.dataIncomplete;
			res.statusCode = 400;
			data = req.body;
			if (SkillValidator(data.skillset)) {
				res.send(resp.badFormat);
			}

			Employee.findOne({ where: { emp_id: req.params.id }, raw: true }).then((emp) => {
				console.log(data)
				Employee.update(data,
					{
						where:
							{ emp_id: req.params.id }
					}
				).then(() => {
					res.statusCode = 200;
					res.send(resp.dataInserted);
				});
			}).catch(resp.phantomError); // load the index.ejs file
		} else {
			res.statusCode = 401;
			res.send(resp.accessApiVioaltion);
		}

	});



	app.post('/create/employee/', function (req, res) {
		//console.log(req.headers.authtoken);
		//console.log(req.sessionID);
		res.header('Access-Control-Allow-Credentials', true);
		var msg;
		if (req.isAuthenticated()) {
			msg = resp.dataIncomplete;
			res.statusCode = 400;
			data = req.body;
			err=0;
			if (Object.keys(data).length === 0 && data.constructor === Object) {
				msg = resp.insuficientData;
				err=1;
			}
			if (!("name" in data) || data.name.length < 3 || !(/^[a-z A-Z]*$/i.test(data.name))) {
				msg.description = "Please enter a valid name.";
				err=1;
			}
			if (!("emp_id" in data) || data.emp_id.length < 3 || !(/\w+/g.test(data.emp_id))) {
				msg.description = "Please enter a valid ID for employee.";
				err=1;
			}
			if (!("emp_type" in data) || data.emp_type.length < 3 || !(/^[a-z A-Z]*$/i.test(data.emp_type))) {
				msg.description = "Please enter a valid Type of employee.";
				err=1;

			}
			if (!("phone" in data) || data.phone.length < 3) {
				msg.description = "Please enter a valid Phone number of employee.";
				err=1;

			}
			if (!("email" in data) || data.email.length < 3 || !(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(data.email))) {
				msg.description = "Please enter a valid email number of employee.";
				err=1;
			}
			if (!("status" in data)) {
				data.status = "deployable";
			}
			if(err==1){
				res.send(msg);
			}else{
				Employee.create(data).then((sqlMsg) => {
					console.log(sqlMsg);
					msg = resp.dataInserted;
					res.statusCode = 200;
					res.send(msg);
				}).catch(function (err) {
					msg = resp.dataAlreadyExists;
					msg.description = err.original.sqlMessage;
					res.send(msg);
				});
			}
			

			//Employee.create(data).then();

		} else {
			//res.statusCode=401;
			msg = resp.accessApiVioaltion;
			res.send(msg);
			//res.end();
		}
		if (msg.code != "1008") {
			res.statusCode = 401;
		}
		//res.send(msg);
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

function SkillValidator(obj) {
	flag = true;
	obj.forEach(element => {
		if (Object.keys(element).length != 3)
			flag = false;
		if (!element.skill)
			flag = false;
		if (!element.level)
			flag = false;
		if (!element.version)
			flag = false;
	});
	return flag;
}