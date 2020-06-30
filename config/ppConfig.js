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





module.exports = passport