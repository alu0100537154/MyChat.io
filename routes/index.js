var express = require('express');
var router = express.Router();

module.exports = function(passport){

	/* GET home page. */
	router.get('/', function(req, res) {
	  res.render('index.ejs', { title: 'MyChat.io' });
	});

	router.get('/profile', isLoggedIn, function(req, res) {
		res.render('profile.ejs', {
			user : req.user
		});
	});

	router.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	/*router.get('/login', function(req, res) {
		res.render('login.ejs', { message: req.flash('loginMessage') });
	});*/

	router.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

	router.get('/auth/google/callback',
		passport.authenticate('google', {
			successRedirect : '/profile',
			failureRedirect : '/'
		})
	);

	router.get('/connect/google', passport.authorize('google', { scope : ['profile', 'email'] }));

	router.get('/connect/google/callback',
		passport.authorize('google', {
			successRedirect : '/profile',
			failureRedirect : '/'
		})
	);

	router.get('/unlink/google', isLoggedIn, function(req, res) {
		var user = req.user;
		console.log('El usuario ' + user.google.name + ' ha salido del sistema');
		user.google.token = undefined;
		user.save(function(err) {
			res.redirect('/profile');
		});
	});

	function isLoggedIn(req, res, next) {
		if (req.isAuthenticated())
			return next();

		res.redirect('/');
	}

	//============================================================================
	return router;
}