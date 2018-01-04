// app/routes.js
module.exports = function (app, passport, ProjectMonthDetails) {
	var resp = require("../config/response.json");
	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	app.get('/projectmonthdetailslist', function (req, res) {
		if (req.isAuthenticated() || req.body.authToken == req.sessionID) {
			ProjectMonthDetails.findAll({ raw: true }).then((emp) => res.send(emp)); // load the index.ejs file
		} else {
			res.statusCode = 401;
			res.send(resp.accessApiVioaltion);
		}

	});

	app.get('/projectmonthdetails/:id', function (req, res) {
		if (req.isAuthenticated() || req.body.authToken == req.sessionID) {
			ProjectMonthDetails.findOne({ where: { emp_id: req.params.id }, raw: true }).then((emp) => res.send(emp)); // load the index.ejs file
		} else {
			res.statusCode = 401;
			res.send(resp.accessApiVioaltion);
		}

	});

	app.put('/projectmonthdetails/:id', function (req, res) {
		res.header('Access-Control-Allow-Credentials', true);
		var msg;
		if (req.isAuthenticated()) {
			err = resp.dataIncomplete;
			res.statusCode = 400;
			data = req.body;
			if (Object.keys(data).length === 0 && data.constructor === Object) {
				msg = resp.insuficientData;
			}
			if (!("month" in data) || data.name.length < 3) {
				err.description = "Please enter a valid name.";
				msg = err;
			}
			if (!("emp_project_id" in data) || data.emp_project_id.length < 3 || !(/\w+/g.test(data.emp_project_id))) {
				err.description = "Please enter a valid ID for employee.";
				msg = err;
			}
			if (!("id" in data) || data.id.length < 3 || !(/\w+/g.test(data.id))) {
				err.description = "Please enter a valid ID for employee.";
				msg = err;
			}
			if (!("ideal_hours" in data) || data.emp_type.length < 3) {
				err.description = "Please enter a valid Type of employee.";
				msg = err;
			}

			if (msg == null) {
				ProjectMonthDetails.findOne({ where: { emp_id: req.params.id }, raw: true }).then((emp) => {
					console.log(data)
					ProjectMonthDetails.update(data,
						{
							where:
								{ emp_id: req.params.id }
						}
					).then(() => {
						res.statusCode = 200;
						res.send(resp.dataInserted);
					});
				}).catch(resp.phantomError); // load the index.ejs file
			} else { res.send(msg); }

		} else {
			res.statusCode = 401;
			res.send(resp.accessApiVioaltion);
		}

	});



	app.post('/create/projectmonthdetails/', function (req, res) {
		//console.log(req.headers.authtoken);
		//console.log(req.sessionID);
		res.header('Access-Control-Allow-Credentials', true);
		if (req.isAuthenticated()) {
			err = resp.dataIncomplete;
			res.statusCode = 400;
			data = req.body;
			console.log(data.name.length);
			if (Object.keys(data).length === 0 && data.constructor === Object) {
				msg = resp.insuficientData;
			}
			if (!("month" in data) || data.name.length < 3) {
				err.description = "Please enter a valid name.";
				msg = err;
			}
			if (!("emp_project_id" in data) || data.emp_project_id.length < 3 || !(/\w+/g.test(data.emp_project_id))) {
				err.description = "Please enter a valid ID for employee.";
				msg = err;
			}
			if (!("id" in data) || data.id.length < 3 || !(/\w+/g.test(data.id))) {
				err.description = "Please enter a valid ID for employee.";
				msg = err;
			}
			if (!("ideal_hours" in data) || data.emp_type.length < 3) {
				err.description = "Please enter a valid Type of employee.";
				msg = err;
			}
			if (msg == null) {
				return ProjectMonthDetails.create(data).then(() => {
					res.statusCode = 200;
					res.send(resp.dataInserted);
				}).catch(function (err) {
					res.send(resp.dataAlreadyExists);
				});

			} else { res.send(msg); }


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

