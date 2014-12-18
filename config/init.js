//var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../models/user');
//var configAuth = require('./auth');
var oauth = ('./passport_oauth.js')

module.exports = function(passport) {
    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
    
    oauth(passport);
}