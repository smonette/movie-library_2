// CALL API FOR MOVIES
var apiURL = "/rest-api/movies/";

var movieRequest = new XMLHttpRequest();
movieRequest.open("GET", apiURL, false);
movieRequest.send();

var movies = JSON.parse(movieRequest.responseText).movies;


// Set up reviews and search
var MoviesGrid = React.createClass({
 getInitialState: function(){
    return { 
      searchString: '', 
      overlayState: false
    }
  },

  handleChange: function(e){
    this.setState({searchString:e.target.value});
  },

  handleClick: function() {
    // derefernce, to make a copy and not mess with current state
    var currentState = {...this.state}

    // this is creating a toggle 
    // if not active make active
    // if active make not active
    this.setState( { overlayState: !currentState.overlayState } )
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
    
    var moviesToDisplay = movies.map(function(movie){
      return <MovieTile 
                key={movie.id}
                onClick={this.handleTitleClick} 
                title={movie.title} 
                image={movie.image}
                id={movie.id}
                review={movie.review}  
                rating={movie.rating} />
    }, this);

    return (
      <div className="grid">
        <div className="row mar-y search-container">
          <span className="form-label">Find a movie:</span>
          <input type="text" value={this.state.searchString} onChange={this.handleChange} placeholder="Find a review" className="form-input search-input"/>
        </div>
        <div className="row">
          <ul className="review-grid"> 
            {moviesToDisplay}
          </ul>
        </div>
      </div>
    )}
});

var MovieTile = React.createClass({
  propTypes: {
    title: React.PropTypes.string,
    image: React.PropTypes.string,
    id: React.PropTypes.number,
    review: React.PropTypes.string,
    rating: React.PropTypes.number,
    onClick: React.PropTypes.func
  },
  getInitialState: function(){
    return { 
      showReview: false
    }
  },

  render() {    
    var reviewText = null;
    if(this.state.showReview){
      reviewText = <p className="review-text mar-y">My review: {this.props.review}</p>
    }

    return (
      <li className="review-tile mar-bottom">
        <h2 onClick={this.handleTitleClick}>{this.props.title}</h2>
          {reviewText}
          <div className="review-thumbnail mar-y"> 
            <img className="review-image" src={this.props.image} alt={this.props.title} />
          </div>
        <p>Rating: {this.props.rating}⭐</p>
      </li>
    );
  },

  handleTitleClick: function(){
    console.log('clicked a title!');
    var currentReviewState = {...this.state };
    this.setState( { showReview: !currentReviewState.showReview } )
  }

});




// Render the the tiles and the search on the page
ReactDOM.render(
  <MoviesGrid items={ movies } />,
  document.getElementById('body-container')
);