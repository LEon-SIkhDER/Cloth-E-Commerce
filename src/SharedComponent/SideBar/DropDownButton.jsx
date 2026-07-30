'use client'
import { ChevronUp } from 'lucide-react';
import React, { useContext, useEffect, useRef, useState } from 'react';
import ThemeToggle from './ThemeToggle';
import ThemeContext from '@/Context/ThemeContext';

const DropDownButton = ({ className, children }) => {
    const dropdownRef = useRef()
    const data = useContext(ThemeContext)
    console.log(data)
    const [isOpen, setOpen] = useState(false)
    useEffect(() => {
        const handleClickOutside = (e) => {
            console.log("working")
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false)
            }
        }
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [isOpen])
    return (
        <div ref={dropdownRef}>
            <ul className={` bg-white border border-gray-100 mb-2 rounded-xl p-2 duration-200 origin-bottom transition-all
                 ${isOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-95"}
                  *:hover:bg-black/10 *:px-2 *:py-1 *:rounded `} >
                <li>hello</li>
                <ThemeToggle></ThemeToggle>
            </ul>
            <div onClick={() => setOpen(prev => !prev)} className={className}>
                {children}
                <ChevronUp size={20} className={`duration-200  ${isOpen ? "-rotate-180" : ""}`} />
            </div>
        </div>
    );
};

export default DropDownButton;