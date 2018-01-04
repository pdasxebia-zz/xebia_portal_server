// app/routes.js
module.exports = function (app, passport, Employee, EmpSalary) {
	var resp = require("../config/response.json");
	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	app.get('/empsalarylist', function (req, res) {
		if (req.isAuthenticated() || req.body.authToken == req.sessionID) {
			EmpSalary.findAll({ raw: true }).then((emp) => res.send(emp)); // load the index.ejs file
		} else {
			res.statusCode = 401;
			res.send(resp.accessApiVioaltion);
		}

	});

	app.get('/empsalary/:id', function (req, res) {
		if (req.isAuthenticated() || req.body.authToken == req.sessionID) {
			EmpSalary.findOne({ where: { emp_id: req.params.id }, raw: true }).then((emp) => res.send(emp)); // load the index.ejs file
		} else {
			res.statusCode = 401;
			res.send(resp.accessApiVioaltion);
		}

	});

	app.put('/empsalary/:id', function (req, res) {
		res.header('Access-Control-Allow-Credentials', true);
		var msg;
		if (req.isAuthenticated()) {
			err = resp.dataIncomplete;
			res.statusCode = 400;
			data = req.body;
			if (Object.keys(data).length === 0 && data.constructor === Object) {
				res.send(resp.insuficientData);
			}
			if (!("salary" in data) || data.salary.length < 3) {
				err.description = "Please enter a valid name.";
				msg = err;
			}
			if (!("emp_id" in data)) {
				err.description = "Please enter a valid ID for employee.";
				msg = err;
			}
			if (!("monthly_salary" in data) || data.monthly_salary.length < 3) {
				err.description = "Please enter a valid Type of employee.";
				msg = err;
			}
			if (!("eff_date_ch" in data) || data.eff_date_ch.length < 3) {
				err.description = "Please enter a valid Phone number of employee.";
				msg = err;
			}

			EmpSalary.findOne({ where: { id: req.params.id }, raw: true }).then((emp) => {

				EmpSalary.update(data,
					{
						where:
							{ id: req.params.id }
					}
				).then(() => {
					res.statusCode = 200;
					res.send(resp.dataInserted);
				}).catch(function (err) {
					msg = resp.phantomError;
					msg.description = err;
					res.send(msg);
				});
			}).catch(function (err) {
				msg = resp.phantomError;
				msg.description = err;
				res.send(msg);
			});
		} else {
			res.statusCode = 401;
			res.send(resp.accessApiVioaltion);
		}

	});



	app.post('/create/empsalary/', function (req, res) {
		//console.log(req.headers.authtoken);
		//console.log(req.sessionID);
		res.header('Access-Control-Allow-Credentials', true);
		var msg;
		if (req.isAuthenticated()) {
			err = resp.dataIncomplete;
			res.statusCode = 400;
			data = req.body;
			//console.log(data.name.length);
			if (Object.keys(data).length === 0 && data.constructor === Object) {
				msg = resp.insuficientData;
			}
			if (!("salary" in data) || data.salary.length < 3) {
				err.description = "Please enter a valid name.";
				msg = err;
			}
			if (!("emp_id" in data)) {
				err.description = "Please enter a valid ID for employee.";
				msg = err;
			}
			if (!("monthly_salary" in data) || data.monthly_salary.length < 3) {
				err.description = "Please enter a valid Type of employee.";
				msg = err;
			}
			if (!("eff_date_ch" in data) || data.eff_date_ch.length < 3) {
				err.description = "Please enter a valid Phone number of employee.";
				msg = err;
			}
			if (msg == null) {
				EmpSalary.sync().then(() => {
					// Table created
					return EmpSalary.create(data).then(() => {
						res.statusCode = 200;
						res.send(resp.dataInserted);
					}).catch(function (err) {
						msg = resp.dataAlreadyExists;
						msg.description = err.original.sqlMessage;
						res.send(msg);
					});
				});
			} else {
				res.send(msg);
			}

			//Employee.create(data).then();

		} else {
			res.statusCode = 401;
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

