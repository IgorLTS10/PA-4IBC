import { useEffect, useState } from 'react';

const TokenListComponent = () => {
    const [tokens, setTokens] = useState([]);

    useEffect(() => {
        const fetchTokens = async () => {
            try {
                const response = await fetch('https://tokens.coingecko.com/uniswap/all.json');
                const tokenListJSON = await response.json();
                setTokens(tokenListJSON.tokens);
            } catch (error) {
                console.error("Error fetching tokens:", error);
            }
        };

        fetchTokens();
    }, []);

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb 4">Available Tokens</h2>
            <div className="w-full max-w-4xl">
                <script src="https://widgets.coingecko.com/coingecko-coin-list-widget.js"></script>
                <coingecko-coin-list-widget  coin-ids="bitcoin,ethereum,eos,ripple,litecoin" currency="usd" locale="fr" width="900"></coingecko-coin-list-widget>
            </div>
        </div>
    );
};

export default TokenListComponent;
