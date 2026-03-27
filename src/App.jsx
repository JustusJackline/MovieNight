import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import MovieCard from './Components/MovieCard.jsx'
import Home from './Pages/Home.jsx'
import {Routes,Route} from 'react-router-dom'
import Favourite from './Pages/Favourite.jsx'
import Navbar from './Components/Navbar.jsx'
import './css/app.css'


function App() {

  return (
    <div>
      <Navbar/>
    <main className='main-content'>
<Routes>
<Route path='/' element={<Home/>}></Route>
<Route path='/favorites' element={<Favourite/>}></Route>

</Routes>
      
   <Home/>
    </main>
    </div>
  )
}

export default App
