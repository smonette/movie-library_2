// CALL API FOR MOVIES
var apiURL = "http://localhost:4000/rest-api/movies/";

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
    this.setState({searchString:e.target.value})
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

    if(searchString.length > 0){
      // We are searching. Filter the results.
      movies = movies.filter(function(movie){
        return movie.title.toLowerCase().match( searchString )
      });
    }
    
    var overlay = null; 

    // if the overlayState is active, show the overlay
    if(this.state.overlayState) { 
      overlay = <Overlay onClick={this.handleClick} /> 
    }
    
    return (
      <main>
        <div className="row mar-y">
          <input type="text" value={this.state.searchString} onChange={this.handleChange} placeholder="Type here" className="form-input add-input"/>
        </div>
        <div className="row">
          <ul className="review-grid"> 
            {moviesToDisplay}
            <MovieAddItem onClick={this.handleClick} />
          </ul>
        </div>
        {overlay}
      </main>
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

var MovieAddItem = React.createClass({
  propTypes: {
    onClick: React.PropTypes.func
  },
  render() {
    return (
      <li className="add-review-tile mar-bottom type-centered" onClick={this.props.onClick}>
        <h2><a>Add Review!</a></h2>
      </li>
    );
  }
});

var Overlay = React.createClass({
  propTypes: {
    onClick: React.PropTypes.func
  },
  render() {
    return (
        <div className="overlay" id="overlay">
          <div className="row"> 
            <div className="overlay-container">
              <a href="#" className="overlay-dismiss" onClick={this.props.onClick}>&times;</a>

              <form action="/rest-api/movies" method="POST" className="movie-form">
                <div className="form-row">
                  <span className="form-label">Movie Title</span>
                  <input className="form-input add-input" type="text" placeholder="Movie Title" name="title" required />
                </div>
                
                <div className="form-row">
                  <span className="form-label">My Review</span>
                  <textarea className="form-input add-input" placeholder="My Review" name="review" rows="3" required></textarea>
                </div>

                <div className="form-row">
                  <span className="form-label">Poster URL</span>
                  <input className="form-input add-input" type="url" placeholder="Image URL" name="image" required /> 
                </div>

                <div className="form-row">
                  <span className="form-label">My Rating</span>
                  <input type="radio" name="rating" value="1" /><span className="form-label_radio">⭐</span><br />
                  <input type="radio" name="rating" value="2" /><span className="form-label_radio">⭐⭐</span><br />
                  <input type="radio" name="rating" value="3" /><span className="form-label_radio">⭐⭐⭐</span><br /> 
                  <input type="radio" name="rating" value="4" /><span className="form-label_radio">⭐⭐⭐⭐</span><br />
                </div>

                <div className="form-row">
                  <input className="form-submit add-submit" type="submit" />
                </div>
              </form>
            </div>
          </div>
        </div>
    )
  }
});




// Render the the tiles and the search on the page
ReactDOM.render(
  <MoviesGrid items={ movies } />,
  document.getElementById('body-container')
);