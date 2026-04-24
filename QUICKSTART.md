# 🎬 MovieNight - Quick Start Guide

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Install Dependencies
```bash
npm install
```

### Environment Setup
Create a `.env` file in the root directory with your TMDB API key:

```env
VITE_API_KEY=your_tmdb_api_key_here
VITE_BASE_URL=https://api.themoviedb.org/3
```

Get your free API key from [The Movie Database (TMDB)](https://www.themoviedb.org/settings/api)

### Development Server
```bash
npm run dev
```
The app will be available at `http://localhost:5173`

### Build for Production
```bash
npm run build
```

## 🎯 Feature Overview

### ❤️ Add/Remove Favorites
- Click the heart icon on any movie card
- Empty heart (🤍) = not favorited
- Filled heart (❤️) = favorited
- View all favorites on the Favorites page

### 🎥 Watch Movies
1. Click any movie card to open the player
2. Use controls at the bottom of the video:
   - **▶/⏸** - Play/Pause
   - **Progress bar** - Seek through video
   - **Volume slider** - Adjust volume
   - **Speed dropdown** - Change playback speed
   - **Quality dropdown** - Change video quality
   - **CC button** - Upload subtitles
   - **⬇ Download** - Download the movie

### ⏱️ Playback Speed
Select from: 0.5x, 1x (default), 1.5x, 2x

### 📺 Video Quality
Select from: 480p, 720p, 1080p

### CC Subtitles
- Click CC button to upload subtitle files
- Supported formats: .srt, .vtt
- Subtitle filename appears in player info

### ⬇️ Download
- Click Download button to save movie
- File includes quality in name (e.g., `movie-123-720p.mp4`)

## 📱 Responsive Design
- Works on desktop, tablet, and mobile
- Player adapts to screen size
- Touch-friendly controls on mobile

## 🔍 Searching
- Use search bar on home page to find movies
- Results powered by TMDB API
- Click on results to open player

## 💾 Data Storage
- Favorites are saved automatically in browser storage
- Persistent across sessions
- No account required

## ⌨️ Keyboard Shortcuts (Browser native)
- **Space** - Play/Pause (when player is focused)
- **F** - Fullscreen
- **M** - Mute/Unmute
- **→/←** - Forward/Backward 5 seconds

## 🐛 Troubleshooting

**"Video won't play"**
- Check your internet connection
- Ensure video URL is accessible
- Try a different quality

**"Favorites not saving"**
- Check if browser allows localStorage
- Clear browser cache if having issues
- Try incognito/private mode to rule out extensions

**"Subtitles not showing"**
- Verify subtitle file format (.srt or .vtt)
- Check file encoding is UTF-8
- Current version shows file is loaded; full rendering requires additional libraries

**"Download not working"**
- Check browser download settings
- Try a different browser
- Ensure pop-ups are not blocked

## 📚 Project Files

### Key Components
- `src/Components/MovieCard.jsx` - Movie card component
- `src/Pages/Home.jsx` - Home page with search
- `src/Pages/MoviePlayer.jsx` - Video player with all features
- `src/Pages/Favourite.jsx` - Favorites management
- `src/context/FavoritesContext.jsx` - Global state management

### Styling
- `src/css/moviePlayer.css` - Player controls styling
- `src/css/movieCard.css` - Card styling
- `src/css/app.css` - Global styles

## 🚀 Next Steps

1. Add your TMDB API key to `.env`
2. Run `npm run dev`
3. Navigate to http://localhost:5173
4. Start exploring movies!

## 📖 API Documentation
- [TMDB API Docs](https://developers.themoviedb.org/3)

---

Enjoy your MovieNight! 🍿🎬
