'use client'
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import toast from 'react-hot-toast';

const EditCategoryButton = ({ category, children }) => {
    const portalRoot = typeof document !== "undefined" ? document.body : null
    const categoryEditModalRef = useRef()
    const fileInputRef = useRef()
    const router = useRouter()
    const [nameError, setNameError] = useState()
    const [preview, setPreview] = useState(category.logo?.url)



    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setPreview(URL.createObjectURL(file))
        }
    }
    const handleCategoryName = (e) => {
        // setNameError()
        // console.log(e.target.value)
        // if (categoryNames.includes(e.target.value.toLowerCase().trim())) {
        //     setNameError(`Category "${e.target.value}" is already exist.`)
        // }


    }

    const handleEditCategory = async (e) => {
        e.preventDefault()
        categoryEditModalRef.current.close()
        const formEntries = new FormData(e.target)
        const formData = Object.fromEntries(formEntries)
        console.log(formData)

        // else{
        //     console.log('change kora HOINAI')
        // }

        const toastId = toast.loading("Category Updating")

        try {
            let publicIdToDelete = null
            if (formData.logo.name) {
                if (category.logo) {
                    publicIdToDelete = category.logo.publicId
                }
                const imageData = new FormData()
                imageData.append("file", formData.logo)
                imageData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET)
                const { data } = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, imageData)
                formData.logo = { url: data.secure_url, publicId: data.public_id }
            }
            else {
                delete formData.logo
            }

            const { data } = await axios.patch(`http://localhost:8000/category/${category._id}`, { formData, publicIdToDelete })
            toast.dismiss(toastId)
            if (data.modifiedCount !== 1) {
                throw new Error("Update Failed")
            }
            router.refresh()
            toast.success("Category Updating")
            e.target.reset()

        } catch (error) {
            toast.dismiss(toastId)
            toast.error(error.message || "Something went wrong")
        }




    }


    const handleCancel = () => {
        setPreview(null)
        categoryEditModalRef.current.close()
    }
    return (
        <>
            <button onClick={() => categoryEditModalRef.current.showModal()}>{children}</button>
            {
                portalRoot &&
                createPortal(
                    <dialog ref={categoryEditModalRef} className="modal">
                        <div className="modal-box">
                            <form method="dialog">
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            </form>
                            <form onSubmit={handleEditCategory} className="space-y-4">
                                {/* Category Logo Image */}
                                <div className="form-group">
                                    <label className="block text-sm font-medium mb-2">Category Logo</label>
                                    <div
                                        onClick={() => fileInputRef.current.click()}
                                        className={` border-2 border-dashed border-gray-300 rounded-lg px-8 ${preview ? 'py-4' : "py-8"} text-center cursor-pointer hover:border-primary transition`}
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
                                                {/* <p className="text-sm text-gray-500">Click to change image</p> */}
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

                                {/* Category Name */}
                                <div className="form-group">
                                    <label htmlFor="categoryName" className="block text-sm font-medium mb-2">Category Name</label>
                                    <input
                                        onChange={handleCategoryName}
                                        type="text"
                                        name="name"
                                        placeholder="Enter category name"
                                        className="input input-bordered w-full"
                                        defaultValue={category.name}
                                        required
                                    />
                                    {
                                        nameError && <p className='text-red-500 text-xs mt-2'>{nameError}</p>
                                    }
                                </div>

                                {/* Category Description */}
                                <div className="form-group">
                                    <label htmlFor="categoryDescription" className="block text-sm font-medium mb-2">Category Description</label>
                                    <textarea
                                        id="categoryDescription"
                                        name="description"
                                        placeholder="Enter category description"
                                        className="textarea textarea-bordered w-full"
                                        rows="4"
                                        defaultValue={category.description}
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
                                        Update Category
                                    </button>
                                </div>
                            </form>


                        </div>
                        <form method="dialog" className="modal-backdrop">
                            <button>close</button>
                        </form>
                    </dialog>
                    , portalRoot)
            }
        </>
    );
};

export default EditCategoryButton;