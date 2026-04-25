

const API_KEY=import.meta.env.VITE_API_KEY

const BASE_URL=import.meta.env.VITE_BASE_URL

export const getPopularMovies=async()=>{
    const response=await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    const data=await response.json();
    return data.results;
}

export const SearchMovies=async(query)=>{
    const response=await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
    const data=await response.json();
    return data.results;
}

export const getMoviesByGenre=async(genreId)=>{
    const response=await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`);
    const data=await response.json();
    return data.results;
}

export const getMovieDetails=async(movieId)=>{
    const response=await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
    const data=await response.json();
    return data;
}
