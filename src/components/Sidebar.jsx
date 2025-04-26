import React from 'react';
import { motion } from 'framer-motion';
import { FaTimes, FaHome, FaFilm, FaTv, FaList, FaHeart, FaCog } from 'react-icons/fa';

const Sidebar = ({ isOpen, onClose }) => {
  const menuItems = [
    { icon: FaHome, label: 'Home' },
    { icon: FaFilm, label: 'Movies' },
    { icon: FaTv, label: 'TV Shows' },
    { icon: FaList, label: 'My List' },
    { icon: FaHeart, label: 'Favorites' },
    { icon: FaCog, label: 'Settings' }
  ];

  const sidebarVariants = {
    open: { x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
    closed: { x: "-100%" }
  };

  const itemVariants = {
    open: {
      x: 0,
      opacity: 1,
      transition: { staggerChildren: 0.07, delayChildren: 0.2 }
    },
    closed: {
      x: -20,
      opacity: 0,
      transition: { staggerChildren: 0.05, staggerDirection: -1 }
    }
  };

  return (
<motion.div
  initial="closed"
  animate={isOpen ? "open" : "closed"}
  exit="closed"
  variants={sidebarVariants}
  className="fixed top-0 left-0 h-full w-64 bg-netflix-black/95 backdrop-blur-sm z-50 shadow-xl"
>
      <div className="p-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="text-netflix-gray-light hover:text-white absolute top-4 right-4"
        >
          <FaTimes size={24} />
        </motion.button>
        
        <motion.div variants={itemVariants} className="mt-16 space-y-2">
          {menuItems.map((item, index) => (
            <motion.button
              key={index}
              whileHover={{ x: 10 }}
              className="flex items-center space-x-4 text-netflix-gray-light hover:text-white w-full p-4 rounded-lg transition-colors hover:bg-netflix-gray-dark/50"
            >
              <item.icon size={20} />
              <span className="text-lg">{item.label}</span>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Sidebar;