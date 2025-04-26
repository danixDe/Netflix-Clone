import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaPlay, FaInfoCircle } from 'react-icons/fa';
import ReactPlayer from 'react-player';

const Hero = () => {
  const [movie, setMovie] = useState(null);
  const [showVideo, setShowVideo] = useState(false);
  
  useEffect(() => {
    const fetchFeaturedMovie = async () => {
      try {
        const response = await axios.get(
          `http://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&i=tt0111161&plot=full`
        );
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching featured movie:', error);
      }
    };
    
    fetchFeaturedMovie();
  }, []);

  if (!movie) return null;

  return (
    <div className="relative h-[95vh] mb-40 px-10 w-full">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute w-full h-full"
      >
        {showVideo ? (
          <div className="absolute inset-0 bg-black">
            <ReactPlayer
              url="https://www.youtube.com/watch?v=NmzuHjWmXOc"
              playing
              width="100%"
              height="100%"
              onEnded={() => setShowVideo(false)}
            />
          </div>
        ) : (
          <>
            <img
              src={movie.Poster}
              alt={movie.Title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-netflix-black via-netflix-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-transparent to-netflix-black/40" />
          </>
        )}
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-0 left-0 p-8 space-y-6 max-w-2xl"
      >
        <h1 className="text-6xl md:text-7xl font-bold text-white">
          {movie.Title}
        </h1>
        <p className="text-white text-lg line-clamp-3">
          {movie.Plot}
        </p>
        <div className="flex space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowVideo(true)}
            className="flex items-center bg-white text-black px-8 py-2 rounded font-semibold hover:bg-white/80 transition"
          >
            <FaPlay className="mr-2" /> Play
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center bg-gray-500/70 text-white px-8 py-2 rounded font-semibold hover:bg-gray-500/50 transition"
          >
            <FaInfoCircle className="mr-2" /> More Info
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

export default Hero;