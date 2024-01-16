// Navbar.tsx
import React from 'react';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Navbar: React.FC = () => {
  return (
    <div className="navbar">
      <div className="left-section">
        <span className="logo">DeSwap</span>
        <div className="nav-links">
          <span>Swap</span>
          <span>Tokens</span>
          <span>Pool</span>
        </div>
      </div>
      <div className="right-section">
        <div className="search-container">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input type="text" placeholder="Search tokens" />
        </div>
      </div>
      <div className="connection-button">
        <button>Connect </button>
      </div>
    </div>
  );
};

export default Navbar;
