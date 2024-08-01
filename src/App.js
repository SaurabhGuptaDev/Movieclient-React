// src/App.js
import React, { useState } from 'react';
import MovieSearch from './components/MovieSearch';
import FavoriteMovies from './components/FavoriteMovies';
import axios from 'axios';
import { Container, AppBar, Toolbar, Typography } from '@mui/material';

function App() {
  const [favorite, setFavorite] = useState([]);

  const addFavorite = async (movie) => {
    try {
      const response = await axios.post('http://localhost:5000/api/favorites', movie);
     // setFavorites([...favorites, { ...movie, id: response.data.id }]);
      setFavorite([...favorite, { ...movie, id: response.data.id }])
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Movie App</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <MovieSearch onAddFavorite={addFavorite} />
        <FavoriteMovies favorite={favorite}/>
      </Container>
    </div>
  );
}

export default App;
