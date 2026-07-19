"use client"
import { authClient, useSession } from '@/lib/auth-client';
import { LogOutIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import Swal from 'sweetalert2';
// import { authClient } from "@/lib/auth-client"

const LogOut = () => {
    // const { data } = useSession()
    // console.log(data)
    const router = useRouter()
    

    const { data: session, isLoading } = authClient.useSession()
    if (isLoading) {
        console.log("wait")
    }
    // console.log(session)

    const logOut = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, LogOut!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await authClient.signOut()
                    router.push("/signIn")

                } catch (error) {
                    toast.error("LogOut Failed")
                }
            }
        });
    }


    return (
        <button
            onClick={logOut}
            className='mt-auto text-red-600 btn shadow-none border-none w-max'>
            LogOut
            <LogOutIcon size={16} className='mt-0.5' />
        </button>

    );
};

export default LogOut;