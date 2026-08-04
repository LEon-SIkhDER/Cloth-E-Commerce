"use client"
import axios from 'axios';
import { Ban, CircleCheckBig } from 'lucide-react';
import { useRouter } from 'next/navigation';
// import { useRouter } from 'next/router';
import React from 'react';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const DeactivateCategory = ({ categoryData }) => {
    const router = useRouter()
    const handleDeactivate = () => {
        console.log(categoryData)
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-error mr-4"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: categoryData.isActive ? "Yes, Activate!" : 'Yes, Deactivate',
            cancelButtonText: "No, Cancel!",
            background: "#191e24",
            color: "white",
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                const toastId = toast.loading("Deactivating")
                try {
                    // console.log("status from category:" + categoryData.isActive)
                    const { data: result } = await axios.patch("http://localhost:8000/category/status", categoryData)
                    if (result.modifiedCount !== 1) {
                        throw new Error("Update Failed")
                    }
                    router.refresh()
                    toast.dismiss(toastId)
                    // console.log("status from category:" + categoryData.isActive)
                    toast.success(categoryData.isActive ? "Activated" : "Deactivated")
                } catch (error) {
                    toast.dismiss(toastId)
                    toast.error(error.message || "Something went wrong")
                }
            }
        });

    }

    return (
        <li onClick={handleDeactivate} className={`${categoryData.isActive ? "text-success" : "text-warning"}`}><a>{categoryData.isActive ? <CircleCheckBig className='mt-[0.7px]' size={16} /> : <Ban size={16} />}{categoryData.isActive ? "Activate" : "Deactivate"}</a></li>
    );
};

export default DeactivateCategory;