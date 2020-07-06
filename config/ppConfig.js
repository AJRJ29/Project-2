const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../models');

passport.serializeUser(function(user, callback) {
    callback(null, user.id);
}) 

passport.deserializeUser(function(id, callback) {
    console.log(id)
    db.user.findByPk(id).then(function(user) {
        console.log(user)
        callback(null, user);
    }).catch(callback);
})

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},  function(email, password, callback) {
    db.user.findOne({ where: { email }}).then(function(user) {
        if (!user || !user.validPassword(password)) {
            callback(null, false);
        } else {
            callback(null, user);
        }
    }).catch(callback);
}));


module.exports = passport