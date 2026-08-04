import React from 'react';
import { SkeletonTheme } from 'react-loading-skeleton';

const SkeletonThemeProvider = ({ children }) => {
    return (
        <SkeletonTheme baseColor="#eee6da" highlightColor="#fbf8f1">
            {/* <SkeletonTheme baseColor="#e8dece" highlightColor="#fffaf1"> */}
            {children}

        </SkeletonTheme>
    );
};

export default SkeletonThemeProvider;