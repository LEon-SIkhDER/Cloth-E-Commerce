import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, BadgeCheck, Leaf, PackageCheck, Sparkles, Truck } from 'lucide-react';

const collections = [
    {
        name: 'Relaxed Linen',
        note: 'Breathable sets for warm days',
        image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80',
    },
    {
        name: 'Workwear Ease',
        note: 'Tailored layers with soft structure',
        image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80',
    },
    {
        name: 'Evening Neutrals',
        note: 'Quiet pieces with premium finishes',
        image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=80',
    },
];

const Home = () => {
    return (
        <main>
            <section className="mx-auto grid min-h-[calc(100vh-88px)] max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
                <div className="max-w-2xl">
                    <p className="inline-flex items-center gap-2 rounded-full border border-[#1f2520]/10 bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#8d6047]">
                        <Sparkles size={15} /> Summer studio 2026
                    </p>
                    <h2 className="mt-7 text-5xl font-black leading-[0.95] text-[#1f2520] sm:text-7xl">
                        Modern cloth for a slower, sharper wardrobe.
                    </h2>
                    <p className="mt-6 max-w-xl text-lg leading-8 text-[#5f685c]">
                        Discover refined essentials, versatile silhouettes, and quietly premium pieces designed for everyday confidence.
                    </p>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <a href="#collections" className="btn btn-primary h-12 rounded-full px-7">
                            Shop collection <ArrowRight size={18} />
                        </a>
                        <Link href="/dashboard/products" className="btn h-12 rounded-full border-[#1f2520]/15 bg-white/70 px-7 text-[#1f2520] hover:border-[#1f2520]/25 hover:bg-white">
                            Manage products
                        </Link>
                    </div>
                    <div className="mt-10 grid grid-cols-3 gap-4 border-y border-[#1f2520]/10 py-6">
                        <div>
                            <p className="text-3xl font-black">48h</p>
                            <p className="text-sm text-[#6d746a]">Fast dispatch</p>
                        </div>
                        <div>
                            <p className="text-3xl font-black">120+</p>
                            <p className="text-sm text-[#6d746a]">Curated styles</p>
                        </div>
                        <div>
                            <p className="text-3xl font-black">4.9</p>
                            <p className="text-sm text-[#6d746a]">Buyer rating</p>
                        </div>
                    </div>
                </div>
                <div className="relative min-h-[560px] overflow-hidden rounded-[2rem] bg-[#d7c8b2] shadow-2xl shadow-[#1f2520]/10">
                    <Image
                        src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85"
                        alt="Fashion model wearing layered neutral clothing"
                        fill
                        priority
                        sizes="(min-width: 1024px) 55vw, 100vw"
                        className="object-cover"
                    />
                    <div className="absolute inset-x-5 bottom-5 grid gap-3 rounded-3xl border border-white/40 bg-white/75 p-4 backdrop-blur-xl sm:grid-cols-3">
                        {['Soft cotton', 'Neutral tones', 'Ready to ship'].map((item) => (
                            <div key={item} className="rounded-2xl bg-[#fffaf1]/80 p-3 text-sm font-bold text-[#1f2520]">
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="collections" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
                    <div>
                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#8d6047]">Featured drops</p>
                        <h2 className="mt-3 text-4xl font-black text-[#1f2520]">Collections with purpose</h2>
                    </div>
                    <p className="max-w-md text-[#647061]">
                        Built around texture, fit, and repeat styling so every piece earns its place.
                    </p>
                </div>
                <div className="mt-8 grid gap-5 md:grid-cols-3">
                    {collections.map((collection) => (
                        <article key={collection.name} className="group overflow-hidden rounded-3xl border border-[#1f2520]/10 bg-white shadow-sm">
                            <div className="aspect-[4/5] overflow-hidden">
                                <Image src={collection.image} alt={collection.name} width={900} height={1125} sizes="(min-width: 768px) 33vw, 100vw" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                            </div>
                            <div className="flex items-center justify-between p-5">
                                <div>
                                    <h3 className="text-xl font-black">{collection.name}</h3>
                                    <p className="mt-1 text-sm text-[#6b7468]">{collection.note}</p>
                                </div>
                                <ArrowRight size={20} className="transition group-hover:translate-x-1" />
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section id="editorial" className="bg-[#1f2520] py-16 text-[#fffaf1]">
                <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
                    <div>
                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#d6a273]">Editorial edit</p>
                        <h2 className="mt-3 text-4xl font-black">The clean outfit formula.</h2>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-3">
                        {[
                            ['01', 'Start with breathable base layers.'],
                            ['02', 'Add one structured overshirt or jacket.'],
                            ['03', 'Finish with grounded neutral accessories.'],
                        ].map(([step, text]) => (
                            <div key={step} className="rounded-3xl border border-white/10 bg-white/5 p-6">
                                <p className="text-sm font-bold text-[#d6a273]">{step}</p>
                                <p className="mt-5 text-lg font-semibold leading-7">{text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="quality" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="grid gap-4 md:grid-cols-4">
                    {[
                        [Leaf, 'Responsible fabrics', 'Soft-touch materials selected for comfort and durability.'],
                        [Truck, 'Fast fulfillment', 'A streamlined order flow for quick dispatch and updates.'],
                        [PackageCheck, 'Quality packed', 'Every order is checked, folded, and protected before shipping.'],
                        [BadgeCheck, 'Easy confidence', 'Clear sizing, simple styling, and reliable wardrobe staples.'],
                    ].map(([Icon, title, text]) => (
                        <div key={title} className="rounded-3xl border border-[#1f2520]/10 bg-white/70 p-6 shadow-sm">
                            <Icon className="text-[#8d6047]" size={26} />
                            <h3 className="mt-5 text-lg font-black">{title}</h3>
                            <p className="mt-2 text-sm leading-6 text-[#687365]">{text}</p>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
};

export default Home;
