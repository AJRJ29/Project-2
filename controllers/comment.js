const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios');



router.get('/comments', function(req, res) {
    db.comment.findAll({
        where: { 
            animeId: req.anime.dataValues.id 
        }
    })
    .then(function(comment) {
        res.render('anime/comment', {comment})
    })
})