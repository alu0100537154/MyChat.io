var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../models/user');
var configAuth = require('./auth');

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
    console.log('Inicializamos Passport.js')
    passport.use(new GoogleStrategy(
        {
            clientID        : configAuth.googleAuth.clientID,
            clientSecret    : configAuth.googleAuth.clientSecret,
            callbackURL      : configAuth.googleAuth.callbackURL,
            passReqToCallback : true 
        },
        function(req, token, refreshToken, profile, done){
            process.nextTick(function(){
                if (!req.user) {
                    User.findOne({ 'google.id' : profile.id }, function(err, user) {
                        user.google.token = undefined;
                        console.log('Buscamos al usuario en la base de datos MongoDB');
                        if (err){
                            console.log('ERROR!!!');
                            return done(err);
                        }

                        /*if(user.google.token)
                        {
                            console.log('Ese usuario ya esta dentro del chat');
                            return done(err);
                        }else */
                        if (user) {
                            if (!user.google.token) {
                                console.log('El usuario ya existe pero no tiene token de acceso');
                                console.log('Se los añadimos');
                                console.log(token);
                                console.log(profile.displayName);
                                user.google.token = token;
                                user.google.name  = profile.displayName;
                                user.google.email = (profile.emails[0].value || '').toLowerCase(); // pull the first email

                                user.save(function(err) {
                                    if (err)
                                        return done(err);
                                        
                                    return done(null, user);
                                });
                            } 
                        } else {
                            console.log('Es un nuevo usuario, asi que lo añadimos a la base de datos');
                            var newUser = new User();
                            console.log('Se los añadimos');
                            console.log(profile.id);
                            console.log(token);
                            console.log(profile.displayName);

                            newUser.google.id    = profile.id;
                            newUser.google.token = token;
                            newUser.google.name  = profile.displayName;
                            newUser.google.email = (profile.emails[0].value || '').toLowerCase(); // pull the first email

                            newUser.save(function(err) {
                                if (err)
                                    return done(err);
                                    
                                return done(null, newUser);
                            });
                        }
                    });
                } else {
                    console.log('El usuario ya existe y esta logueado en la base de datos');
                    // user already exists and is logged in, we have to link accounts
                    var user = req.user; // pull the user out of the session

                    user.google.id    = profile.id;
                    user.google.token = token;
                    user.google.name  = profile.displayName;
                    user.google.email = (profile.emails[0].value || '').toLowerCase(); // pull the first email

                    user.save(function(err) {
                        if (err)
                            return done(err);
                            
                        return done(null, user);
                    });
                }
            });
        }));
}