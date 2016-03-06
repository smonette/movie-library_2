// CALL API FOR MOVIES
var apiURL = "http://localhost:4000/rest-api/movies/";

var movieRequest = new XMLHttpRequest();
movieRequest.open("GET", apiURL, false);
movieRequest.send();

var MOVIES = JSON.parse(movieRequest.responseText).movies;


// CREATE REVIEW GRID
// Add Review Tiles
var AddReview = React.createClass({
  render: function() {
    return (
      <li className="add-review-tile mar-bottom">
        <a href="#" id="overlay-init"> + Add Review</a>
      </li>
    );
  }
});

// Create existing review tiles
var MovieReview = React.createClass({
  render: function() {
    return (
      <li className="review-tile mar-bottom">
        <h2><a href="#" className="review-target">{this.props.movie.title}</a></h2>
        <div className="review-thumbnail mar-y"> 
          <img className="review-image" src={this.props.movie.image} alt={this.props.movie.title} />
        </div>
        <p className="review-text mar-y">{this.props.movie.review}</p>
        <p className="rating">My rating: {this.props.movie.rating}</p>
      </li>
    );
  }
});

// Insert into grid
var MovieGrid = React.createClass({
  render: function() {
    var tiles = [];
    tiles.push(<AddReview />);
    this.props.movies.map(function(movie) {
      tiles.push(<MovieReview movie={movie} key={movie.id} />);
    });
    return (
      <ul className="review-grid">
        {tiles}
      </ul>
    );
  }
});

ReactDOM.render(
  <MovieGrid movies={MOVIES} />,
  document.getElementById('review-grid-container')
);


