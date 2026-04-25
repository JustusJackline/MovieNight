# MovieNight - Movie Streaming Platform

MovieNight is a React + Vite web application for browsing and streaming movies online with advanced player controls, favorites management, and watch history tracking.

## Features

- **Browse & Search Movies**: Search and explore popular movies using TMDB API
- **Stream Movies Online**: Watch movies directly in your browser with high-quality streaming
- **Advanced Video Player**: Full-featured HTML5 player with:
  - Play/Pause controls with intuitive UI
  - Playback speed adjustment (0.5x, 1x, 1.5x, 2x)
  - Quality selection (480p, 720p, 1080p)
  - Subtitle upload support (.srt, .vtt files)
  - Volume control and progress seeking
  - Loading and buffering indicators for smooth streaming experience
- **Favorites System**: Add/remove favorite movies (persisted in localStorage)
- **Watch History**: Automatic tracking of movies you've watched
- **Genre Filtering**: Filter movies by genre across all pages
- **Sticky Navigation**: Always-visible navbar and genre sidebar for easy navigation

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

## How to Stream Movies

1. **Browse or Search**: Navigate the home page or use the search bar to find movies
2. **Select a Movie**: Click on any movie card to view details
3. **Click "Stream Now"**: Press the blue "Stream Now" button to watch the movie
4. **Control Your Experience**: Use the player controls to:
   - Adjust playback speed to watch faster or slower
   - Switch quality based on your internet connection
   - Upload subtitles if needed
   - Control volume and seek through the video
5. **Automatic Tracking**: Your watched movies appear in Watch History

## Using the App

### Browsing Movies
- **Home Page**: Displays popular movies automatically
- **Search Bar**: Type a movie title to search
- **Genre Filter**: Click any genre in the sidebar to filter movies by category
- **Works on All Pages**: Genre filtering works on Home, Favorites, and Watch History pages

### Streaming Movies
- Click any movie card to open the player
- Click "Stream Now" button to start watching
- Use player controls for quality, speed, and subtitles
- Buffering indicators show when video is loading

### Managing Favorites
- Click the heart icon on movie cards to add/remove favorites
- View all your favorite movies on the Favorites page
- Filter favorites by genre

### Watch History
- Every movie you stream is automatically saved
- Access your watch history from "Watch History" page
- Continue watching or remove movies from your history
- Filter watch history by genre

## Project Structure

```
src/
├── Components/
│   ├── MovieCard.jsx       # Movie card with watch and favorite options
│   ├── Navbar.jsx          # Main navigation bar
│   └── Sidebar.jsx         # Genre filter sidebar
├── Pages/
│   ├── Home.jsx            # Home page with movies grid
│   ├── Favourite.jsx       # Favorites page
│   ├── Downloads.jsx       # Watch history page
│   └── MoviePlayer.jsx     # Full video player with controls
├── context/
│   ├── FavoritesContext.jsx
│   ├── FavoritesContextFile.js
│   └── useFavorites.js
├── services/
│   └── api.js              # TMDB API integration
├── css/                    # Styling for all components
└── App.jsx                 # Main app component
```

## Pushing to GitHub

### Recommended Git Commands

```bash
# Stage all changes
git add .

# Commit with descriptive message
git commit -m "feat: movie streaming platform with player, favorites, and watch history"

# Push to main branch
git push origin main
```

### If creating a new remote:
```bash
git remote add origin git@github.com:yourusername/movienight.git
git push -u origin main
```

### Commit Message Examples:
```bash
git commit -m "feat(player): add loading and buffering indicators"
git commit -m "feat(history): automatic watch history tracking"
git commit -m "fix(sidebar): genre filtering on all pages"
git commit -m "feat(readme): update documentation for streaming focus"
```

## Tech Stack

- **React 19.2.4**: Latest React with hooks and context API
- **Vite 8.0.1**: Fast build tool and dev server
- **React Router DOM 7.13.2**: Client-side routing
- **TMDB API**: Movie data and metadata
- **localStorage**: Client-side data persistence
- **HTML5 Video API**: Native video player

## Environment Variables

```env
VITE_API_KEY=your_tmdb_api_key_here
VITE_BASE_URL=https://api.themoviedb.org/3
```

## Features in Detail

### Video Quality Switching
- Select from 480p (low bandwidth), 720p (standard), or 1080p (high quality)
- Quality changes apply immediately without restarting playback
- Perfect for different internet speeds and devices

### Playback Speed Control
- Watch at 0.5x speed for detailed viewing
- Watch at 1x normal speed (default)
- Watch at 1.5x for faster viewing
- Watch at 2x for quick scanning

### Subtitle Support
- Upload .srt or .vtt subtitle files
- Automatically tracked and saved during playback
- Easy file upload through player controls

### Streaming Experience
- Smooth buffering indicators show loading progress
- Loading spinner displays when video is preparing
- Responsive design works on desktop, tablet, and mobile
- Genre filtering works across all pages (Home, Favorites, Watch History)

## License

MIT License

## Contributing

Feel free to fork this project and submit pull requests for any improvements!
