"use client"
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
// import { useRouter } from 'next/router';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const SignUpForm = ({ children }) => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = Object.fromEntries(new FormData(e.target));
        formData.role = 'user'
        console.log(formData)


        const { data, error } = await authClient.signUp.email(formData);
        if (error) {
            setLoading(false);
            toast.error(error.message || "Sign up failed");
            return;
        }
        if (data) {
            setLoading(false);
            router.push("/")
            e.target.reset();
        }
    }

    return (
        <>
            <form onSubmit={handleSignUp} className="space-y-5">
                {children}
                <button type="submit" className="btn btn-primary h-12 w-full rounded-full font-bold">
                    {loading ?
                        <span className="loading loading-spinner loading-md "></span> :
                        "Create account"
                    }
                </button>
            </form>
            <div className="divider">OR</div>
            <button className="btn bg-white text-black border-[#e5e5e5] rounded-full w-full h-12">
                <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                Login with Google
            </button>
        </>
    );
};

export default SignUpForm;
