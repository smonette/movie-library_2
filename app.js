var express = require('express'),
    db = require('./models/index.js'),
    bodyParser = require('body-parser'),
    app = express();

var http = require('http').createServer(app);

var request = require('request');

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}) );



// create a movie
app.post('/rest-api/movies', function(req,res){
  var title = req.body.title;
  var review = req.body.review;
  var image = req.body.image;
  var rating = req.body.rating;

  db.movie.createNewMovie(title, review, image, rating,
    function(err){
      console.log('NOO');
    },
    function(success){
      res.redirect('/');
    }
  );
})

// Show all movies in JSON (accessed at /rest-api/movies)
app.get('/rest-api/movies', function(req, res) {
  db.movie.findAll()
  .then( function(movies){
    res.json({ movies: movies }) 
  })
});

// Show all movies in JSON (accessed at http://localhost:4000/rest-api/movies/:movie_id)
app.get('/rest-api/movies/:movie_id', function(req, res) {
  db.movie.findById(req.params.movie_id)
  .then( function(movie){
    res.json({ movie: movie }) 
  })
});

// BUILD THE VIEWS
app.get('/', function(req,res){
  res.render("index");
}); 




http.listen(process.env.PORT || 4000, function(){
  console.log("Success! View this page on localhost:4000");
});

module.exports = app;
