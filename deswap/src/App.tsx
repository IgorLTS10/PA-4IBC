import React from "react";
import "./App.css";
import Header from "./components/Navbar";
import Swap from "./components/SwapComponent";
import Tokens from "./components/Tokens";
import { Routes, Route } from "react-router-dom";
import { useConnect, useAccount } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

function App() {
    const { address, isConnected } = useAccount();
    const { connect } = useConnect({
        connector: new MetaMaskConnector(),
    });

    // Utiliza un string vacío como valor predeterminado si address es undefined
    const safeAddress = address ?? "";

    return (
        <div className="App">
            <Header connect={connect} isConnected={isConnected} address={safeAddress} />
            <div className="mainWindow">
                <Routes>
                    <Route path="/" element={<Swap isConnected={isConnected} address={safeAddress} />} />
                    <Route path="/tokens" element={<Tokens />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
