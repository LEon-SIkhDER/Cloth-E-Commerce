import React from 'react';
import Link from 'next/link';
import { ArrowRight, Boxes, LayoutGrid, PackagePlus, TrendingUp } from 'lucide-react';

const stats = [
    { label: 'Catalog readiness', value: '92%', icon: TrendingUp },
    { label: 'Product workflow', value: 'Live', icon: Boxes },
    { label: 'Category system', value: 'Ready', icon: LayoutGrid },
];

const Home = () => {
    return (
        <div className="space-y-8">
            <section className="overflow-hidden rounded-[1.75rem] bg-[#1f2520] text-[#fffaf1] shadow-xl shadow-[#1f2520]/10">
                <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:p-10">
                    <div>
                        <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#d6a273]">Dashboard</p>
                        <h1 className="mt-4 max-w-2xl text-4xl font-black leading-tight sm:text-5xl">Manage a cleaner fashion catalog with fewer clicks.</h1>
                        <p className="mt-4 max-w-xl text-[#d9d0c3]">Track product quality, organize categories, and keep your storefront inventory ready for customers.</p>
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <Link href="/dashboard/products" className="btn rounded-full bg-[#fffaf1] px-6 text-[#1f2520] hover:bg-white">
                                Products <ArrowRight size={17} />
                            </Link>
                            <Link href="/dashboard/categories" className="btn rounded-full border-white/15 bg-white/10 px-6 text-[#fffaf1] hover:bg-white/15">
                                Categories
                            </Link>
                        </div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                        {stats.map(({ label, value, icon: Icon }) => (
                            <div key={label} className="rounded-3xl border border-white/10 bg-white/8 p-5">
                                <Icon size={22} className="text-[#d6a273]" />
                                <p className="mt-5 text-3xl font-black">{value}</p>
                                <p className="mt-1 text-sm text-[#d9d0c3]">{label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="grid gap-5 md:grid-cols-2">
                <Link href="/dashboard/products" className="group rounded-[1.5rem] border border-[#1f2520]/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-[#1f2520]/8">
                    <PackagePlus className="text-[#8d6047]" size={28} />
                    <h2 className="mt-5 text-2xl font-black">Product management</h2>
                    <p className="mt-2 text-sm leading-6 text-[#657061]">Create product entries, review stock, adjust discounts, and maintain catalog status.</p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold">Open products <ArrowRight size={16} className="transition group-hover:translate-x-1" /></span>
                </Link>
                <Link href="/dashboard/categories" className="group rounded-[1.5rem] border border-[#1f2520]/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-[#1f2520]/8">
                    <LayoutGrid className="text-[#8d6047]" size={28} />
                    <h2 className="mt-5 text-2xl font-black">Category structure</h2>
                    <p className="mt-2 text-sm leading-6 text-[#657061]">Keep your storefront organized with clear category names, descriptions, and active states.</p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold">Open categories <ArrowRight size={16} className="transition group-hover:translate-x-1" /></span>
                </Link>
            </section>
        </div>
    );
};

export default Home;
