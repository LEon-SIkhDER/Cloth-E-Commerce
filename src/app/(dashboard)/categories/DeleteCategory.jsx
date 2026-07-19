'use client'
import axios from 'axios';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const DeleteCategory = ({ categoryId }) => {
    const router = useRouter()
    const handleDeleteCategory = () => {
        console.log(categoryId)
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
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true,
            background: "#191e24",
            color: "white"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const toastId = toast.loading("Deleting")
                try {
                    const { data: result } = await axios.delete(`http://localhost:8000/category/${categoryId}`)
                    if (result.deletedCount !== 1) {
                        throw new Error("Delete Failed")
                    }
                    router.refresh()
                    toast.dismiss(toastId)
                    toast.success("Deleted")
                } catch (error) {
                    toast.dismiss(toastId)
                    toast.error(error.message || 'Something went wrong')
                }
            }

        })
    }
    return (
        <li
            onClick={() => handleDeleteCategory()}
            className='text-red-500'>
            <a>
                <Trash2 size={16} />Delete
            </a>
        </li>
    );
};

export default DeleteCategory;