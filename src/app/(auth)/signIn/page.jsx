import React from 'react';
import SignInForm from './SignInForm';

const SignIn = () => {
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-md rounded-xl  p-8 shadow-lg">
                <h2 className="mb-6 text-center text-2xl font-semibold">Sign Up</h2>
                <SignInForm></SignInForm>
            </div>
        </div>
    );
};

export default SignIn;