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

router.post('/', uploads.single('inputFile'), function(req, res) {
    console.log("Post Route hit");

    //get input file from user
    let file = req.file.path;
  
    //upload file to cloudinary
    cloudinary.uploader.upload(file, function(result) {
      // return a render page w/ cloudinary link to formatted image
      let cloudID = result.public_id
      let cloudLink = `https://res.cloudinary.com/genereal-assembly/image/upload/e_blue:0/a_0/v1593119917/${cloudID}.png`;
      res.render('anime/comment', { image: cloudLink });
    }).catch(function(error) {
        console.log(error)
    })
})


module.exports = router