"use client"
import React, { useEffect, useState } from 'react';
import ThemeContext from './ThemeContext';

const ThemeProvider = ({ children }) => {
    const [, setForceRender] = useState(0)
    const [isDark, setDark] = useState(
        () => {
            if (typeof window === "undefined") return true
            const theme = localStorage.getItem("dark")
            if (theme) {
                setForceRender(prev => prev + 1)

                return theme === 'true'
            }
            else {
                setForceRender(prev => prev + 1)
                return true
            }
        }
    )
    console.log(isDark)
    const setTheme = (theme) => {
        // data theme


        document.documentElement.setAttribute('data-theme', theme ? "dark" : "light")
        // document.documentElement.dataset.theme = theme
        // body dark
        if (theme) {
            document.documentElement.classList.add("dark")
        }
        else {
            document.documentElement.classList.remove('dark')
        }

    }
    useEffect(() => {
        const theme = localStorage.getItem("dark")
        if (theme) {
            setTheme(theme === "true")
        }

    }, [])

    const handleSetDark = (theme) => {
        localStorage.setItem('dark', theme)
        setDark(theme)
        setTheme(theme)
    }



    const context = {
        isDark,
        handleSetDark
    }
    return (
        <ThemeContext value={context}>{children}</ThemeContext>
    );
};

export default ThemeProvider;