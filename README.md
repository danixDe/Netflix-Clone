# Netflix Clone

A clone of the Netflix homepage and streaming experience.

## Features
- Browse popular movies and TV shows
- Play trailers using YouTube integration
- Responsive design

## Tech Stack
- React.js
- OMDB API (Open Movie Database)
- Tailwind CSS

## Setup Instructions

1. Clone the repository
   git clone https://github.com/danixDe/netflix-clone.git
   cd netflix-clone

2. Install dependencies
   npm install

3. Get an API key from TMDB.

4. Create a .env file and add:
   REACT_APP_TMDB_API_KEY= omdb-api-key 

5. Start the development server
   npm run dev

6. Open http://localhost:3000 in your browser.

## Deployment

You can deploy using Netlify or Vercel.

- Build command: npm run build
- Publish directory: build/

Make sure to also add the environment variables in the deployment settings.
