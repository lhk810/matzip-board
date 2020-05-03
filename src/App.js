import React, {Component} from 'react';
import './App.css';
import Item from "./Item";

class App extends Component {

  state = {

  }

  componentDidMount() {
    //this._getMovies();
  }

  _renderMovies = () => {
    const matzips =  this.state.matzips.map((matzip) => {
      return <Item
          title={matzip.title}
          photo={matzip.photo}
          key={matzip.id}
          description={matzip.description}
      />
    })
    return matzips
  }

  _getMovies = async () => {
    const movies = await this._callApi()
    this.setState({
      movies
    })
  }

  _callApi = () => {
    return fetch('https://yts.mx/api/v2/list_movies.json?sort_by=rating')
        .then(response => response.json())
        .then(json => json.data.movies)
        .catch(err => console.log(err))
  }

  render() {
    return (
        <div className= {Item ? "App" : "App--loading"}>
          {this.state.matzips ? this._renderMovies() :  'Loading'}
        </div>
    );
  }
}

export default App;
