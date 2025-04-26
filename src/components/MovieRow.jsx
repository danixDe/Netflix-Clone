import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

const MovieRow = ({ title, type, genre }) => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let searchQuery = type;
        if (genre) {
          searchQuery += ` ${genre}`;
        }
        
        const response = await axios.get(
          `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&s=${searchQuery}&type=${type}`
        );
        
        if (response.data.Search) {
          const moviesWithDetails = await Promise.all(
            response.data.Search.map(async (movie) => {
              const detailResponse = await axios.get(
                `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&i=${movie.imdbID}&plot=short`
              );
              return detailResponse.data;
            })
          );
          setMovies(moviesWithDetails);
          setError(null);
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
        setError('Failed to fetch movies. Please try again later.');
        setMovies([]);
      }
    };
    
    fetchMovies();
  }, [type, genre]);

  if (error) {
    return (
      <div className="mb-8">
        <h2 className="text-white text-2xl font-bold mb-4">{title}</h2>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <h2 className="text-white text-2xl font-bold mb-4">{title}</h2>
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={16}
        slidesPerView="auto"
        className="movie-swiper"
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.imdbID} style={{ width: 'auto' }}>
            <motion.div
              whileHover={{ scale: 1.05, zIndex: 1 }}
              className="relative w-[200px] group cursor-pointer"
            >
              <img
                src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450'}
                alt={movie.Title}
                className="rounded-lg w-full h-[300px] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg p-4 flex flex-col justify-end">
                <h3 className="text-white font-semibold text-sm">
                  {movie.Title}
                </h3>
                <div className="flex items-center space-x-2 mt-2">
                  <span className="text-green-500 text-sm">{movie.imdbRating}</span>
                  <span className="text-white text-sm">{movie.Year}</span>
                  <span className="text-white text-sm">{movie.Runtime}</span>
                </div>
                <p className="text-white text-xs mt-2 line-clamp-3">
                  {movie.Plot}
                </p>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
}

export default MovieRow;