// CALL API FOR MOVIES
var apiURL = "http://localhost:4000/rest-api/movies/";

var movieRequest = new XMLHttpRequest();
movieRequest.open("GET", apiURL, false);
movieRequest.send();

var movies = JSON.parse(movieRequest.responseText).movies;


// Set up reviews and search
var MoviesGrid = React.createClass({

  getInitialState: function(){
    return { searchString: '' }
  },

  handleChange: function(e){
    this.setState({searchString:e.target.value})
  },

  render: function() {
    var movies = this.props.items,
      searchString = this.state.searchString.trim().toLowerCase();

    if(searchString.length > 0){
      // We are searching. Filter the results.
      movies = movies.filter(function(movie){
        return movie.title.toLowerCase().match( searchString )
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
                  return ( 
                    <li className="review-tile mar-bottom" key={movie.id}>
                      <h2><a href="#" className="review-target">{movie.title}</a></h2>
                      <p className="review-text mar-y">My review: {movie.review}</p>
                        <div className="review-thumbnail mar-y"> 
                          <img className="review-image" src={movie.image} alt={movie.title} />
                        </div>
                      <p>Rating: {movie.rating}⭐</p>
                    </li>
                  )
              }) }
              <MovieAddItem />
          </ul>
        </div>
      </main>
    )}
});

var MovieAddItem = React.createClass({

  getInitialState: function(){
    return { active: false };
  },
  handleClick: function() {
    console.log('clicked!');
    this.setState( {active: true} );
    document.getElementById('overlay').className('active');
  },
  render() {
    return (
      <li className="add-review-tile mar-bottom type-centered">
        <h2><a>Add Review!</a></h2>
      </li>
    );
  }
});




// Render the the tiles and the search on the page
ReactDOM.render(
    <MoviesGrid items={ movies } />,
    document.getElementById('body-container')
);