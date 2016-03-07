// CALL API FOR MOVIES
var apiURL = "http://localhost:4000/rest-api/movies/";

var movieRequest = new XMLHttpRequest();
movieRequest.open("GET", apiURL, false);
movieRequest.send();

var movies = JSON.parse(movieRequest.responseText).movies;


var MovieListItem = React.createClass({

  // propTypes: {
  //   movieTitle: React.PropTypes.string,

  // },

  render: function() {
    return(
      <li className="review-tile mar-bottom">
        <h2><a href="#" className="review-target">{movie.title}</a></h2>
        <p className="review-text mar-y">My review: {movie.review}</p>
        <div className="review-thumbnail mar-y"> 
          <img className="review-image" src={movie.image} alt={movie.title} />
        </div>
        <p>My rating is: {movie.rating}</p>
      </li>
  )}


}); // end MovieListItem

module.exports = MovieListItem;