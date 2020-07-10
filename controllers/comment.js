const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios');


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

router.get('/manga/:id', function(req, res) {
    db.manga.findOne({
        where: {
            id: req.params.id
        },
        include:[db.comment]
    })
    .then(function(manga) {
        res.render('manga/comment', {manga})
    })
})

router.post('/:id', function(req, res) {
    db.comment.create({
        name: req.body.name,
        content: req.body.content,
        animeId: req.params.id,
    })
    .then(function(comment) {
        res.redirect(`/comment/${comment.animeId}`)
    })
})

router.post('/manga/:id', function(req, res) {
    db.comment.create({
        name: req.body.name,
        content: req.body.content,
        mangaId: req.params.id,
    })
    .then(function(comment) {
        res.redirect(`/comment/manga/${comment.mangaId}`)
    })
})



module.exports = router