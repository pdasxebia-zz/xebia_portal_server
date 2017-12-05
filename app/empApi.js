// app/routes.js
module.exports = function(app, passport,Employee) {
	var resp = require("../config/response.json");
	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	app.get('/employeelist', function(req, res) {
		if (req.isAuthenticated()){
			Employee.findAll({raw: true}).then((emp)=>res.send(emp)); // load the index.ejs file
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
