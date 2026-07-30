"use client"
import React, { useState } from 'react';
import ThemeContext from './ThemeContext';

const ThemeProvider = ({ children }) => {
    const [isDark, setDark] = useState(() => {
        const theme = localStorage.getItem("dark")
        if (theme) return theme
        else return false
    })

    const handleSetDark = (theme) => {
        localStorage.setItem('dark', theme)
        setDark(theme)
    }


    const context = {
        isDark,
        handleSetDark
    }
    return (
        <ThemeContext value={context}><div className={isDark ? "dark" : ""} data-theme={isDark ? "dark" : "light"}>{children}</div></ThemeContext>
    );
};

export default ThemeProvider;