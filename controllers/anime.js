const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios');

router.get('/:name', (req, res) => {
    // let name = req.body.name
    let name = req.params.name
    var animeUrl = `https://api.jikan.moe/v3/search/anime?q=${(name).toLowerCase()}&page=1$`;
    // Use request to call the API
    axios.get(animeUrl).then(function(apiResponse) {
      var anime = apiResponse.results;
      console.log(anime)
      res.render('anime', {anime})
    })
})

//get route from the home page to search for an anime
    //use axios to grab information from a form to for a query string for the API 
    //redirect information on the home page

//get route to anime details
    //use axios to grab informatian from a form
    //render information on anime ejs

//post route to add anime to your bookmark
    //use find or create to add anime to your bookmark
    //then redirect to profile 

//post route to add a comment
    //use create to make a comment the redirect it to anime ejs

//delete route to delete an anime in your bookmark
    // use destroy to delete anime you dont like in your profile
    //redirect back to profile


//initialize router
module.exports = router








