import React, { useState, useEffect } from 'react';
import { FavoritesContext } from './FavoritesContextFile';
import { useUser } from './useUser';

export const FavoritesProvider = ({ children }) => {
  const { userId, getUserStorageKey } = useUser()
  const [favorites, setFavorites] = useState(() => {
    if (!userId) return []
    const storageKey = `${userId}_favorites`
    const savedFavorites = localStorage.getItem(storageKey);
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    if (userId) {
      const storageKey = `${userId}_favorites`
      localStorage.setItem(storageKey, JSON.stringify(favorites));
    }
  }, [favorites, userId]);

  const addFavorite = (movie) => {
    setFavorites((prevFavorites) => {
      if (!prevFavorites.find((fav) => fav.id === movie.id)) {
        return [...prevFavorites, movie];
      }
      return prevFavorites;
    });
  };

  const removeFavorite = (movieId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((movie) => movie.id !== movieId)
    );
  };

  const isFavorite = (movieId) => {
    return favorites.some((movie) => movie.id === movieId);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};;
