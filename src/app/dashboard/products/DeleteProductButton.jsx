'use client'
import axios from 'axios';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useTransition } from 'react';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const DeleteProductButton = ({ id, children, className, navigate }) => {
    const [isPending, startTransition] = useTransition()
    // const router = useRouter()
    // const [success, setSuccess] = useState(false)
    const isSuccess = useRef(false)
    const toastId = useRef(null)
    console.log(isPending)
    const router = useRouter()
    const handleProductDelete = async () => {
        if (toastId.current) return
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
                    if (!navigate) {
                        startTransition(() => router.refresh())
                    } else {
                        router.push(navigate)
                    }

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
    }, [isPending])
    console.log(id)
    return (
        <button onClick={handleProductDelete} className={className}>{children}</button>
    );
};

export default DeleteProductButton;
