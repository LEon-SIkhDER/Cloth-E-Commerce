import React from 'react';
import Link from 'next/link';
import { ArrowRight, Menu, Search, ShoppingBag, UserRound } from 'lucide-react';
import Logo from '@/Components/Logo';

const HomeLayout = ({children}) => {
    return (
        <div className="min-h-screen">
            <header className="sticky top-0 z-30 border-b border-[#1f2520]/10 bg-[#fbf8f1]/90 backdrop-blur-xl">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                    <Link href="/" aria-label="Threadora home">
                        <Logo />
                    </Link>
                    <nav className="hidden items-center gap-8 text-sm font-semibold text-[#4f584d] md:flex">
                        <a href="#collections" className="transition hover:text-[#1f2520]">Collections</a>
                        <a href="#editorial" className="transition hover:text-[#1f2520]">Editorial</a>
                        <a href="#quality" className="transition hover:text-[#1f2520]">Quality</a>
                        <Link href="/dashboard" className="transition hover:text-[#1f2520]">Dashboard</Link>
                    </nav>
                    <div className="flex items-center gap-2">
                        <button className="btn btn-ghost btn-circle hidden sm:inline-flex" aria-label="Search">
                            <Search size={19} />
                        </button>
                        <Link href="/signIn" className="btn btn-ghost btn-circle" aria-label="Account">
                            <UserRound size={19} />
                        </Link>
                        <button className="btn btn-primary btn-circle" aria-label="Cart">
                            <ShoppingBag size={19} />
                        </button>
                        <button className="btn btn-ghost btn-circle md:hidden" aria-label="Menu">
                            <Menu size={20} />
                        </button>
                    </div>
                </div>
            </header>
            {children}
            <footer className="border-t border-[#1f2520]/10 bg-[#1f2520] text-[#fffaf1]">
                <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
                    <div>
                        <p className="text-2xl font-black">Threadora</p>
                        <p className="mt-3 max-w-sm text-sm leading-6 text-[#d9d0c3]">
                            Elevated everyday essentials, built for comfortable movement and repeat wear.
                        </p>
                    </div>
                    <div>
                        <p className="font-semibold">Studio</p>
                        <div className="mt-3 grid gap-2 text-sm text-[#d9d0c3]">
                            <a href="#collections">Collections</a>
                            <a href="#quality">Materials</a>
                            <a href="#editorial">Lookbook</a>
                        </div>
                    </div>
                    <Link href="/signUp" className="group inline-flex items-center gap-2 self-start text-sm font-semibold">
                        Create an account
                        <ArrowRight size={16} className="transition group-hover:translate-x-1" />
                    </Link>
                </div>
            </footer>
        </div>
    );
};

export default HomeLayout;
