import React, { useEffect, useState } from 'react';
import { Dropdown } from '@nextui-org/react';
import { DEFAULT_VALUE, ETH } from '../utils/SupportedCoins';

// Simulate fetching tokens from Uniswap or an external source
const fetchTokensFromUniswap = async () => {
    // Replace this code with the actual call to the Uniswap API or method to fetch tokens
    return [
        { key: 'ETH', name: 'Ethereum' },
        { key: 'DAI', name: 'DAI' },
        { key: 'ESGI', name: 'ESGI' },
        { key: 'WETH9', name: 'WETH9' },
        { key: 'USDC', name: 'USDC' },
    ];
};

const Selector = ({ defaultValue, ignoreValue, setToken, id }) => {
    const [selectedItem, setSelectedItem] = useState();
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        // Function to fetch tokens and filter out the ignored one
        const loadTokens = async () => {
            const tokens = await fetchTokensFromUniswap();
            const filteredTokens = tokens.filter(token => token.key !== ignoreValue);
            setMenuItems(filteredTokens);
            if (defaultValue) {
                setSelectedItem(defaultValue);
            }
        };

        loadTokens();
    }, [defaultValue, ignoreValue]);

    return (
        <Dropdown>
            <Dropdown.Button
                css={{
                    backgroundColor: selectedItem === DEFAULT_VALUE ? '#2172e5' : '#2c2f36',
                }}
            >
                {selectedItem || 'Select Token'}
            </Dropdown.Button>
            <Dropdown.Menu
                aria-label='Dynamic Actions'
                items={menuItems}
                onAction={key => {
                    setSelectedItem(key);
                    setToken(key);
                }}
            >
                {item => (
                    <Dropdown.Item
                        aria-label={id}
                        key={item.key}
                        color={item.key === 'delete' ? 'error' : 'default'}
                    >
                        {item.name}
                    </Dropdown.Item>
                )}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default Selector;
