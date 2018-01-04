// app/routes.js
module.exports = function (app, passport, Locations) {
	var resp = require("../config/response.json");
	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	app.get('/locationlist', function (req, res) {
		if (req.isAuthenticated() || req.body.authToken == req.sessionID) {
			Locations.findAll({ raw: true }).then((emp) => res.send(emp)); // load the index.ejs file
		} else {
			res.statusCode = 401;
			res.send(resp.accessApiVioaltion);
		}

	});

	app.get('/location/:id', function (req, res) {
		if (req.isAuthenticated() || req.body.authToken == req.sessionID) {
			Locations.findOne({ where: { id: req.params.id }, raw: true }).then((emp) => res.send(emp)); // load the index.ejs file
		} else {
			res.statusCode = 401;
			res.send(resp.accessApiVioaltion);
		}

	});

	app.put('/location/:id', function (req, res) {
		res.header('Access-Control-Allow-Credentials', true);
		var msg;
		if (req.isAuthenticated()) {
			err = resp.dataIncomplete;
			res.statusCode = 400;
			data = req.body;
			if (Object.keys(data).length === 0 && data.constructor === Object) {
				msg = resp.insuficientData;
			}
			if (!("location" in data) || data.location.length < 3 || !(/^[a-zA-Z]*$/i.test(data.location))) {
				err.description = "Please enter a valid name.";
				msg = err;
			}
			if (!("id" in data)) {
				err.description = "Please enter a valid ID for Location.";
				msg = err;
			}
			if (msg == null) {
				Locations.findOne({ where: { id: req.params.id }, raw: true }).then((emp) => {

					Locations.update(data,
						{
							where:
								{ id: req.params.id }
						}
					).then(() => {
						res.statusCode = 200;
						res.send(resp.dataInserted);
					});
				}).catch(function (err) {
					msg = resp.phantomError;
					res.send(msg);
				});
			} else {
				res.send(msg)
			}
			// load the index.ejs file
		} else {
			res.statusCode = 401;
			res.send(resp.accessApiVioaltion);
		}

	});





	app.post('/create/location/', function (req, res) {
		//console.log(req.headers.authtoken);
		//console.log(req.sessionID);
		res.header('Access-Control-Allow-Credentials', true);
		var msg;
		if (req.isAuthenticated()) {
			err = resp.dataIncomplete;
			res.statusCode = 400;
			data = req.body;

			if (Object.keys(data).length === 0 && data.constructor === Object) {
				msg = resp.insuficientData;
			}
			if (!("location" in data) || data.location.length < 3 || !(/^[a-zA-Z]*$/i.test(data.location))) {
				err.description = "Please enter a valid name.";
				msg = err;
			}

			if (msg == null) {
				Locations.create(data).then(() => {
					res.statusCode = 200;
					res.send(resp.dataInserted);
				}).catch(function (err) {
					res.send(resp.phantomError);
				});

			} else {
				res.send(msg)
			}
			//Location.create(data).then();

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

