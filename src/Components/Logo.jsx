import React from 'react';

const Logo = () => {
    return (
        <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-full bg-[#1f2520] text-lg font-black text-[#fffaf1] shadow-sm">
                T
            </div>
            <div>
                <h1 className="text-xl font-black tracking-wide text-[#1f2520]">Threadora</h1>
                <p className="text-xs uppercase tracking-[0.22em] text-[#7b7164]">Cloth Studio</p>
            </div>
        </div>
    );
};

export default Logo;
