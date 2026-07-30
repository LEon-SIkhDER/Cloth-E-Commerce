import React from 'react';
import Link from 'next/link';
import SignInForm from './SignInForm';
import Image from 'next/image';
import Logo from '@/Components/Logo';

const SignIn = () => {
    return (
        <main className="grid min-h-screen items-center px-4 py-10 lg:grid-cols-[1fr_0.9fr] lg:px-12">
            <section className="hidden h-[calc(100vh-5rem)] overflow-hidden rounded-[2rem] bg-[#1f2520] text-[#fffaf1] lg:block">
                <div className="relative h-full">
                    <Image
                        src="https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&w=1200&q=85"
                        alt="Premium clothing editorial"
                        fill
                        priority
                        sizes="50vw"
                        className="object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1f2520] via-[#1f2520]/35 to-transparent" />
                    <div className="absolute bottom-0 p-10">
                        <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#d6a273]">Threadora Studio</p>
                        <h1 className="mt-4 max-w-xl text-5xl font-black leading-tight">Return to your commerce workspace.</h1>
                    </div>
                </div>
            </section>
            <section className="mx-auto w-full max-w-md">
                <Link href="/" className="inline-flex">
                    <Logo />
                </Link>
                <div className="mt-10 rounded-[1.5rem] border border-[#1f2520]/10 bg-white/80 p-8 shadow-xl shadow-[#1f2520]/5 backdrop-blur">
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#8d6047]">Welcome back</p>
                    <h2 className="mt-3 text-3xl font-black text-[#1f2520]">Sign in to Threadora</h2>
                    <p className="mt-2 text-sm text-[#667064]">Manage products, categories, and storefront inventory from one polished dashboard.</p>
                    <div className="mt-7">
                        <SignInForm></SignInForm>
                    </div>
                    <p className="mt-6 text-center text-sm text-[#667064]">
                        New here? <Link href="/signUp" className="font-bold text-[#1f2520] underline underline-offset-4">Create an account</Link>
                    </p>
                </div>
            </section>
        </main>
    );
};

export default SignIn;
