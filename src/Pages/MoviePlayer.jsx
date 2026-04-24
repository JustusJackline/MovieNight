import React, { useState, useRef, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import '../css/moviePlayer.css'

function MoviePlayer() {
  const { movieId } = useParams()
  const navigate = useNavigate()
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [quality, setQuality] = useState('720p')
  const [subtitleFile, setSubtitleFile] = useState(null)
  const fileInputRef = useRef(null)

  // Demo video sources for different qualities
  const videoSources = {
    '480p': 'https://commondatastorage.googleapis.com/gtv-videos-library/sample/ForBiggerBlazes.mp4',
    '720p': 'https://commondatastorage.googleapis.com/gtv-videos-library/sample/ForBiggerBlazes.mp4',
    '1080p': 'https://commondatastorage.googleapis.com/gtv-videos-library/sample/ForBiggerBlazes.mp4',
  }

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackRate
    }
  }, [playbackRate])

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value)
    setCurrentTime(newTime)
    if (videoRef.current) {
      videoRef.current.currentTime = newTime
    }
  }

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (videoRef.current) {
      videoRef.current.volume = newVolume
    }
  }

  const handleQualityChange = (newQuality) => {
    setQuality(newQuality)
    const currentTime = videoRef.current?.currentTime || 0
    if (videoRef.current) {
      videoRef.current.src = videoSources[newQuality]
      videoRef.current.currentTime = currentTime
      if (isPlaying) {
        videoRef.current.play()
      }
    }
  }

  const handleSubtitleUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const content = event.target?.result
        setSubtitleFile({
          name: file.name,
          content: content
        })
      }
      reader.readAsText(file)
    }
  }

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = videoSources[quality]
    link.download = `movie-${movieId}-${quality}.mp4`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    // Save download record to localStorage
    const downloads = JSON.parse(localStorage.getItem('downloads') || '[]')
    const existingDownload = downloads.find((d) => d.movieId === parseInt(movieId))

    if (!existingDownload) {
      downloads.push({
        movieId: parseInt(movieId),
        title: `Movie ${movieId}`,
        quality: quality,
        posterPath: '/path/to/poster.jpg', // Placeholder
        fileSize: Math.floor(Math.random() * 500000000) + 100000000, // Mock size 100MB-600MB
        downloadedAt: new Date().toISOString(),
      })
      localStorage.setItem('downloads', JSON.stringify(downloads))
    }
  }

  const formatTime = (time) => {
    if (!time) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  return (
    <div className='movie-player-container'>
      <button className='back-btn' onClick={() => navigate('/')}>← Back</button>
      
      <div className='player-wrapper'>
        <video
          ref={videoRef}
          className='video-player'
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
          src={videoSources[quality]}
        />

        <div className='player-controls'>
          <div className='progress-bar-container'>
            <input
              type='range'
              min='0'
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              className='progress-bar'
            />
          </div>

          <div className='controls-bottom'>
            <div className='left-controls'>
              <button className='control-btn play-btn' onClick={handlePlayPause}>
                {isPlaying ? '⏸' : '▶'}
              </button>

              <div className='volume-control'>
                <span className='volume-icon'>🔊</span>
                <input
                  type='range'
                  min='0'
                  max='1'
                  step='0.1'
                  value={volume}
                  onChange={handleVolumeChange}
                  className='volume-slider'
                />
              </div>

              <span className='time-display'>
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <div className='right-controls'>
              <div className='control-group'>
                <label className='control-label'>Speed:</label>
                <select
                  value={playbackRate}
                  onChange={(e) => setPlaybackRate(parseFloat(e.target.value))}
                  className='control-select'
                >
                  <option value={0.5}>0.5x</option>
                  <option value={1}>1x</option>
                  <option value={1.5}>1.5x</option>
                  <option value={2}>2x</option>
                </select>
              </div>

              <div className='control-group'>
                <label className='control-label'>Quality:</label>
                <select
                  value={quality}
                  onChange={(e) => handleQualityChange(e.target.value)}
                  className='control-select'
                >
                  <option value='480p'>480p</option>
                  <option value='720p'>720p</option>
                  <option value='1080p'>1080p</option>
                </select>
              </div>

              <button className='control-btn' onClick={handleDownload} title='Download movie'>
                ⬇ Download
              </button>

              <button
                className='control-btn subtitle-btn'
                onClick={() => fileInputRef.current?.click()}
                title='Upload subtitles'
              >
                CC
              </button>
              <input
                ref={fileInputRef}
                type='file'
                accept='.srt,.vtt'
                onChange={handleSubtitleUpload}
                style={{ display: 'none' }}
              />

              {subtitleFile && (
                <button
                  className='control-btn subtitle-active'
                  title='Subtitles loaded'
                >
                  ✓ CC
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className='player-info'>
        <h2>Movie ID: {movieId}</h2>
        <p>Quality: {quality} | Speed: {playbackRate}x</p>
        {subtitleFile && <p>Subtitles: {subtitleFile.name} (loaded)</p>}
      </div>
    </div>
  )
}

export default MoviePlayer
