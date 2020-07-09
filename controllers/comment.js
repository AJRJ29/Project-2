const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios');
const multer = require('multer');
const cloudinary = require('cloudinary');
const uploads = multer({dest: './uploads'})

router.get('/:id', function(req, res) {
    db.anime.findOne({
        where: {
            id: req.params.id
        },
        include:[db.comment]
    })
    .then(function(anime) {
        res.render('anime/comment', {anime})
    })
})

router.post('/:id', function(req, res) {
    db.comment.create({
        name: req.body.name,
        content: req.body.content,
        animeId: req.params.id
    })
    .then(function(comment) {
        res.redirect(`/comment/${comment.animeId}`)
    })
})



module.exports = router