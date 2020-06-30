const express = require('express');
const router = express.Router();
const db = require('../models');
const flash = require('flash');
const passport = require('../config/ppConfig');
//TODO: update require below to passport config file path
// register get toute 
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
             // authenticate user and start authorization process
            console.log("User Created 🏆");
            res.redirect('/');
        } else {
            console.log("User email already exist! 🚁");
            req.flash('error', 'Error: email already exist for user. Try again');
            res.redirect('auth/register')
        }
    }).cath(function(err) {
        console.log(`Error found. \nMessage: ${error.message}. \nPlease review - ${err}`);
        req.flash('error', err.message);
        res.redirect('auth/register')
    })
})

// login get route
router.get('/login', function(req, res) {
    res.render('auth/login');
});
// login post route
router.get('/login', function(req, res, next) {
    passport.authenticate('local', function(error, user, info) {
        if (!user) {
            req.flash('error', 'Invalid username or password');
            req.session.save(function() {
                return res.redirect('auth/login');
            });
        }
        if (error) {
            return next(error);
        }
        req.login(function(user, error) {
            // if errow move to error
            if (error) next(error)
            // if success flash success message 
            req.flash('success', 'You are validated and logged in.');
            // if success save session and redirect user
            req.session.save(function() {
                return res.redirect('/')
            })
        })
    })
    res.redirect('auth/login');
})

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login',
    successFlash: 'Welcome to out app!',
    failureFlash: 'Invalid username or password.'
}))

module.exports = router