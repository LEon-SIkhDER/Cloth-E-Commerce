'use client'
import ThemeContext from '@/Context/ThemeContext';
import React, { useContext } from 'react';

const ThemeToggle = () => {
    const { isDark, handleSetDark } = useContext(ThemeContext)
    console.log(isDark)

    return (
        <li className='flex justify-between'>
            <span className='block'>Dark Mode</span>
            <input onChange={(e) => handleSetDark(e.target.checked)} type="checkbox" defaultChecked className=" toggle border-[#fffaf1] bg-[#fffaf1] checked:border-[#1f2937] checked:bg-[#1f2937]
                     checked:text-[#fffaf1] hover:brightness-95 transition-all"/>
        </li>
    );
};

export default ThemeToggle;