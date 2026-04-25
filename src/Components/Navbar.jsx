import React, { useState } from 'react'
import '../css/navbar.css'
import {Link} from 'react-router-dom'
import { useUser } from '../context/useUser'

function Navbar(){
  const { userId } = useUser()
  const [showUserInfo, setShowUserInfo] = useState(false)

  const copyUserId = () => {
    navigator.clipboard.writeText(userId)
    alert('User ID copied to clipboard!')
  }

  return (
    <div className='navbar'>
        <div className="navbar-brand">
            <Link to="/">🎬 MovieNight</Link>
        </div>
        <div className="navbar-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/favorites" className="nav-link">❤️ Favorites</Link>
          <Link to="/downloads" className="nav-link">📺 My Watchlist</Link>
        </div>
        <div className="user-section">
          <button 
            className="user-btn" 
            onClick={() => setShowUserInfo(!showUserInfo)}
            title="Your unique user ID"
          >
            👤 My ID
          </button>
          {showUserInfo && userId && (
            <div className="user-info-popup">
              <p className="user-id-label">Your User ID:</p>
              <div className="user-id-display">
                <code>{userId}</code>
                <button className="copy-btn" onClick={copyUserId}>📋 Copy</button>
              </div>
              <p className="user-info-text">Your data is saved locally to this ID</p>
            </div>
          )}
        </div>
    </div>
  )
}

export default Navbar
