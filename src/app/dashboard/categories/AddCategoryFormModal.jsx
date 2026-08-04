"use client"
import axios from 'axios';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
// import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import toast from 'react-hot-toast';

const AddCategoryFormModal = ({ categoryNames }) => {
    console.log(categoryNames)
    const modalRef = useRef()
    const fileInputRef = useRef()
    const router = useRouter()
    const [nameError, setNameError] = useState()
    const [preview, setPreview] = useState(null)



    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setPreview(URL.createObjectURL(file))
        }
    }

    const handleCategoryName = (e) => {
        setNameError()
        console.log(e.target.value)
        if (categoryNames.includes(e.target.value.toLowerCase().trim())) {
            setNameError(`Category "${e.target.value}" is already exist.`)
        }


    }



    const handleAddCategory = async (e) => {
        e.preventDefault()
        modalRef.current.close()
        const toastId = toast.loading('New Category Adding...')
        const formData = Object.fromEntries(new FormData(e.target))
        // console.log(formData.logo.name )


        try {
            if (formData.logo.name) {
                const imageData = new FormData()
                imageData.append('file', formData.logo)
                imageData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET)



                const { data } = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, imageData)
                formData.logo = { url: data.secure_url, publicId: data.public_id }



                console.log(formData)
            }
            else {
                formData.logo = null
            }




            const { data: result } = await axios.post("http://localhost:8000/category", formData)
            if (!result.insertedId) {
                throw new Error('Failed to add category')
            }
            router.refresh()
            toast.dismiss(toastId)
            toast.success('Category Added Successfully')
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
            <button onClick={() => modalRef.current.showModal()} className='btn bg-[#f6f2e9] shadow-none border border-[#f3eee5] text-black'><Plus className='mt-px' size={16} /> Add Category</button>
            <dialog ref={modalRef} className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg mb-4">Add New Category</h3>
                    <form onSubmit={handleAddCategory} className="space-y-4">
                        {/* Category Logo Image */}
                        <div className="form-group">
                            <label className="block text-sm font-medium mb-2">Category Logo</label>
                            <div
                                onClick={() => fileInputRef.current.click()}
                                className={`border-2 border-dashed border-gray-300 rounded-lg px-8 ${preview ? "py-2" : "py-8"}  text-center cursor-pointer hover:border-primary transition`}
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

                        {/* Category Name */}
                        <div className="form-group">
                            <label htmlFor="categoryName" className="block text-sm font-medium mb-2">Category Name</label>
                            <input
                                onChange={handleCategoryName}
                                type="text"
                                name="name"
                                placeholder="Enter category name"
                                className="input input-bordered w-full"
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
                                Add Category
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

export default AddCategoryFormModal;