// src/components/MovieSearch.js
import React, { useState } from 'react';
import axios from 'axios';
import './MovieSearch.css';

const MovieSearch = ({ onAddFavorite }) => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState({});
  const [favorites, setFavorites] = useState([]);
  const searchMovies = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/search?query=${query}`);
      const move = response.data;
      setMovies(move);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="movie-search-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        <button onClick={searchMovies} className="search-button">
          Search
        </button>
      </div>
      <div className="movie-card">
        <div className="movie-card-content">
          <h3>{movies?.Title}</h3>
          <p><strong>Country:</strong> {movies?.Country}</p>
          <p><strong>Genre:</strong> {movies?.Genre}</p>
          <p><strong>Actors:</strong> {movies?.Actors}</p>
          <img src={movies?.Poster} alt={movies?.Title} className="movie-poster" />
          <button onClick={() => onAddFavorite(movies)} className="favorite-button">
            Add to Favorites
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieSearch;
