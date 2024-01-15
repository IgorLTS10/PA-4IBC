// Navbar.tsx
import React from 'react';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
// Importa Link solo si lo vas a usar, de lo contrario quita la línea siguiente
// import { Link } from "react-router-dom";

interface NavbarProps {
    address: string;
    isConnected: boolean;
    connect: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ address, isConnected, connect }) => {
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
            <div className="connection-button" onClick={connect}>
                {/* Aquí puedes condicionar el texto del botón dependiendo del estado de la conexión */}
                {isConnected ? (
                    <span>{address.slice(0, 6)}...{address.slice(-4)}</span>
                ) : (
                    <button>Connect</button>
                )}
                {/* Si tienes un logo o algo similar, puedes incluirlo aquí */}
                <div className="logo-square"></div>
            </div>
        </div>
    );
}

export default Navbar;