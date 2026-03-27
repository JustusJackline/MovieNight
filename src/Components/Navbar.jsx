import React from 'react'
import '../css/navbar.css'
import {Link} from 'react-router-dom'

function Navbar(){
  return (
    <div className='navbar'>
        <div className="navbar-brand">
            <Link to="/">Movie App</Link>
            <div className="navbar-links">
<Link to="/" className="nav-link">Home</Link>
<Link to="/favorites" className="nav-link">Favourites</Link>

            </div>
        </div>
      
    </div>
  )
}

export default Navbar
