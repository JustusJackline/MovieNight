import React from 'react'
import '../css/navbar.css'
import {Link} from 'react-router-dom'

function Navbar(){
  return (
    <div className='navbar'>
        <div className="navbar-brand">
            <Link to="/">🎬 MovieNight</Link>
        </div>
        <div className="navbar-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/favorites" className="nav-link">❤️ Favorites</Link>
          <Link to="/downloads" className="nav-link">� Watch History</Link>
        </div>
    </div>
  )
}

export default Navbar
