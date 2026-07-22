'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const NavLink = ({ children, to, className = '' }) => {
    const location = usePathname()
    return (
        <Link href={to} className={`${to === location ? "active" : ""} ${className}`} >{children}</Link>
    );
};

export default NavLink;