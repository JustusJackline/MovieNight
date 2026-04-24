import React from 'react'
import MovieCard from '../Components/MovieCard';
import { useState, useEffect } from 'react';
import '../css/home.css';
import { SearchMovies, getPopularMovies, getMoviesByGenre } from '../services/api';

function Home({ selectedGenre }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadMovies = async () => {
            try {
                setLoading(true)
                let moviesData;
                if (selectedGenre) {
                    moviesData = await getMoviesByGenre(selectedGenre)
                } else {
                    moviesData = await getPopularMovies()
                }
                setMovies(moviesData)
                setError(null)
            } catch (err) {
                console.log(err)
                setError("Failed to load movies")
            } finally {
                setLoading(false)
            }
        }
        loadMovies()
    }, [selectedGenre])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim() || loading) return

        setLoading(true)
        try {
            const searchResult = await SearchMovies(searchQuery)
            setMovies(searchResult)
            setError(null)
        } catch (err) {
            console.log(err)
            setError("failed to search movie...")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="home">
            <form onSubmit={handleSubmit} className="search-form">
                <input
                    type="text"
                    className="search-input"
                    placeholder='search for movies....'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="search-button">Search</button>
            </form>

            {error && <div className='error-message'>{error}</div>}

            {loading ? (
                <div className="loading-container">
                    <div className="spinner"></div>
                    <p>Loading movies..</p>
                </div>
            ) : (
                <div className='movie-results'>
                    {movies.length > 0 ? (
                        <div className="movies-grid">
                            {movies.map((movie) => (
                                <MovieCard movie={movie} key={movie.id} />
                            ))}
                        </div>
                    ) : (
                        <div className="no-result">
                            <h2>No movie Found</h2>
                            <p>We couldn't find any movies matching your selection.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default Home