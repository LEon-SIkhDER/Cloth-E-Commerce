import Logo from '@/Components/Logo';
import Link from 'next/link';
import LogOut from './LogOut';

import { Handbag, House, LayoutGrid } from 'lucide-react';

const SideBar = ({ pages }) => {






    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                <div className='p-5'>
                    {pages}
                </div>
                <label htmlFor="my-drawer-3" className="btn drawer-button lg:hidden">
                    Open drawer
                </label>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 min-h-full w-80 p-4">
                    {/* Sidebar content here */}
                    <Logo></Logo>
                    <li className='text-xl'><Link href={"/"}><House />Home</Link></li>
                    <li className='text-xl'><Link href={"/categories"}><LayoutGrid />Categories</Link></li>
                    <li className='text-xl'><Link href={"/products"}><Handbag />Products</Link></li>
                    <LogOut></LogOut>
                </ul>
            </div>
        </div>
    );
};

export default SideBar;