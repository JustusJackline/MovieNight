# MovieNight - Movie Discovery & Watchlist Tracker

MovieNight is a React + Vite web application for discovering movies, viewing ratings and recommendations, and tracking your personal watchlist with viewing progress.

## 🌐 Live Demo

**[Visit MovieNight Now](https://movie-night-six.vercel.app)** - Discover and track movies you want to watch!

Deployment URL: `https://movie-night-six.vercel.app`

## Features

### Movie Discovery
- **Browse Movies**: Explore Popular, Top Rated, and New upcoming movies from TMDB
- **Search**: Find movies by title instantly
- **Genre Filtering**: Filter all movies by genre
- **Movie Ratings**: View TMDB ratings (1-10 scale) on every movie card to help decide what to watch
- **Movie Details**: See ratings, release dates, and IMDb scores

### Watchlist Tracking
- **Save Movies**: Save movies to your personal watchlist with one click
- **Track Status**: Mark each movie as:
  - 📕 **Not Watched** - Want to watch
  - 📘 **In Progress** - Currently watching
  - 📗 **Completed** - Finished watching
- **Update Progress**: Change status anytime from your watchlist
- **Filter by Status**: View all movies or filter by specific status
- **Persistent Storage**: Watchlist saves to browser localStorage

### Additional Features
- **Favorites**: Mark your favorite movies separately
- **Genre Sidebar**: Quick access to browse by genre
- **Sticky Navigation**: Navigation bar always visible while scrolling
- **Sticky Category Tabs**: Popular/Top Rated/New tabs stay visible for easy switching
- **Sticky Status Filter**: Watchlist status filter bar stays at top for quick filtering
- **Responsive Design**: Works on desktop, tablet, and mobile

## Quick Start

### Prerequisites
- Node.js (v14+)
- npm or yarn

### Installation

1. **Install dependencies**
```bash
npm install
```

2. **Set up environment variables**

Create a `.env` file in the project root:
```env
VITE_API_KEY=your_tmdb_api_key
VITE_BASE_URL=https://api.themoviedb.org/3
```

Get your free TMDB API key from https://www.themoviedb.org/settings/api

3. **Run development server**
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

4. **Build for production**
```bash
npm run build
```

## How to Use MovieNight

### 1. Discover Movies
- Browse **Popular**, **Top Rated**, or **New Movies** using the tabs on the home page
- Search for specific movies using the search bar
- Filter by genre using the sidebar

### 2. View Movie Details
- Click any movie card to see:
  - Movie title and release date
  - Rating (⭐ scale)
  - TMDB score
  - Similar movies

### 3. Save to Watchlist
- Click **📌 Save for Later** on any movie card
- Select initial status:
  - Not Watched (want to watch)
  - In Progress (currently watching)
  - Completed (finished watching)
- Movie is saved to your watchlist

### 4. Manage Your Watchlist
- Go to **My Watchlist** page from navbar
- Filter by status using sticky filter bar:
  - **All** - View all saved movies
  - **Not Watched** - Movies you want to watch
  - **In Progress** - Movies you're currently watching
  - **Completed** - Movies you've finished
- Update status using dropdown on each movie card
- Remove movies from watchlist with delete button

### 5. Track Your Progress
- See how many movies in each status category
- Update status as you watch movies
- Mark movies complete when finished

## Project Structure

```
src/
├── Components/
│   ├── MovieCard.jsx       # Movie card with save button
│   ├── Navbar.jsx          # Main navigation
│   └── Sidebar.jsx         # Genre filter sidebar
├── Pages/
│   ├── Home.jsx            # Movie discovery with category tabs
│   ├── Favourite.jsx       # Favorite movies page
│   ├── Downloads.jsx       # Watchlist with status tracking
│   └── MoviePlayer.jsx     # Movie details (can be enhanced)
├── context/
│   ├── FavoritesContext.jsx
│   ├── FavoritesContextFile.js
│   └── useFavorites.js
├── services/
│   └── api.js              # TMDB API integration
├── css/                    # Component styling
└── App.jsx                 # Main app component
```

## Tech Stack

- **React 19.2.4**: Latest React with hooks and context API
- **Vite 8.0.1**: Fast build tool and dev server
- **React Router DOM 7.13.2**: Client-side routing
- **TMDB API**: Movie data and metadata
- **localStorage**: Client-side data persistence
- **CSS3**: Modern styling with gradients and animations

## Environment Variables

```env
VITE_API_KEY=your_tmdb_api_key_here
VITE_BASE_URL=https://api.themoviedb.org/3
```

## Features in Detail

### Movie Categories
- **Popular**: Currently trending and popular movies
- **Top Rated**: Highest-rated movies on TMDB
- **New Movies**: Upcoming releases you can add to your watchlist

### Watchlist Status System
- **Not Watched** 📕: Movies you want to watch
- **In Progress** 📘: Movies you're currently watching
- **Completed** 📗: Movies you've finished watching
- Change status anytime from the watchlist page

### Smart Filtering
- Genre filtering works across all pages
- Status filtering on watchlist with persistent sticky bar
- Search functionality across all categories
- Combined filtering (genre + status)

## Pushing to GitHub

### Recommended Git Commands

```bash
# Stage all changes
git add .

# Commit with descriptive message
git commit -m "feat: movie discovery and watchlist tracking platform"

# Push to main branch
git push origin main
```

### If creating a new remote:
```bash
git remote add origin git@github.com:yourusername/movienight.git
git push -u origin main
```

## Deploying to Vercel

1. Push your project to GitHub
2. Go to [Vercel](https://vercel.com)
3. Click "New Project" and import from GitHub
4. Add environment variables:
   - `VITE_API_KEY`: Your TMDB API key
   - `VITE_BASE_URL`: https://api.themoviedb.org/3
5. Deploy!

Every push to GitHub will automatically redeploy your app.

## License

MIT License

## Contributing

Feel free to fork this project and submit pull requests for improvements!

## Future Enhancements

- User accounts and cloud sync
- Advanced search filters (year, director, actors)
- Movie reviews and ratings from users
- Sharing watchlists with friends
- Watch statistics and trends
- Recommended movies based on watchlist
