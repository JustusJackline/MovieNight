import React, { useState } from 'react'
import '../css/movieCard.css'
import { useFavorites } from '../context/useFavorites'
import { useNavigate } from 'react-router-dom'

function MovieCard({movie}){
  const { addFavorite, removeFavorite, isFavorite } = useFavorites()
  const navigate = useNavigate()
  const favorite = isFavorite(movie.id)
  const [showDownloadModal, setShowDownloadModal] = useState(false)
  const [selectedQuality, setSelectedQuality] = useState('720p')
  const [selectedSpeed, setSelectedSpeed] = useState('1x')

  function onFavoriteClick(e){
    e.stopPropagation()
    if (favorite) {
      removeFavorite(movie.id)
    } else {
      addFavorite(movie)
    }
  }

  function onDownloadClick(e){
    e.stopPropagation()
    setShowDownloadModal(true)
  }

  function onWatchClick(e){
    e.stopPropagation()
    navigate(`/player/${movie.id}`)
  }

  function onCardClick(){
    navigate(`/player/${movie.id}`)
  }

  const handleConfirmDownload = () => {
    const newDownload = {
      movieId: movie.id,
      title: movie.title,
      posterPath: movie.poster_path,
      quality: selectedQuality,
      speed: selectedSpeed,
      fileSize: calculateFileSize(selectedQuality),
      downloadedAt: new Date().toISOString(),
    }

    const downloads = JSON.parse(localStorage.getItem('downloads') || '[]')
    const existingIndex = downloads.findIndex(
      (d) => d.movieId === newDownload.movieId
    )

    if (existingIndex >= 0) {
      downloads[existingIndex] = newDownload
    } else {
      downloads.push(newDownload)
    }

    localStorage.setItem('downloads', JSON.stringify(downloads))

    // Create and download file
    createAndDownloadFile(newDownload)

    setShowDownloadModal(false)
  }

  const createAndDownloadFile = (downloadData) => {
    // Create a mock MP4 file with proper headers
    const mockData = new Uint8Array([
      0x00, 0x00, 0x00, 0x20, 0x66, 0x74, 0x79, 0x70, // ftyp box
      0x69, 0x73, 0x6f, 0x6d, 0x00, 0x00, 0x00, 0x00,
      0x69, 0x73, 0x6f, 0x6d, 0x69, 0x73, 0x6f, 0x32,
      0x6d, 0x70, 0x34, 0x31,
    ])

    const blob = new Blob([mockData], { type: 'video/mp4' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${downloadData.title}-${downloadData.quality}-${downloadData.speed}.mp4`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const calculateFileSize = (quality) => {
    const sizes = {
      '480p': 150000000,
      '720p': 350000000,
      '1080p': 700000000,
    }
    return sizes[quality] || 350000000
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
  }

    return (
      <>
        <div className="movie-card" onClick={onCardClick}>
          <div className="movie-poster">
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
          </div>
          <div className="movie-overlay">
            <button className="watch-btn" onClick={onWatchClick} title="Watch movie now">▶️ Stream Now</button>
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

        {showDownloadModal && (
          <div className='modal-overlay-card' onClick={() => setShowDownloadModal(false)}>
            <div className='modal-content-card' onClick={(e) => e.stopPropagation()}>
              <div className='modal-header-card'>
                <h2>Download Movie</h2>
                <button
                  className='modal-close-card'
                  onClick={() => setShowDownloadModal(false)}
                >
                  ✕
                </button>
              </div>

              <div className='modal-body-card'>
                <div className='movie-preview-card'>
                  <img
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={movie.title}
                  />
                  <h3>{movie.title}</h3>
                </div>

                <div className='settings-group-card'>
                  <label className='setting-label-card'>Video Quality</label>
                  <div className='options-group-card'>
                    {['480p', '720p', '1080p'].map((quality) => (
                      <button
                        key={quality}
                        className={`option-btn-card ${
                          selectedQuality === quality ? 'active' : ''
                        }`}
                        onClick={() => setSelectedQuality(quality)}
                      >
                        {quality}
                      </button>
                    ))}
                  </div>
                </div>

                <div className='settings-group-card'>
                  <label className='setting-label-card'>Playback Speed</label>
                  <div className='options-group-card'>
                    {['0.5x', '1x', '1.5x', '2x'].map((speed) => (
                      <button
                        key={speed}
                        className={`option-btn-card ${
                          selectedSpeed === speed ? 'active' : ''
                        }`}
                        onClick={() => setSelectedSpeed(speed)}
                      >
                        {speed}
                      </button>
                    ))}
                  </div>
                </div>

                <div className='file-size-info-card'>
                  <p>
                    File size (~{selectedQuality}): <strong>{formatFileSize(calculateFileSize(selectedQuality))}</strong>
                  </p>
                </div>
              </div>

              <div className='modal-footer-card'>
                <button
                  className='btn-cancel-card'
                  onClick={() => setShowDownloadModal(false)}
                >
                  Cancel
                </button>
                <button
                  className='btn-download-card'
                  onClick={handleConfirmDownload}
                >
                  ⬇️ Download
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    )

}

export default MovieCard;