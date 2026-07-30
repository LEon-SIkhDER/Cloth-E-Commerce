import React from 'react';
import { Toaster } from 'react-hot-toast';

const MainLayout = ({children}) => {
    return (
        <div className="min-h-screen bg-[#f8f5ef]">
            <Toaster></Toaster>
            {children}
        </div>
    );
};

export default MainLayout;
