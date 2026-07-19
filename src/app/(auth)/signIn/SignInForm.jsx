"use client"
import { authClient } from '@/lib/auth-client';
// import { authClient } from '@/lib/auth-client';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const SignInForm = () => {
    const [loading, setLoading] = useState(false)
    const handleSignIn = async (e) => {
        e.preventDefault();
        setLoading(true)
        const formData = Object.fromEntries(new FormData(e.target));
        formData.callbackURL = "/",
            console.log(formData);

        const { data, error } = await authClient.signIn.email(formData)
        if (error) {
            setLoading(false)
            toast.error(error.message || "LogIn failed")
            console.log(error)
        }
        if (data) {

            setLoading(false)
            console.log(data)
        }
    };

    return (
        <form onSubmit={handleSignIn} className="space-y-4">
            {/* <div>
                <label className="mb-1 block font-medium">
                    Name <span className="text-red-500">*</span>
                </label>
                <input type="text" name="name" placeholder="Enter your name" required className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500" />
            </div> */}

            <div>
                <label className="mb-1 block font-medium">
                    Email <span className="text-red-500">*</span>
                </label>
                <input type="email" name="email" placeholder="Enter your email" required className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500" />
            </div>

            <div>
                <label className="mb-1 block font-medium">
                    Password <span className="text-red-500">*</span>
                </label>
                <input type="password" name="password" placeholder="Enter your password" required className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500" />
            </div>

            {/* <div>
                <label className="mb-1 block font-medium">
                    Photo URL <span className="text-red-500">*</span>
                </label>
                <input type="url" name="image" placeholder="Enter photo URL" required className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500" />
            </div> */}

            <button type="submit" className="w-full rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700 h-10">
                {loading ?
                    <span className="loading loading-spinner loading-md "></span> :
                    "LogIn"
                }
            </button>
        </form>
    );
};

export default SignInForm;