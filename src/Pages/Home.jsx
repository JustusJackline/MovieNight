import React from 'react'
import MovieCard from '../Components/MovieCard';
import { useState, useEffect } from 'react';
import '../css/home.css';
import { SearchMovies, getPopularMovies, getMoviesByGenre, getTopRatedMovies, getNewMovies } from '../services/api';

function Home({ selectedGenre }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState('popular'); // 'popular', 'toprated', 'new'

    useEffect(() => {
        const loadMovies = async () => {
            try {
                setLoading(true)
                let moviesData;
                
                // If genre is selected, show genre movies regardless of category
                if (selectedGenre) {
                    moviesData = await getMoviesByGenre(selectedGenre)
                } else {
                    // Load based on selected category
                    switch(category) {
                        case 'toprated':
                            moviesData = await getTopRatedMovies()
                            break
                        case 'new':
                            moviesData = await getNewMovies()
                            break
                        case 'popular':
                        default:
                            moviesData = await getPopularMovies()
                            break
                    }
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
    }, [selectedGenre, category])

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

            {!selectedGenre && (
                <div className="category-tabs">
                    <button 
                        className={`tab-btn ${category === 'popular' ? 'active' : ''}`}
                        onClick={() => setCategory('popular')}
                    >
                        🔥 Popular
                    </button>
                    <button 
                        className={`tab-btn ${category === 'toprated' ? 'active' : ''}`}
                        onClick={() => setCategory('toprated')}
                    >
                        ⭐ Top Rated
                    </button>
                    <button 
                        className={`tab-btn ${category === 'new' ? 'active' : ''}`}
                        onClick={() => setCategory('new')}
                    >
                        🆕 New Movies
                    </button>
                </div>
            )}

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