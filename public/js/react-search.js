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

            movies = movies.filter(function(l){
                return l.title.toLowerCase().match( searchString );
            });

        }

        return <div>
                  <input type="text" value={this.state.searchString} onChange={this.handleChange} placeholder="Type here" />

                  <ul> 

                      { movies.map(function(l){
                          return <li>{l.title} <a href={l.rating}>{l.rating}</a></li>
                      }) }

                  </ul>

              </div>;

    }
});

// Render the SearchMovies component on the page

ReactDOM.render(
    <SearchMovies items={ movies } />,
    document.getElementById('review-container')
);