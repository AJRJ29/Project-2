// require express
const express = require('express');
// import router
const router = express.Router();
// import db
const db = require('../models')
// import middleware
const flash = require('flash');

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
            res.redirect('/auth/register')
        }
    }).cath(function(err) {
        console.log(`Error found. \nMessage: ${error.message}. \nPlease review - ${err}`);
        req.flash('error', err.message);
        res.redirect('/auth/register')
    })
})

// login get route
router.get('/login', function(req, res) {
    res.render('auth/login');
})
// login post route

module.exports = router