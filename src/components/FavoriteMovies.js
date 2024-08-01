// src/components/FavoriteMovies.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';

const FavoriteMovies = ({favorite}) => {
  const [favorites, setFavorites] = useState([]);
  

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/favorites');
        setFavorites(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFavorites();
  }, [favorite]);

  const removeFavorite = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/favorites/${id}`);
      setFavorites(favorites.filter((fav) => fav.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Typography variant="h4">Favorite Movies</Typography>
      <Grid container spacing={2}>
        {favorites.map((fav) => (
          <Grid item xs={12} md={4} key={fav.id}>
            <Card>
              <CardContent>
                <Typography variant="h5">{fav.title}</Typography>
                <Typography variant="body2">{fav.country}</Typography>
                <img  src={fav.poster_path}/>
                <Button onClick={() => removeFavorite(fav.id)} variant="contained" color="secondary">
                  Remove
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default FavoriteMovies;
