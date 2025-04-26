import React from 'react';
import { motion } from 'framer-motion';
import MovieRow from './MovieRow';

const SearchResults = ({ searchTerm }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="pt-24 px-4 md:px-8"
    >
      <h2 className="text-white text-3xl font-bold mb-8">
        Search Results for "{searchTerm}"
      </h2>
      <MovieRow type="movie" searchTerm={searchTerm} />
    </motion.div>
  );
};

export default SearchResults;