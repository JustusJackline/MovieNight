import React from 'react'
import MovieCard from '../Components/MovieCard';
import { useState,useEffect } from 'react';
import '../css/home.css';
import {SearchMovies,getPopularMovies} from '../services/api';

function Home(){
const[searchQuery,setSearchQuery]=useState("");
const [movies,setMovies]=useState([]);
const [error,setError]=useState(null);
const[loading,setLoading]=useState(true);

useEffect(
    ()=>{
const loadPopularMovies=async ()=>{
    try{
        const popularMovies=await getPopularMovies()
        setMovies(popularMovies)
    }
    catch(err){
        console.log(err)
        setError("Failed to load movies")
    }
    finally{
        setLoading(false)
    }
}
loadPopularMovies()

    },[]
)

const handleSubmit=(e)=>{
    e.preventDefault();
    setSearchQuery("");

}

  return (
  <>

  <form onSubmit={handleSubmit} className="search-form">
    <input type="text" className="search-input" placeholder='search for movies....' value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)}
     />
    <button type="submit" className="search-button">Search</button>
  </form>

    <div className='home'>
      
      <div className="movies-grid">
        {movies.map((movie)=>(
           movie.title.toLocaleLowerCase().startsWith(searchQuery)&& <MovieCard movie={movie} key={movie.id}/>
        ))}
      </div>
    </div>

    </>
  )
}

export default Home
