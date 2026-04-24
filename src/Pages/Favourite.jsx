import React from 'react'
import '../css/favourites.css'
import { useFavorites } from '../context/useFavorites'
import MovieCard from '../Components/MovieCard'

function Favourite(){
  const { favorites } = useFavorites()

  return (
    <div className='favorites-container'>
      {favorites.length > 0 ? (
        <div>
          <h2>Your Favorite Movies ({favorites.length})</h2>
          <div className='favorites-grid'>
            {favorites.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </div>
        </div>
      ) : (
        <div className='favorites-empty'>
          <h2>no favorite movies yet</h2>
          <p>Start adding movies to your favorite and they will appear here</p>
        </div>
      )}
    </div>
  )
}

export default Favourite
