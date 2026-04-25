import React, { useMemo } from 'react'
import '../css/favourites.css'
import { useFavorites } from '../context/useFavorites'
import MovieCard from '../Components/MovieCard'

function Favourite({ selectedGenre }){
  const { favorites } = useFavorites()

  const filteredFavorites = useMemo(() => {
    if (!selectedGenre) {
      return favorites
    }
    // Filter favorites by genre if a genre is selected
    // Note: favorites are stored with genre_ids array from TMDB
    return favorites.filter(movie => 
      movie.genre_ids && movie.genre_ids.includes(selectedGenre)
    )
  }, [favorites, selectedGenre])

  return (
    <div className='favorites-container'>
      {filteredFavorites.length > 0 ? (
        <div>
          <h2>Your Favorite Movies ({filteredFavorites.length})</h2>
          <div className='favorites-grid'>
            {filteredFavorites.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </div>
        </div>
      ) : (
        <div className='favorites-empty'>
          <h2>{selectedGenre ? 'No favorite movies in this genre' : 'no favorite movies yet'}</h2>
          <p>{selectedGenre ? 'Try selecting a different genre or add movies to favorites' : 'Start adding movies to your favorite and they will appear here'}</p>
        </div>
      )}
    </div>
  )
}

export default Favourite
