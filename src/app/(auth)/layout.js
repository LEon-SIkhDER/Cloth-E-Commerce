import React from 'react';
import { Toaster } from 'react-hot-toast';
// import "../globals.css"

const MainLayout = ({children}) => {
    return (
        <div>
            <Toaster></Toaster>
            {children}
        </div>
    );
};

export default MainLayout;