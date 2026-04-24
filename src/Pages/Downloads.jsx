import React, { useState, useEffect } from 'react'
import '../css/downloads.css'
import { useNavigate } from 'react-router-dom'

function Downloads() {
  const [downloads, setDownloads] = useState([])
  const [loading, setLoading] = useState(true)
  const [showDownloadModal, setShowDownloadModal] = useState(false)
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [selectedQuality, setSelectedQuality] = useState('720p')
  const [selectedSpeed, setSelectedSpeed] = useState('1x')
  const navigate = useNavigate()

  useEffect(() => {
    loadDownloads()
  }, [])

  const loadDownloads = () => {
    try {
      const savedDownloads = localStorage.getItem('downloads')
      const downloadsList = savedDownloads ? JSON.parse(savedDownloads) : []
      setDownloads(downloadsList)
    } catch (error) {
      console.log('Error loading downloads:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDownloadClick = (movie) => {
    setSelectedMovie(movie)
    setSelectedQuality('720p')
    setSelectedSpeed('1x')
    setShowDownloadModal(true)
  }

  const handleConfirmDownload = () => {
    if (selectedMovie) {
      const newDownload = {
        movieId: selectedMovie.movieId,
        title: selectedMovie.title,
        posterPath: selectedMovie.posterPath,
        quality: selectedQuality,
        speed: selectedSpeed,
        fileSize: calculateFileSize(selectedQuality),
        downloadedAt: new Date().toISOString(),
      }

      const existingIndex = downloads.findIndex(
        (d) => d.movieId === newDownload.movieId
      )

      let updatedDownloads
      if (existingIndex >= 0) {
        updatedDownloads = [...downloads]
        updatedDownloads[existingIndex] = newDownload
      } else {
        updatedDownloads = [...downloads, newDownload]
      }

      setDownloads(updatedDownloads)
      localStorage.setItem('downloads', JSON.stringify(updatedDownloads))

      // Trigger actual download
      triggerDownload(newDownload)

      setShowDownloadModal(false)
      setSelectedMovie(null)
    }
  }

  const triggerDownload = (downloadData) => {
    const link = document.createElement('a')
    link.href = 'https://commondatastorage.googleapis.com/gtv-videos-library/sample/ForBiggerBlazes.mp4'
    link.download = `${downloadData.title}-${downloadData.quality}-${downloadData.speed}.mp4`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const calculateFileSize = (quality) => {
    const sizes = {
      '480p': 150000000,
      '720p': 350000000,
      '1080p': 700000000,
    }
    return sizes[quality] || 350000000
  }

  const handleDelete = (movieId) => {
    const updatedDownloads = downloads.filter((d) => d.movieId !== movieId)
    setDownloads(updatedDownloads)
    localStorage.setItem('downloads', JSON.stringify(updatedDownloads))
  }

  const handlePlay = (movieId) => {
    navigate(`/player/${movieId}`)
  }

  const handleDeleteAll = () => {
    if (window.confirm('Are you sure you want to delete all downloads?')) {
      setDownloads([])
      localStorage.setItem('downloads', JSON.stringify([]))
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
  }

  return (
    <div className='downloads-container'>
      <div className='downloads-header'>
        <h1>📥 My Library</h1>
        <p>Your saved movies</p>
      </div>

      {loading ? (
        <div className='loading-container'>
          <div className='spinner'></div>
          <p>Loading downloads...</p>
        </div>
      ) : downloads.length > 0 ? (
        <div className='downloads-content'>
          <div className='downloads-actions'>
            <span className='downloads-count'>
              {downloads.length} {downloads.length === 1 ? 'movie' : 'movies'} saved
            </span>
            <button className='delete-all-btn' onClick={handleDeleteAll}>
              🗑️ Clear Library
            </button>
          </div>

          <div className='downloads-grid'>
            {downloads.map((download) => (
              <div key={download.movieId} className='download-card'>
                <div className='download-poster'>
                  <img
                    src={`https://image.tmdb.org/t/p/w300${download.posterPath}`}
                    alt={download.title}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x450?text=No+Image'
                    }}
                  />
                  <div className='download-overlay'>
                    <button
                      className='play-btn-download'
                      onClick={() => handlePlay(download.movieId)}
                      title='Play movie'
                    >
                      ▶️ Play
                    </button>
                  </div>
                </div>

                <div className='download-info'>
                  <h3>{download.title}</h3>
                  <div className='download-meta'>
                    <div className='meta-row'>
                      <span className='label'>Quality:</span>
                      <span className='badge quality-badge'>{download.quality}</span>
                    </div>
                    <div className='meta-row'>
                      <span className='label'>Speed:</span>
                      <span className='badge speed-badge'>{download.speed}</span>
                    </div>
                    <div className='meta-row'>
                      <span className='label'>Size:</span>
                      <span className='value'>{formatFileSize(download.fileSize)}</span>
                    </div>
                    <div className='meta-row'>
                      <span className='label'>Downloaded:</span>
                      <span className='value small'>{formatDate(download.downloadedAt)}</span>
                    </div>
                  </div>

                  <div className='download-actions'>
                    <button
                      className='re-download-btn'
                      onClick={() => handleDownloadClick(download)}
                      title='Download again with different quality'
                    >
                      ⬇️ Re-download
                    </button>
                    <button
                      className='delete-btn'
                      onClick={() => handleDelete(download.movieId)}
                      title='Delete download'
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
          <div className='empty-icon'>🎬</div>
          <h2>No Movies Saved Yet</h2>
          <p>Save your favorite movies from the movie cards to build your library!</p>
          <button className='explore-btn' onClick={() => navigate('/')}>
            🎬 Explore Movies
          </button>
        </div>
      )}

      {showDownloadModal && (
        <div className='modal-overlay' onClick={() => setShowDownloadModal(false)}>
          <div className='modal-content' onClick={(e) => e.stopPropagation()}>
            <div className='modal-header'>
              <h2>Download Settings</h2>
              <button
                className='modal-close'
                onClick={() => setShowDownloadModal(false)}
              >
                ✕
              </button>
            </div>

            {selectedMovie && (
              <>
                <div className='modal-body'>
                  <div className='movie-preview'>
                    <img
                      src={`https://image.tmdb.org/t/p/w200${selectedMovie.posterPath}`}
                      alt={selectedMovie.title}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/200x300?text=No+Image'
                      }}
                    />
                    <div className='movie-details'>
                      <h3>{selectedMovie.title}</h3>
                    </div>
                  </div>

                  <div className='settings-group'>
                    <label className='setting-label'>Video Quality</label>
                    <div className='options-group'>
                      {['480p', '720p', '1080p'].map((quality) => (
                        <button
                          key={quality}
                          className={`option-btn ${
                            selectedQuality === quality ? 'active' : ''
                          }`}
                          onClick={() => setSelectedQuality(quality)}
                        >
                          {quality}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className='settings-group'>
                    <label className='setting-label'>Playback Speed</label>
                    <div className='options-group'>
                      {['0.5x', '1x', '1.5x', '2x'].map((speed) => (
                        <button
                          key={speed}
                          className={`option-btn ${
                            selectedSpeed === speed ? 'active' : ''
                          }`}
                          onClick={() => setSelectedSpeed(speed)}
                        >
                          {speed}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className='file-size-info'>
                    <p>
                      Estimated file size:{' '}
                      <strong>{formatFileSize(calculateFileSize(selectedQuality))}</strong>
                    </p>
                  </div>
                </div>

                <div className='modal-footer'>
                  <button
                    className='btn-cancel'
                    onClick={() => setShowDownloadModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className='btn-download'
                    onClick={handleConfirmDownload}
                  >
                    ⬇️ Download
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Downloads
