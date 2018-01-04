// app/routes.js
module.exports = function (app, passport, Project) {
	var resp = require("../config/response.json");
	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	app.get('/projectlist', function (req, res) {
		if (req.isAuthenticated() || req.body.authToken == req.sessionID) {
			Project.findAll({ raw: true }).then((proj) => res.send(proj)); // load the index.ejs file
		} else {
			res.statusCode = 401;
			res.send(resp.accessApiVioaltion);
		}

	});

	app.get('/project/:id', function (req, res) {
		if (req.isAuthenticated() || req.body.authToken == req.sessionID) {
			Project.findOne({ where: { id: req.params.id }, raw: true }).then((proj) => res.send(proj)); // load the index.ejs file
		} else {
			res.statusCode = 401;
			res.send(resp.accessApiVioaltion);
		}

	});

	app.put('/project/:id', function (req, res) {
		var msg;
		res.header('Access-Control-Allow-Credentials', true);
		if (req.isAuthenticated()) {
			err = resp.dataIncomplete;
			res.statusCode = 400;
			data = req.body;
			if (Object.keys(data).length === 0 && data.constructor === Object) {
				msg = resp.insuficientData;
			}
			if (!("name" in data) || data.name.length < 3 || !(/^[a-z A-Z]*$/i.test(data.name))) {
				err.description = "Please enter a valid name.";
				msg = err;
			}
			if (!("id" in data)) {
				err.description = "Please enter a valid ID for Project.";
				msg = err;
			}
			if (msg == null) {
				Project.findOne({ where: { id: req.params.id }, raw: true }).then((proj) => {
					console.log(data)
					Project.update(data,
						{
							where:
								{ id: req.params.id }
						}
					).then(() => {
						res.statusCode = 200;
						res.send(resp.dataInserted);
					});
				}).catch(resp.phantomError); // load the index.ejs file
			} else { res.send(msg) }

		} else {
			res.statusCode = 401;
			res.send(resp.accessApiVioaltion);
		}

	});

	app.post('/create/project/', function (req, res) {
		var msg;
		res.header('Access-Control-Allow-Credentials', true);
		if (req.isAuthenticated()) {
			err = resp.dataIncomplete;
			res.statusCode = 400;
			data = req.body;
			console.log(data.name.length);
			if (Object.keys(data).length === 0 && data.constructor === Object) {
				msg = resp.insuficientData;
			}
			if (!("name" in data) || data.name.length < 3 || !(/^[a-z A-Z]*$/i.test(data.name))) {
				err.description = "Please enter a valid name.";
				msg = err;
			}
			if (!("manager" in data) || data.manager.length < 3 || !(/^[a-z A-Z]*$/i.test(data.manager))) {
				err.description = "Please enter a valid name.";
				msg = err;
			}
			if (!("location_id" in data) || !(/^[0-9]*$/i.test(data.location_id))) {
				err.description = "Please enter a valid name.";
				msg = err;
			}
			if (!("account_id" in data) || !(/^[0-9]*$/i.test(data.account_id))) {
				err.description = "Please enter a valid name.";
				msg = err;
			}
			if (msg == null) {
				return Project.create(data).then(() => {
					res.statusCode = 200;
					res.send(resp.dataInserted);
				}).catch(function (err) {
					res.send(resp.dataAlreadyExists);
				});
			} else { res.send(err); }


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

