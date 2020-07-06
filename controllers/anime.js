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

// router.get('/:name', function(req, res) {
//     let animeUrl = `https://api.jikan.moe/v3/search/anime?q=${(req.params.name)}&page=1$`;
//     db.anime.findOne({
//       where: { name: req.params.name }
//     })
//     .then(function(anime) {
//       if (!anime) throw Error()
//       console.log(anime)
//       db.comment.findAll({
//         where: { animeId: anime.name }
//       })
//       .then(axios.get(animeUrl).then(function(apiResponse, comments) {
//         let anime = apiResponse.data.results;
//         res.render('anime/anime', { anime, comments })
//       }))
//     })
//     .catch(function(error) {
//       console.log(error)
//     })
// })

router.post('/comments', function() {
    db.comment.create({
        name: req.body.name,
        content: req.body.content,
        animeId: req.anime.datavalues.id
    })
    .then(function() {
        res.redirect('/anime/comments')
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









