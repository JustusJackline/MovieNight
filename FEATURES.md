# MovieNight - Movie App Features

A React-based movie application with advanced features for browsing, streaming, and managing favorite movies.

## 🎬 Features Implemented

### 1. **Favorites Management** ❤️
- **Add to Favorites**: Click the heart icon on any movie card to add it to your favorites
- **Remove from Favorites**: Click the filled heart icon to remove from favorites
- **Persistent Storage**: Your favorites are saved to browser's localStorage, so they persist across sessions
- **Favorites Page**: View all your favorite movies on the dedicated favorites page

### 2. **Movie Player** 🎥
- Full-featured HTML5 video player with controls
- **Playback Controls**: Play/Pause buttons with smooth controls
- **Time Navigation**: Seek to any point in the video using the progress bar
- **Time Display**: Shows current time and total duration in MM:SS format
- **Volume Control**: Adjust volume from 0% to 100%

### 3. **Playback Speed Control** ⏱️
- Multiple speed options available:
  - 0.5x (slow motion)
  - 1x (normal speed)
  - 1.5x (fast)
  - 2x (very fast)
- Speed selection via dropdown menu in player controls

### 4. **Video Quality Selection** 📺
- Choose from multiple quality options:
  - 480p (low bandwidth)
  - 720p (balanced - default)
  - 1080p (high quality)
- Seamless quality switching without interrupting playback
- Current quality displayed in player info section

### 5. **Subtitles Support** CC
- **Upload Subtitles**: Click the CC button to upload subtitle files
- **Supported Formats**: .srt and .vtt files
- **Subtitle Status**: Visual indicator shows when subtitles are loaded
- Subtitle file name displayed in player info

### 6. **Movie Download** ⬇️
- Download movies to your device
- Download button available in player controls
- Downloads include quality indicator in filename
- Format: `movie-{movieId}-{quality}.mp4`

### 7. **Movie Card Navigation** 🖱️
- Click on any movie card to open the full video player
- Both home page and favorites page support card clicking
- Back button to return to movie list

## 📁 Project Structure

```
src/
├── Components/
│   ├── MovieCard.jsx          # Movie card with favorite toggle
│   └── Navbar.jsx              # Navigation bar
├── Pages/
│   ├── Home.jsx                # Home page with search and browse
│   ├── Favourite.jsx           # Favorites page
│   └── MoviePlayer.jsx         # Full-featured video player (NEW)
├── context/
│   └── FavoritesContext.jsx    # Global favorites state management (NEW)
├── services/
│   └── api.js                  # API service for movie data
├── css/
│   ├── app.css
│   ├── home.css
│   ├── navbar.css
│   ├── movieCard.css
│   ├── favourites.css
│   └── moviePlayer.css         # Player styling (NEW)
├── App.jsx                     # Main app component
└── main.jsx                    # Entry point
```

## 🚀 How to Use

### Browsing Movies
1. Navigate to the Home page
2. Browse popular movies or search for specific titles
3. Click on a movie card to open the player or heart icon to add to favorites

### Playing Movies
1. Click any movie card to open the video player
2. Use play/pause button to control playback
3. Drag the progress bar to seek through the video
4. Adjust volume using the volume slider

### Managing Playback
- **Speed**: Select speed from dropdown (0.5x to 2x)
- **Quality**: Change quality to 480p, 720p, or 1080p
- **Time**: View elapsed and total time

### Subtitles
1. Click the CC button in player controls
2. Select a .srt or .vtt subtitle file
3. File status will show "✓ CC" when loaded

### Downloading
1. Click the "⬇ Download" button
2. Movie will download with the selected quality in filename

### Favorites
1. Click the heart icon on movies to add to favorites
2. Filled hearts (❤️) indicate favorited movies
3. Go to Favorites page to view all saved movies

## 💾 Data Persistence

- **Favorites**: Stored in browser's localStorage
- **Auto-save**: Favorites automatically save when added/removed
- **Restore**: Favorites are automatically restored when you return to the app

## 🔧 Technical Details

### State Management
- **Favorites Context**: Centralized state management using React Context API
- Provides: `addFavorite()`, `removeFavorite()`, `isFavorite()` methods

### Video Player
- HTML5 `<video>` element with native controls
- Custom UI layer for extended functionality
- Supports multiple video sources for quality switching

### Browser Support
- Requires modern browser with HTML5 video support
- localStorage support for favorites persistence
- FileReader API for subtitle upload

## 🎯 Future Enhancements

Potential features for future versions:
- User authentication and cloud sync for favorites
- Advanced subtitle rendering with positioning
- Streaming quality auto-selection based on connection speed
- Watchlist with progress tracking
- Social features (share, rate, review)
- Multiple audio track support
- Picture-in-Picture mode

## 📝 Notes

- Demo video sources are used for testing (Google's Big Buck Bunny assets)
- Quality switching doesn't actually change video file (for demo purposes)
- Subtitles uploaded are stored locally but not rendered on video (requires video.js or similar library for full rendering)
- Download feature triggers browser download dialog

---

Built with React + Vite + React Router DOM
