import React, { useState } from 'react'
import '../css/movieCard.css'
import { useFavorites } from '../context/useFavorites'

function MovieCard({movie}){
  const { addFavorite, removeFavorite, isFavorite } = useFavorites()
  const favorite = isFavorite(movie.id)
  const [showSaveModal, setShowSaveModal] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState('not-watched')

  function onFavoriteClick(e){
    e.stopPropagation()
    if (favorite) {
      removeFavorite(movie.id)
    } else {
      addFavorite(movie)
    }
  }

  function onSaveClick(e){
    e.stopPropagation()
    setShowSaveModal(true)
  }

  const handleConfirmSave = () => {
    const newWatchlistItem = {
      movieId: movie.id,
      title: movie.title,
      posterPath: movie.poster_path,
      vote_average: movie.vote_average,
      genre_ids: movie.genre_ids || [],
      status: selectedStatus,
      savedAt: new Date().toISOString(),
    }

    const watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]')
    const existingIndex = watchlist.findIndex(
      (item) => item.movieId === newWatchlistItem.movieId
    )

    if (existingIndex >= 0) {
      watchlist[existingIndex] = newWatchlistItem
    } else {
      watchlist.push(newWatchlistItem)
    }

    localStorage.setItem('watchlist', JSON.stringify(watchlist))
    setShowSaveModal(false)
    setSelectedStatus('not-watched')
  }

  return (
    <>
      <div className="movie-card">
        <div className="movie-poster">
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
        </div>
        <div className="movie-overlay">
          <button className="save-btn" onClick={onSaveClick} title="Save to watchlist">📌 Save for Later</button>
          <div className="overlay-buttons">
            <button className="favorite-btn" onClick={onFavoriteClick} title="Add to favorites">{favorite ? '❤️' : '🤍'}</button>
          </div>
        </div>
        <div className="movie-info">
          <h3>{movie.title}</h3>
          <p>{movie.release_date}</p>
          <div className="movie-rating">
            <span className="rating-star">⭐</span>
            <span className="rating-value">{movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}/10</span>
          </div>
        </div>
      </div>

      {showSaveModal && (
        <div className='modal-overlay-card' onClick={() => setShowSaveModal(false)}>
          <div className='modal-content-card' onClick={(e) => e.stopPropagation()}>
            <div className='modal-header-card'>
              <h2>Save to Watchlist</h2>
              <button
                className='modal-close-card'
                onClick={() => setShowSaveModal(false)}
              >
                ✕
              </button>
            </div>

            <div className='modal-body-card'>
              <div className='movie-preview-card'>
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/200x300?text=No+Image'
                  }}
                />
                <h3>{movie.title}</h3>
              </div>

              <div className='settings-group-card'>
                <label className='setting-label-card'>Watching Status</label>
                <div className='options-group-card'>
                  {[
                    { value: 'not-watched', label: '⏳ Not Watched', emoji: '⏳' },
                    { value: 'in-progress', label: '▶️ In Progress', emoji: '▶️' },
                    { value: 'completed', label: '✅ Completed', emoji: '✅' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      className={`option-btn-card ${
                        selectedStatus === option.value ? 'active' : ''
                      }`}
                      onClick={() => setSelectedStatus(option.value)}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className='modal-footer-card'>
              <button
                className='btn-cancel-card'
                onClick={() => setShowSaveModal(false)}
              >
                Cancel
              </button>
              <button
                className='btn-download-card'
                onClick={handleConfirmSave}
              >
                💾 Save to Watchlist
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default MovieCard
