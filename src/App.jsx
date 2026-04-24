import MovieCard from './Components/MovieCard.jsx'
import Home from './Pages/Home.jsx'
import {Routes,Route} from 'react-router-dom'
import Favourite from './Pages/Favourite.jsx'
import Downloads from './Pages/Downloads.jsx'
import Navbar from './Components/Navbar.jsx'
import MoviePlayer from './Pages/MoviePlayer.jsx'
import Sidebar from './Components/Sidebar.jsx'
import { FavoritesProvider } from './context/FavoritesContext.jsx'
import './css/app.css'
import { useState } from 'react'


function App() {
  const [selectedGenre, setSelectedGenre] = useState(null)

  const handleGenreSelect = (genreId) => {
    setSelectedGenre(genreId)
  }

  return (
    <FavoritesProvider>
      <div className='app-container'>
        <Navbar/>
        <div className='app-layout'>
          <Sidebar onGenreSelect={handleGenreSelect} />
          <main className='main-content'>
            <Routes>
              <Route path='/' element={<Home selectedGenre={selectedGenre} />}></Route>
              <Route path='/favorites' element={<Favourite/>}></Route>
              <Route path='/downloads' element={<Downloads/>}></Route>
              <Route path='/player/:movieId' element={<MoviePlayer/>}></Route>
            </Routes>
          </main>
        </div>
      </div>
    </FavoritesProvider>
  )
}

export default App
