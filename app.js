var express = require('express'),
    db = require('./models/index.js'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    flash = require('connect-flash'),
    app = express();

var http = require('http').createServer(app);

var router = express.Router(); 

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}) );

app.use(cookieParser('secret'));
app.use(session({cookie: { maxAge: 60000 }}));

app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});




app.use('/api', router);

router.use(function(req, res, next) {
  // do logging
  console.log('Something is happening.');
  next(); // make sure we go to the next routes and don't stop here
});


router.route('/movies')
  // create a movie (accessed at POST http://localhost:4000/api/movies)
  .post(function(req,res){
    db.movie.createNewMovie(req.body.title, req.body.review,req.body.image, req.body.rating,
      function(err){
        console.log('NOO');
      },
      function(success){
        res.redirect('/');
      }
    );
  })

 .get(function(req, res) {
    db.movie.findAll()
    .then( function(movies){
      res.json({ movies: movies }) 
    })
  });


router.route('/movies/:movie_id')
 .get(function(req, res) {
    db.movie.findById(req.params.movie_id)
    .then( function(movie){
      res.json({ movie: movie }) 
    })
  });

router.get('/', function(req,res){
  res.json({ message: 'hooray! welcome to our api!' });   
});





http.listen(process.env.PORT || 4000, function(){
  console.log("Success! View this page on localhost:4000");
});

module.exports = app;
