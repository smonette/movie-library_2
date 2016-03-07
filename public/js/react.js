// CALL API FOR MOVIES
var apiURL = "http://localhost:4000/rest-api/movies/";

var movieRequest = new XMLHttpRequest();
movieRequest.open("GET", apiURL, false);
movieRequest.send();

var movies = JSON.parse(movieRequest.responseText).movies;



var SearchMovies = React.createClass({

  getInitialState: function(){
      return { searchString: '' };
  },

  handleChange: function(e){
    // If you comment out this line, the text box will not change its value.
    // This is because in React, an input cannot change independently of the value
    // that was assigned to it. In our case this is this.state.searchString.

    this.setState({searchString:e.target.value});
  },

  render: function() {

    var movies = this.props.items,
      searchString = this.state.searchString.trim().toLowerCase();


    if(searchString.length > 0){

      // We are searching. Filter the results.
      movies = movies.filter(function(movie){
        return movie.title.toLowerCase().match( searchString );
      });

    }
    
    return (
      <main>
        <div className="row mar-y">
          <input type="text" value={this.state.searchString} onChange={this.handleChange} placeholder="Type here" className="form-input add-input"/>
        </div>
        <div className="row">
          <ul className="review-grid"> 
              { movies.map(function(movie){
                  return <li className="review-tile mar-bottom">
                            <h2><a href="#" className="review-target">{movie.title}</a></h2>
                            <p className="review-text mar-y">My review: {movie.review}</p>
                            <div className="review-thumbnail mar-y"> 
                              <img className="review-image" src={movie.image} alt={movie.title} />
                            </div>
                            <p>My rating is: {movie.rating}</p>
                          </li>
              }) }
              <MovieAddItem />
          </ul>
        </div>
      </main>
    ) 

  }
});


var MovieAddItem = React.createClass({
  render: function() {
    return(
      <li className="add-review-tile mar-bottom type-centered">
        <h2><a href="#" id="overlay-init">Add Review!</a></h2>
      </li>
  )}
}); // end MovieAddItem




// Render the the tiles and the search on the page
ReactDOM.render(
    <SearchMovies items={ movies } />,
    document.getElementById('body-container')
);