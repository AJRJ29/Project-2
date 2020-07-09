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

module.exports = router
