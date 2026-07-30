"use client"
import { authClient } from '@/lib/auth-client';
import { LogOutIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const LogOut = () => {
    const router = useRouter()
    const { isLoading } = authClient.useSession()
    if (isLoading) {
        console.log("wait")
    }

    const logOut = () => {
        Swal.fire({
            title: "Sign out?",
            text: "You can sign back in anytime.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#1f2520",
            cancelButtonColor: "#a8553a",
            confirmButtonText: "Yes, sign out"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await authClient.signOut()
                    router.push("/signIn")

                } catch (error) {
                    toast.error("Logout failed")
                }
            }
        });
    }


    return (
        <button
            onClick={logOut}
            className="btn mt-4 w-full rounded-2xl border-[#1f2520]/10 bg-white text-[#a74432] shadow-none hover:border-[#a74432]/30 hover:bg-[#fff4f1]">
            Sign out
            <LogOutIcon size={16} className="mt-0.5" />
        </button>

    );
};

export default LogOut;
