import React, { useState } from 'react';
import { useRouter } from 'next/router'; // Importa useRouter de next/router

const NavItems = () => {
    const router = useRouter(); // Utiliza el hook useRouter
    const handleNavigation = (path) => {
        router.push(`/${path.toLowerCase()}`); // Navega a la ruta especificada
    };

    return (
        <div className='bg-zinc-900 h-fit flex items-center justify-around rounded-full mx-6 text-blue-50'>
            <p
                className="p-1 px-4 cursor-pointer border-[4px] border-transparent flex items-center"
                onClick={() => handleNavigation('/')}
            >
                Swap
            </p>
            <p
                className="p-1 px-4 cursor-pointer border-[4px] border-transparent flex items-center"
                onClick={() => handleNavigation('Pool')}
            >
                Pool
            </p>
            <p
                className="p-1 px-4 cursor-pointer border-[4px] border-transparent flex items-center"
                onClick={() => handleNavigation('Tokens')}
            >
                Tokens
            </p>
        </div>
    );
};

export default NavItems;
