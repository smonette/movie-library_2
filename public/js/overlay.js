// CALL API FOR MOVIES
var apiURL = "http://localhost:4000/rest-api/movies/";

var movieRequest = new XMLHttpRequest();
movieRequest.open("GET", apiURL, false);
movieRequest.send();

var movies = JSON.parse(movieRequest.responseText).movies;


// Set up reviews and search
var AddBox = React.createClass({
 getInitialState: function(){
    return { 
      searchString: '', 
      overlayState: false
    }
  },
  handleClick: function() {
    // derefernce, to make a copy and not mess with current state
    var currentState = {...this.state}

    // this is creating a toggle 
    // if not active make active
    // if active make not active
    this.setState( { overlayState: !currentState.overlayState } )
  },
  render() {
    var overlay = null; 

    // if the overlayState is active, show the overlay
    if(this.state.overlayState) { 
      overlay = <Overlay onClick={this.handleClick} /> 
    }

    return(
      <div>
        <MovieAddItem onClick={this.handleClick} />
        {overlay}
      </div>
    )
  }
});

var MovieAddItem = React.createClass({
  propTypes: {
    onClick: React.PropTypes.func
  },
  render() {
    return (
      <div className="add-review-tile mar-bottom type-centered" onClick={this.props.onClick}>
        <h2><a>Add Review!</a></h2>
      </div>
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
  <AddBox />,
  document.getElementById('add-container')
);