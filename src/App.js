import React, { Component } from 'react';
//import axios from 'axios';
import './App.css';
import Movie from './Movie';

class App extends Component {
  //컴포넌트 Life Cycle
  //Render: componentWillMount() -> render() -> componentDidMount()
  //update: componentWillReceiveProps() -> shouldComponentUpdate() -> componentWillUpdate() -> render() -> componentDidUpdate()

  state = {}

  componentDidMount() {
    this._getMovies();

  }

  _renderMovies = () => {
    const movies = this.state.movies.map(movie => {
      return <Movie 
                title={movie.title} 
                poster={movie.medium_cover_image}
                key={movie.id}
                genres={movie.genres}
                synopsis={movie.synopsis}
              />
    })
    return movies
  }

  _getMovies = async () => {
    const movies = await this._callApi()
    this.setState({
      movies
    })
  }

  _callApi = () => {
    //CORS 문제 해결 필요 - 크롬 CROS SKIP 확장프로그램 사용하여 테스트 완료
    return fetch('https://yts.am/api/v2/list_movies.json?sort_by=rating')
    .then(response => response.json())
    .then(json => json.data.movies)
    .catch(err => console.log(err))
  }

  render() {
    const { movies } = this.state;
    return (
      <div className={movies ? 'App' : 'App--loading'}>
        {movies ? this._renderMovies() : 'Loading..'}
      </div>
    )
  }
}

export default App
