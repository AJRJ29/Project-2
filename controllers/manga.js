const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios');

router.get('/', (req, res) => {
    let name = req.query.name
    if(name) {
        var mangaUrl = `https://api.jikan.moe/v3/search/manga?q=${(name)}&page=1$`;
        axios.get(mangaUrl).then(function(apiResponse) {
        var manga = apiResponse.data.results;
        res.render('manga/manga', {manga})
        }).catch(function(error) {
      console.log(error)
    })
    } else {
        let manga = []
        res.render('manga/manga', {manga})
    }
})

router.post('/', function(req, res) {
    db.manga.findOrCreate({
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
    var mangaUrl = `https://api.jikan.moe/v3/search/manga?q=${(name)}&page=1$`;
    axios.get(mangaUrl).then(function(apiResponse) {
        var manga = apiResponse.data.results;
        res.render('manga/show', {manga})
    }).catch(function(error) {
    console.log(error)
    })
})

router.delete('/:name', function(req, res) {
    db.manga.destroy({
      where: {
        name: req.params.name,
        userId: req.user.dataValues.id
      }
    })
    .then(function() {
        res.redirect('/profile')
    })
})

module.exports = router
