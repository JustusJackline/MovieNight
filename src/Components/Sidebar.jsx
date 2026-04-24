import React, { useState, useEffect } from 'react'
import '../css/sidebar.css'

function Sidebar({ onGenreSelect }) {
  const [genres, setGenres] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedGenre, setSelectedGenre] = useState(null)

  useEffect(() => {
    const loadGenres = async () => {
      try {
        const API_KEY = import.meta.env.VITE_API_KEY
        const BASE_URL = import.meta.env.VITE_BASE_URL
        const response = await fetch(
          `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`
        )
        const data = await response.json()
        setGenres(data.genres || [])
      } catch (error) {
        console.log('Error loading genres:', error)
      } finally {
        setLoading(false)
      }
    }

    loadGenres()
  }, [])

  const handleGenreClick = (genreId) => {
    setSelectedGenre(selectedGenre === genreId ? null : genreId)
    onGenreSelect(selectedGenre === genreId ? null : genreId)
  }

  return (
    <aside className='sidebar'>
      <div className='sidebar-header'>
        <h3>Genres</h3>
      </div>

      <div className='genres-list'>
        {loading ? (
          <div className='loading-genres'>Loading...</div>
        ) : genres.length > 0 ? (
          genres.map((genre) => (
            <button
              key={genre.id}
              className={`genre-btn ${selectedGenre === genre.id ? 'active' : ''}`}
              onClick={() => handleGenreClick(genre.id)}
            >
              {genre.name}
            </button>
          ))
        ) : (
          <p className='no-genres'>No genres available</p>
        )}
      </div>
    </aside>
  )
}

export default Sidebar
