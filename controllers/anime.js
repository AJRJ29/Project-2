const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios');

router.get('/', (req, res) => {
    let name = req.query.name
    let animeUrl = `https://api.jikan.moe/v3/search/anime?q=${(name)}&page=1$`;
    axios.get(animeUrl).then(function(apiResponse) {
      var anime = apiResponse.data.results;
      res.render('anime/search', {anime})
    })
})

router.post('/', function(req, res) {
    db.anime.findOrCreate({
        where: {
            name: req.body.name,
            userId: req.user.dataValues.id
        }
    }).then(function() {
        res.redirect('/profile')
    })
})

router.get('/:name', (req, res) => {
    let name = req.params.name
    var animeUrl = `https://api.jikan.moe/v3/search/anime?q=${(name)}&page=1$`;
    axios.get(animeUrl).then(function(apiResponse) {
      var anime = apiResponse.data.results;
      res.render('anime/anime', {anime})
    })
})

router.delete('/:name', function(req, res) {
    db.anime.destroy({
      where: {
        name: req.params.name,
        userId: req.user.dataValues.id
      }
    })
    .then(function() {
        res.redirect('/profile')
    })
})

router.post('/:name/comments', function(req, res) {
    db.comment.create({
        name: req.body.name,
        conetent: req.body.content,
        animeId: req.params.id
    })
    .then(function() {
        res.redirect(`/anime/${req.params.name}`)
    })
    .catch(function(error) {
        console.log(error)
        res.status(400).render('main/404')
    })
})
  
module.exports = router









