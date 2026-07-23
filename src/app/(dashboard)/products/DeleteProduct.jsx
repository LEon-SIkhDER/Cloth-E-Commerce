'use client'
import axios from 'axios';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState, useTransition } from 'react';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const DeleteProduct = ({ id }) => {
    const [isPending, startTransition] = useTransition()
    // const [success, setSuccess] = useState(false)
    const isSuccess = useRef(false)
    const toastId = useRef(null)
    console.log(isPending)
    const router = useRouter()
    const handleProductDelete = async () => {
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
                toastId.current = toast.loading('Deleting Product...')
                try {
                    const { data } = await axios.delete(`http://localhost:8000/product/${id}`)
                    console.log(data)
                    isSuccess.current = true
                    startTransition(() => router.refresh())
                } catch (error) {
                    toast.dismiss(toastId.current)
                    toast.error(error.message || "Something went wrong")
                }
            }
        })
    }
    // console.log(isPending)
    useEffect(() => {
        return () => {
            console.log(isPending, isSuccess.current)
            if (!isPending && isSuccess.current) {
                toast.dismiss(toastId.current)
                toast.success("Deleted")
                toastId.current = null
                isSuccess.current = false
            }
        }
    }, [])
    console.log(id)
    return (
        <li><button onClick={handleProductDelete} className="text-error"><Trash2 size={16} />Delete</button></li>
    );
};

export default DeleteProduct;