const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios');

router.get('/', function(req, res) {
    db.anime.findAll().then(anime => {
      res.render('anime/search', {anime})
    })
});

router.get('/:name', (req, res) => {
    // let name = req.body.name
    let name = req.params.name
    var animeUrl = `https://api.jikan.moe/v3/search/anime?q=${(name).toLowerCase()}&page=1$`;
    // Use request to call the API
    axios.get(animeUrl).then(function(apiResponse) {
      var anime = apiResponse.data.results;
      res.render('anime/anime', {anime})
    })
})

router.post('/', function(req, res) {
    let name = req.body.name
    db.anime.findOrCreate({
        where: {
            name: name,
            userId: req.user.dataValues.id
        }
    }).then(function() {
        res.redirect('/profile')
    })
})

router.delete('/', function(req, res) {
    let name = req.body.name
    db.anime.destroy({
      where: {
        name: name,
        userId: req.user.dataValues.id
      }
    })
    .then(function() {
        res.redirect('/anime')
    })
})
  

//post route to add a comment
    //use create to make a comment the redirect it to anime ejs

//delete route to delete an anime in your bookmark
    // use destroy to delete anime you dont like in your profile
    //redirect back to profile


//initialize router
module.exports = router









