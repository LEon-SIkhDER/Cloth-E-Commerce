import Link from 'next/link';
import SignUpForm from './SignUpForm';
import Image from 'next/image';
import Logo from '@/Components/Logo';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

const inputClass = "w-full rounded-2xl border border-[#1f2520]/10 bg-[#fffaf1] px-4 py-3 outline-none transition focus:border-[#1f2520]";

const SignUp = async () => {
    const user = await auth.api.getSession({
        headers: await headers() // headers containing the user's session token
    });

    if (user) return redirect("/")
    return (
        <main className="grid min-h-screen items-center px-4 py-10 lg:grid-cols-[0.9fr_1fr] lg:px-12">
            <section className="mx-auto w-full max-w-md">

                <Logo />

                <div className="mt-10 rounded-3xl border border-[#1f2520]/10 bg-white/80 p-8 shadow-xl shadow-[#1f2520]/5 backdrop-blur">
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#8d6047]">Join the studio</p>
                    <h2 className="mt-3 text-3xl font-black text-[#1f2520]">Create your account</h2>
                    <div className="mt-7">
                        <SignUpForm>
                            <div>
                                <label className="mb-2 block text-sm font-bold text-[#31382f]">Name</label>
                                <input type="text" name="name" placeholder="Enter your name" required className={inputClass} />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-bold text-[#31382f]">Email</label>
                                <input type="email" name="email" placeholder="Enter your email" required className={inputClass} />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-bold text-[#31382f]">Password</label>
                                <input type="password" name="password" placeholder="Enter your password" required className={inputClass} />
                            </div>

                        </SignUpForm>
                    </div>
                    <p className="mt-6 text-center text-sm text-[#667064]">
                        Already have an account? <Link href="/signIn" className="font-bold text-[#1f2520] underline underline-offset-4">Sign in</Link>
                    </p>
                </div>
            </section>
            <section className="hidden h-[calc(100vh-5rem)] overflow-hidden rounded-4xl bg-[#1f2520] text-[#fffaf1] lg:block">
                <div className="relative h-full">
                    <Image
                        src="https://images.unsplash.com/photo-1551232864-3f0890e580d9?auto=format&fit=crop&w=1200&q=85"
                        alt="Clothing rack in a professional studio"
                        fill
                        priority
                        sizes="50vw"
                        className="object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#1f2520] via-[#1f2520]/35 to-transparent" />
                    <div className="absolute bottom-0 p-10">
                        <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#d6a273]">Designed for sellers</p>
                        <h1 className="mt-4 max-w-xl text-5xl font-black leading-tight">Step into a world of fashion made for you.</h1>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default SignUp;
