const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../models');

passport.serializeUser(function(user, callback) {
    callback(null, user.id);
}) 

passport.deserializeUser(function(id, callback) {
    db.user.findByPK(id).then(function(user) {
        callback(null, user)
    }).catch(callback);
})


passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'passsWord'
},  function(email, password, callback) {
    db.user.findOne({ where: { email }}).then(function(user) {
        if (!user || !user.validPassword(password)) {
            callback(null, false);
        } else {
            callback(null, user);
        }
    }).cath(callback);
}));


module.exports = passport