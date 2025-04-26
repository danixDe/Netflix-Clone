import React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import MovieRow from './components/MovieRow';
import SearchResults from './components/SearchResults';

function App() {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="bg-netflix-black min-h-screen">
      <AnimatePresence>
        {sidebarOpen && (
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        )}
      </AnimatePresence>
      
      <div className="flex-1">
        <Navbar 
          onSearch={setSearchQuery} 
          onShowSearch={setShowSearch}
          onMenuClick={() => setSidebarOpen(true)}
        />
        
        <AnimatePresence mode="wait">
          {showSearch && searchQuery ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <SearchResults searchTerm={searchQuery} />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Hero />
              <div className="px-4 md:px-8 -mt-32 relative z-20 space-y-8">
                <MovieRow title="Trending Now" type="movie" />
                <MovieRow title="Popular TV Shows" type="series" />
                <MovieRow title="Top Rated Movies" type="movie" />
                <MovieRow title="Action Movies" type="movie" genre="action" />
                <MovieRow title="Comedy Shows" type="series" genre="comedy" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;