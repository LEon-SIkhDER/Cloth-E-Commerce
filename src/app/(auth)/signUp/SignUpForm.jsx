"use client"
import { authClient } from '@/lib/auth-client';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const SignUpForm = ({children}) => {
    const [loading, setLoading] = useState(false)

    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = Object.fromEntries(new FormData(e.target));
        formData.callbackURL = "/";

        const { data, error } = await authClient.signUp.email(formData);
        if (error) {
            setLoading(false);
            toast.error(error.message || "Sign up failed");
            return;
        }
        if (data) {
            setLoading(false);
            toast.success("Account created successfully");
            e.target.reset();
        }
    }

    return (
        <form onSubmit={handleSignUp} className="space-y-5">
            {children}
            <button type="submit" className="btn btn-primary h-12 w-full rounded-full font-bold">
                {loading ?
                    <span className="loading loading-spinner loading-md "></span> :
                    "Create account"
                }
            </button>
        </form>
    );
};

export default SignUpForm;
