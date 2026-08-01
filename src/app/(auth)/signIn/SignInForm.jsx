"use client"
import { authClient } from '@/lib/auth-client';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const SignInForm = () => {
    const [loading, setLoading] = useState(false)
    const handleSignIn = async (e) => {
        e.preventDefault();
        setLoading(true)
        const formData = Object.fromEntries(new FormData(e.target));
        formData.callbackURL = "/";

        const { data, error } = await authClient.signIn.email(formData)
        if (error) {
            setLoading(false)
        }
        if (data) {
            setLoading(false)
            toast.success("Signed in successfully")
        }
    };

    return (
        <form onSubmit={handleSignIn} className="space-y-5">
            <div>
                <label className="mb-2 block text-sm font-bold text-[#31382f]">Email</label>
                <input type="email" name="email" placeholder="Enter your email" required className="w-full rounded-2xl border border-[#1f2520]/10 bg-[#fffaf1] px-4 py-3 outline-none transition focus:border-[#1f2520]" />
            </div>

            <div>
                <label className="mb-2 block text-sm font-bold text-[#31382f]">Password</label>
                <input type="password" name="password" placeholder="Enter your password" required className="w-full rounded-2xl border border-[#1f2520]/10 bg-[#fffaf1] px-4 py-3 outline-none transition focus:border-[#1f2520]" />
            </div>

            <button type="submit" className="btn btn-primary h-12 w-full rounded-full font-bold">
                {loading ?
                    <span className="loading loading-spinner loading-md "></span> :
                    "Sign in"
                }
            </button>
        </form>
    );
};

export default SignInForm;
