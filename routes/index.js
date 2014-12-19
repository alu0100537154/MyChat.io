var express = require('express');
var router = express.Router();
var http = require('http').Server();
var io = require('socket.io')(http);
var bundle = require('socket.io-bundle');
var ioPassport = require('socket.io-passport');

var user_tmp;
var userHash = {};

module.exports = function(passport){

	/* GET home page. */
	router.get('/', function(req, res) {
	  res.render('index.ejs', { title: 'MyChat.io' });
	});

    //io.set('authorization', auth);

	/*io.use(bundle.cookieParser());
	io.use(bundle.session({secret: 'my_secret'}));
	io.use(ioPassport.initialize());
	io.use(ioPassport.session());*/
	io.use(function(socket, next){
		session(socket.request, {}, next);
	});

	
	io.on('connection', function(socket){
	var userID = socket.request.session.passport.user;
        console.log('\n');
        console.log('Entramos en el socket');
        console.log('\n');
        /*console.log('Entramos en el socket');
        console.log('Datos del cliente\n');
        console.log(user_tmp);
        console.log('\n');
        socket.username = user_tmp;
        console.log('\n');
        console.log('Variable Socket\n');
        console.log(socket);
        console.log('\n');
        userHash[socket.username] = socket;
        io.emit('add user', user_tmp);
        io.emit('usernames', Object.keys(userHash));*/
	});

	router.get('/profile', isLoggedIn, function(req, res) {
		res.render('profile.ejs', {
			user : req.user
		});
		/*console.log('\n');
		console.log('Nombre del usuario');
		console.log(req.user.google.name);
		console.log(req.user.google.email);
		console.log('\n');
		user_tmp = req.user.google.name;
		console.log('Variable user_tmp = ' + user_tmp);
		console.log('\n');*/
	});

	router.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

	router.get('/auth/google/callback',
		passport.authenticate('google', {
			successRedirect : '/profile',
			failureRedirect : '/'
		})
	);

	router.get('/unlink/google', isLoggedIn, function(req, res) {
		var user = req.user;
		console.log('El usuario ' + user.google.name + ' ha salido del sistema');
		user.google.token = undefined;
		user.save(function(err) {
			res.redirect('/');
		});
		io.emit('user disconnect');
	});

	function isLoggedIn(req, res, next) {
		if (req.isAuthenticated())
			return next();

		res.redirect('/');
	}

	//============================================================================
	return router;
}
