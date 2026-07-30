'use client'
import { useRouter } from 'next/navigation';
import React from 'react';

const NavigateBackButton = ({ children, className }) => {
    const router = useRouter()
    return (
        <button onClick={() => router.back()} className={className}>
            {children}
        </button>
    );
};

export default NavigateBackButton;