

// Build the search
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
    return(
      <div className="row">
        <input type="text" value={this.state.searchString} onChange={this.handleChange} placeholder="Find a movie!" className="form-input mar-y"/>
        <ul className="review-grid"> 

            { movies.map(function(movie){
                return <MovieListItem />;
            }) }
          <li className="add-review-tile mar-bottom type-centered"><h2><a>Add Review!</a></h2></li>
        </ul>
      </div>
    )}, // close the render + return
}); // close the createClass

// Render the SearchMovies component on the page

ReactDOM.render(
    <SearchMovies items={ movies } />,
    document.getElementById('review-container')
);

