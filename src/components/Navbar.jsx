import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaBell, FaUser, FaBars } from 'react-icons/fa';

const Navbar = ({ onSearch, onShowSearch, onMenuClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch(value);
    onShowSearch(!!value);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-10 transition-all duration-500 ${
        isScrolled ? 'bg-netflix-black' : 'bg-gradient-to-b from-black/70 to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onMenuClick}
              className="text-white hover:text-netflix-red transition-colors"
            >
              <FaBars size={24} />
            </motion.button>
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-netflix-red text-4xl font-bold"
            >
              NETFLIX
            </motion.h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <AnimatePresence>
              <motion.div 
                className="relative"
                animate={{ width: isSearchFocused ? '300px' : '200px' }}
                transition={{ duration: 0.3 }}
              >
                <FaSearch className="absolute left-3 top-2.5 text-netflix-gray-light" />
                <input
                  type="text"
                  value={searchValue}
                  onChange={handleSearchChange}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  placeholder="Search titles..."
                  className="bg-netflix-gray-dark text-white pl-10 pr-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-netflix-red w-full transition-all"
                />
              </motion.div>
            </AnimatePresence>
            
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-white hover:text-netflix-red transition-colors"
            >
              <FaBell size={20} />
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-white hover:text-netflix-red transition-colors"
            >
              <FaUser size={20} />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

export default Navbar;