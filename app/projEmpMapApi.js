// app/routes.js
module.exports = function (app, passport, Employee, Project, EmpProjectMap) {
	var resp = require("../config/response.json");
	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	app.get('/empprojmaplist', function (req, res) {
		if (req.isAuthenticated() || req.body.authToken == req.sessionID) {
			EmpProjectMap.findAll({ raw: true }).then((proj) => res.send(proj)); // load the index.ejs file
		} else {
			res.statusCode = 401;
			res.send(resp.accessApiVioaltion);
		}

	});

	app.get('/empprojmap/:id', function (req, res) {
		if (req.isAuthenticated() || req.body.authToken == req.sessionID) {
			EmpProjectMap.findOne({ where: { id: req.params.id }, raw: true }).then((proj) => res.send(proj)); // load the index.ejs file
		} else {
			res.statusCode = 401;
			res.send(resp.accessApiVioaltion);
		}

	});

	app.get('/employees/:id/projects', function (req, res) {
		if (req.isAuthenticated() || req.body.authToken == req.sessionID) {
			EmpProjectMap.find({ where: { emp_id: req.params.id }, raw: true }).then((proj) => res.send(proj)); // load the index.ejs file
		} else {
			res.statusCode = 401;
			res.send(resp.accessApiVioaltion);
		}

	});
	app.get('/employees/:id/projects/:project_id', function (req, res) {
		if (req.isAuthenticated() || req.body.authToken == req.sessionID) {
			EmpProjectMap.findOne({ where: { emp_id: req.params.id }, raw: true }).then((proj) => {
				EmpProjectMap.find({
					where:
						{
							end_date:
								{ gt: proj.start_date }
						}, raw: true
				}).then((team) => res.send(team));
			}); // load the index.ejs file
		} else {
			res.statusCode = 401;
			res.send(resp.accessApiVioaltion);
		}

	});
	app.put('/empprojmap/:id', function (req, res) {
		res.header('Access-Control-Allow-Credentials', true);
		var msg;
		if (req.isAuthenticated()) {
			err = resp.dataIncomplete;
			res.statusCode = 400;
			data = req.body;
			if (Object.keys(data).length === 0 && data.constructor === Object) {
				msg = resp.insuficientData;
			}

			if (!("id" in data)) {
				err.description = "Please enter a valid ID for ID.";
				msg = err;
			}
			if (!("rate" in data) || !(/^[0-9]*$/i.test(data.rate))) {
				err.description = "Please enter a valid rate.";
				msg = err;
			}
			if (!("allocation" in data)) {
				err.description = "Please enter a valid ID for allocation.";
				msg = err;
			}
			if (!("start_date" in data)) {
				err.description = "Please enter a valid ID for start_date.";
				msg = err;
			}
			if (!("end_date" in data)) {
				err.description = "Please enter a valid ID for end_date.";
				msg = err;
			}
			if (!("emp_id" in data)) {
				err.description = "Please enter a valid ID for emp_id.";
				msg = err;
			}
			if (!("project_id" in data)) {
				err.description = "Please enter a valid ID for project_id.";
				msg = err;
			}
			if (msg == null) {
				EmpProjectMap.findOne({ where: { id: req.params.id }, raw: true }).then((proj) => {

					EmpProjectMap.update(data,
						{
							where:
								{ id: req.params.id }
						}
					).then(() => {
						res.statusCode = 200;
						res.send(resp.dataInserted);
					});
				}).catch(resp.phantomError);
			} else { res.send(msg) }

		} else {
			res.statusCode = 401;
			res.send(resp.accessApiVioaltion);
		}

	});

	app.post('/create/empprojmap/', function (req, res) {
		var msg;
		res.header('Access-Control-Allow-Credentials', true);
		if (req.isAuthenticated()) {
			err = resp.dataIncomplete;
			res.statusCode = 400;
			data = req.body;

			if (Object.keys(data).length === 0 && data.constructor === Object) {
				msg = resp.insuficientData;
			}
			if (!("rate" in data) || !(/^[0-9]*$/i.test(data.rate))) {
				err.description = "Please enter a valid rate.";
				msg = err;
			}
			if (!("allocation" in data)) {
				err.description = "Please enter a valid ID for allocation.";
				msg = err;
			}
			if (!("start_date" in data)) {
				err.description = "Please enter a valid ID for start_date.";
				msg = err;
			}
			if (!("end_date" in data)) {
				err.description = "Please enter a valid ID for end_date.";
				msg = err;
			}
			if (!("emp_id" in data)) {
				err.description = "Please enter a valid ID for emp_id.";
				msg = err;
			}
			if (!("project_id" in data)) {
				err.description = "Please enter a valid ID for project_id.";
				msg = err;
			}
			if (msg == null) {
				return EmpProjectMap.create(data).then(() => {
					res.statusCode = 200;
					res.send(resp.dataInserted);
				}).catch(function (err) {
					//res.send(resp.dataAlreadyExists);
					res.send(err);
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

