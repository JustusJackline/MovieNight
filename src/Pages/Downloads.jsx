import React, { useState, useEffect, useMemo } from 'react'
import '../css/downloads.css'
import { useNavigate } from 'react-router-dom'

function Watchlist({ selectedGenre }) {
  const [watchlist, setWatchlist] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedStatus, setSelectedStatus] = useState('all')
  const navigate = useNavigate()

  const filteredWatchlist = useMemo(() => {
    let filtered = watchlist
    
    // Filter by status
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(item => item.status === selectedStatus)
    }
    
    // Filter by genre if selected
    if (selectedGenre) {
      filtered = filtered.filter(item => 
        item.genre_ids && item.genre_ids.includes(selectedGenre)
      )
    }
    
    return filtered
  }, [watchlist, selectedStatus, selectedGenre])

  useEffect(() => {
    loadWatchlist()
  }, [])

  const loadWatchlist = () => {
    try {
      const savedWatchlist = localStorage.getItem('watchlist')
      const watchlistData = savedWatchlist ? JSON.parse(savedWatchlist) : []
      setWatchlist(watchlistData)
    } catch (error) {
      console.log('Error loading watchlist:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateStatus = (movieId, newStatus) => {
    const updatedWatchlist = watchlist.map(item =>
      item.movieId === movieId ? { ...item, status: newStatus } : item
    )
    setWatchlist(updatedWatchlist)
    localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist))
  }

  const handleDelete = (movieId) => {
    const updatedWatchlist = watchlist.filter(item => item.movieId !== movieId)
    setWatchlist(updatedWatchlist)
    localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist))
  }

  const handleDeleteAll = () => {
    if (window.confirm('Are you sure you want to clear your entire watchlist?')) {
      setWatchlist([])
      localStorage.setItem('watchlist', JSON.stringify([]))
    }
  }

  const getStatusCount = (status) => {
    if (status === 'all') return watchlist.length
    return watchlist.filter(item => item.status === status).length
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'not-watched': return '#ff9800'
      case 'in-progress': return '#2196f3'
      case 'completed': return '#4caf50'
      default: return '#666'
    }
  }

  const getStatusLabel = (status) => {
    switch(status) {
      case 'not-watched': return '⏳ Not Watched'
      case 'in-progress': return '▶️ In Progress'
      case 'completed': return '✅ Completed'
      default: return status
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <div className='downloads-container'>
      <div className='downloads-header'>
        <h1>📺 My Watchlist</h1>
        <p>Track movies you want to watch</p>
      </div>

      {loading ? (
        <div className='loading-container'>
          <div className='spinner'></div>
          <p>Loading watchlist...</p>
        </div>
      ) : watchlist.length > 0 ? (
        <div className='downloads-content'>
          <div className='status-filters'>
            <button 
              className={`status-filter ${selectedStatus === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedStatus('all')}
            >
              📚 All ({getStatusCount('all')})
            </button>
            <button 
              className={`status-filter ${selectedStatus === 'not-watched' ? 'active' : ''}`}
              onClick={() => setSelectedStatus('not-watched')}
              style={{ borderColor: selectedStatus === 'not-watched' ? '#ff9800' : 'transparent' }}
            >
              ⏳ Not Watched ({getStatusCount('not-watched')})
            </button>
            <button 
              className={`status-filter ${selectedStatus === 'in-progress' ? 'active' : ''}`}
              onClick={() => setSelectedStatus('in-progress')}
              style={{ borderColor: selectedStatus === 'in-progress' ? '#2196f3' : 'transparent' }}
            >
              ▶️ In Progress ({getStatusCount('in-progress')})
            </button>
            <button 
              className={`status-filter ${selectedStatus === 'completed' ? 'active' : ''}`}
              onClick={() => setSelectedStatus('completed')}
              style={{ borderColor: selectedStatus === 'completed' ? '#4caf50' : 'transparent' }}
            >
              ✅ Completed ({getStatusCount('completed')})
            </button>
          </div>

          <div className='downloads-actions'>
            <span className='downloads-count'>
              {filteredWatchlist.length} {filteredWatchlist.length === 1 ? 'movie' : 'movies'}
            </span>
            <button className='delete-all-btn' onClick={handleDeleteAll}>
              🗑️ Clear Watchlist
            </button>
          </div>

          <div className='downloads-grid'>
            {filteredWatchlist.map((movie) => (
              <div key={movie.movieId} className='download-card'>
                <div className='download-poster'>
                  <img
                    src={`https://image.tmdb.org/t/p/w300${movie.posterPath}`}
                    alt={movie.title}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x450?text=No+Image'
                    }}
                  />
                  <div className='status-badge' style={{ backgroundColor: getStatusColor(movie.status) }}>
                    {getStatusLabel(movie.status)}
                  </div>
                </div>

                <div className='download-info'>
                  <h3>{movie.title}</h3>
                  <div className='movie-rating-small'>
                    <span>⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</span>
                  </div>
                  <p className='saved-date'>Saved: {formatDate(movie.savedAt)}</p>

                  <div className='status-actions'>
                    <select 
                      value={movie.status}
                      onChange={(e) => handleUpdateStatus(movie.movieId, e.target.value)}
                      className='status-select'
                    >
                      <option value='not-watched'>⏳ Not Watched</option>
                      <option value='in-progress'>▶️ In Progress</option>
                      <option value='completed'>✅ Completed</option>
                    </select>
                    <button
                      className='delete-btn'
                      onClick={() => handleDelete(movie.movieId)}
                      title='Remove from watchlist'
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className='downloads-empty'>
          <div className='empty-icon'>🍿</div>
          <h2>Your watchlist is empty</h2>
          <p>Start saving movies to build your watchlist!</p>
          <button className='explore-btn' onClick={() => navigate('/')}>
            🎬 Browse Movies
          </button>
        </div>
      )}
    </div>
  )
}

export default Watchlist
