const express = require('express');
const router = express.Router();
const db = require('../models');
const flash = require('connect-flash');
const passport = require('../config/ppConfig');
// register get route 

router.get('/register', function(req, res) {
    res.render('auth/register');
})
// signup post route 
router.post('/register', function(req, res) {
    db.user.findOrCreate({
        where: {
            email: req.body.email
        }, defaults: {
            name: req.body.name,
            password: req.body.password
        }
    })
    .then(function([user, created]) {
        // if user was created 
        if (created) {
            console.log("User Created 🏆");
            passport.authenticate('local', {
                successRedirect: '/profile',
                successFlash: 'thanks for signing up'
            })(req, res);
        } else {
            console.log("User email already exist! 🚁");
            req.flash('error', 'Error: email already exist for user. Try again');
            res.redirect('/auth/register')
        }
    }).catch(function(err) {
        console.log(`Error found. \nMessage: ${error.message}. \nPlease review - ${err}`);
        req.flash('error', err.message);
        res.redirect('/auth/register')
    })
})

// login get route
router.get('/login', function(req, res) {
    res.render('auth/login');
});
// login post route
router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(error, user, info) {
        if (!user) {
            req.flash('error', 'Invalid username or password');
                return res.redirect('/auth/login');
        }
        if (error) {
            return next(error);
        }
        req.login(user, function(error) {
            // if errow move to error
            if (error) next(error)
            // if success flash success message 
            req.flash('success', 'You are validated and logged in.');
            // if success save session and redirect user
            req.session.save(function() {
                return res.redirect('/profile')
            })
        })
    })(req, res, next);
})

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router