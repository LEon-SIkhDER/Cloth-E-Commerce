"use client"
import axios from 'axios';
import { Ban, CircleCheckBig } from 'lucide-react';
import { useRouter } from 'next/navigation';
// import { useRouter } from 'next/router';
import React from 'react';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const ProductStatus = ({ id, status }) => {
    const router = useRouter()
    console.log(id)
    const handleStatus = async () => {
        const newStatus = status === "draft" || status === "inActive" ? "active" : "inActive"
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
            confirmButtonText: "Yes, Deactivate!",
            cancelButtonText: "No, Cancel!",
            background: "#191e24",
            color: "white",
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                const toastId = toast.loading("Updating status")
                try {
                    const { data } = await axios.patch(`http://localhost:8000/product/${id}/status`, { newStatus })
                    console.log(data)
                    if (data.modifiedCount !== 1) {
                        throw new Error("Update failed")
                    }
                    router.refresh()
                    toast.dismiss(toastId)
                    toast.success('Status Updated')
                } catch (error) {
                    toast.dismiss(toastId)
                    toast.error(error.message || "Something Went Wrong")

                }
            }
        });

    }

    return (

        <button onClick={handleStatus} className={status === "inActive" || status === "draft" ? 'text-success' : "text-warning"}>
            {status === "inActive" || status === "draft" ?
                <><CircleCheckBig size={16} />Activate</>
                :
                <><Ban size={16} />Deactivate</>
            }
        </button>
        // <>
        //     {
        //         status === "draft" || "inActive" ?
        //             <button className='text-success'><CircleCheckBig size={16} />Activate</button>
        //             :
        //             <button className='text-warning'><Ban size={16} />Deactivate</button>

        //     }
        // </>

    );
};

export default ProductStatus;