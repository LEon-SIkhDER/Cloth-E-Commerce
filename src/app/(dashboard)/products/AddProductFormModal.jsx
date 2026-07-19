"use client"
import axios from 'axios';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
// import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import toast from 'react-hot-toast';

const AddProductFormModal = () => {
    const modalRef = useRef()
    const fileInputRef = useRef()
    const router = useRouter()
    const [preview, setPreview] = useState(null)

    // const {data:productName, isLoading} = 



    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setPreview(URL.createObjectURL(file))
        }
    }



    const handleAddProduct = async (e) => {
        e.preventDefault()
        modalRef.current.close()
        const toastId = toast.loading('New Product Adding...')
        const formData = Object.fromEntries(new FormData(e.target))
        // console.log(formData.logo.name )


        try {
            if (formData.logo.name) {
                const imageData = new FormData()
                imageData.append('image', formData.logo)
                const { data } = await axios.post(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`, imageData)
                console.log(data.data.url)
                const photoUrl = data.data.url
                formData.logo = photoUrl
                console.log(formData)
            }
            else {
                formData.logo = ""
            }




            const { data: result } = await axios.post("http://localhost:8000/product", formData)
            if (!result.insertedId) {
                throw new Error('Failed to add product')
            }
            router.refresh()
            toast.dismiss(toastId)
            toast.success('Product Added Successfully')
            e.target.reset()
        } catch (error) {
            toast.dismiss(toastId)
            toast.error(error.message)
        }

    }

    const handleCancel = () => {


        setPreview(null)
        modalRef.current.close()
    }

    return (
        <div>
            <button onClick={() => modalRef.current.showModal()} className='btn btn-primary'><Plus className='mt-px' size={16} /> Add Product</button>
            <dialog ref={modalRef} className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg mb-4">Add New Product</h3>
                    <form onSubmit={handleAddProduct} className="space-y-4">
                        {/* Product Logo Image */}
                        <div className="form-group">
                            <label className="block text-sm font-medium mb-2">Product Image</label>
                            <div
                                onClick={() => fileInputRef.current.click()}
                                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-primary transition"
                            >
                                {preview ? (
                                    <div className="flex flex-col items-center">
                                        <Image
                                            src={preview}
                                            alt='Preview'
                                            height={128}
                                            width={128}
                                            className='object-cover h-32 w-32 rounded'

                                        />
                                        {/* <img src={preview} alt="Preview" className="h-32 w-32 object-cover rounded mb-2" /> */}
                                        <p className="text-sm text-gray-500">Click to change image</p>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center">
                                        <span className="text-3xl text-gray-400">+</span>
                                        <p className="text-sm text-gray-500 mt-2">Click to upload image</p>
                                    </div>
                                )}
                            </div>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                                name='logo'
                            />
                        </div>

                        {/* Product Name */}
                        <div className="form-group">
                            <label htmlFor="productName" className="block text-sm font-medium mb-2">Product Name</label>
                            <input
                                type="text"
                                id="productName"
                                name="name"
                                placeholder="Enter product name"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>

                        {/* Product Description */}
                        <div className="form-group">
                            <label htmlFor="productDescription" className="block text-sm font-medium mb-2">Product Description</label>
                            <textarea
                                id="productDescription"
                                name="description"
                                placeholder="Enter product description"
                                className="textarea textarea-bordered w-full"
                                rows="4"
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 pt-4">
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="btn btn-outline flex-1"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary flex-1"
                            >
                                Add Product
                            </button>
                        </div>
                    </form>















                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

        </div>
    );
};

export default AddProductFormModal;