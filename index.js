// Require NPM libraries
require('dotenv').config();
const Express = require('express');
const methodOverride = require('method-override');
const ejsLayouts = require('express-ejs-layouts');
const helmet = require('helmet');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('./config/ppConfig');
const db = require('./models')
const axios = require('axios'); 
const multer = require('multer');
const cloudinary = require('cloudinary');

// want add a link to our customer middleware for isLoggedIn
const SequelizeStore = require('connect-session-sequelize')(session.Store)

//app setup
const app = Express();
const uploads = multer({dest: './uploads'})
app.use(Express.urlencoded({ extended: false}));
app.use(Express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(require('morgan')('dev'));
app.use(helmet());
app.use(methodOverride('_method'))
const isLoggedIn = require('./middleware/isLoggedIn')
// create new instance of class sequelize store
const sessionStore = new SequelizeStore({
    db: db.sequelize,
    expiration: 1000 * 60 * 30
})

app.use(session({
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: true
}))

sessionStore.sync();

// initialize passport and session info
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(function(req, res, next) {
    res.locals.alerts = req.flash();
    res.locals.currentUser = req.user;

    next();
});
// ROUTES
app.get('/', function(req, res) {
    let animeUrl = `https://api.jikan.moe/v3/top/anime/1/tv`;
    axios.get(animeUrl).then( function(apiResponse) {
        let anime = apiResponse.data.top;
        res.render('index', {anime});
    })
})

app.get('/profile', isLoggedIn, function(req, res) {
    db.anime.findAll({
        where: {
            userId: req.user.dataValues.id
        },
    })
    .then( function(anime) {
    res.render('profile', {anime});
    })
})

// include auth controller
app.use('/auth', require('./controllers/auth'));
app.use('/anime', require('./controllers/anime'));
app.use('/manga', require('./controllers/manga'));
app.use('/comment', require('./controllers/comment'));

// initialize app on port
app.listen(process.env.PORT || 3000, function() {
    console.log(`Listening to the smooth sweet sounds of port ${process.env.PORT} in the morning.`)
});
