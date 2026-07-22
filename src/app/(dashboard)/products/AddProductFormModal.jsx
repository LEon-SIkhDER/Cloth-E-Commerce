"use client"
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
// import { size } from 'better-auth';
import { FileUser, Plus } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
// import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import toast from 'react-hot-toast';
const sizes = [
    "XS",
    "S",
    "M",
    "L",
    "XL",
    "XXL"
];
const AddProductFormModal = () => {
    const modalRef = useRef()
    const fileInputRef = useRef()
    const router = useRouter()
    const [previews, setPreviews] = useState(null)

    const { data: categoryNames, isLoading } = useQuery({
        queryKey: ['category-name'],
        queryFn: async () => {
            const { data: result } = await axios.get("http://localhost:8000/categoryNames")
            return result

        }
    })
    console.log(categoryNames)

    // form extra size button
    const [sizeFieldCount, setSizeFieldCount] = useState(1)
    // form discount type 
    const [discountType, setDiscountType] = useState("taka")

    const handleDiscountType = (e) => {
        console.log(e.target.value)
        setDiscountType(e.target.value)
    }




    const handleImageChange = (e) => {
        const files = Array.from(e.target.files)
        // console.log(typeof files, files )
        if (files) {
            const fileUrls = files.map(file => URL.createObjectURL(file))
            setPreviews(fileUrls)
        }
    }



    const handleAddProduct = async (e) => {
        e.preventDefault()
        modalRef.current.close()
        const toastIdImage = toast.loading('Image Uploading...')
        const formEntries = new FormData(e.target)


        const formData = Object.fromEntries(formEntries)
        formData.status = formEntries.get("status") === 'on' ? "draft" : "active"

        const variants = []

        for (let i = 0; i < sizeFieldCount; i++) {
            variants.push({
                size: formData[`size${i}`],
                color: formData[`color${i}`],
                quantity: formData[`quantity${i}`]
            })
            delete formData[`size${i}`]
            delete formData[`color${i}`]
            delete formData[`quantity${i}`]
        }
        const categoryNameField = categoryNames.find(item => item._id === formData.categoryId)
        formData.categoryName = categoryNameField.name
        formData.variants = variants
        console.log(formData)



        // const { data } = await axios.post(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`, imageData)
        // console.log(data.data.url)
        // const photoUrl = data.data.url
        // formData.logo = photoUrl

        let toastIdProduct
        try {
            // upload Image >>>>>>>>>>>>>>>> 
            const images = formEntries.getAll("images") // images in an array
            console.log(images)
            const imageUrls = await Promise.all(
                images.map(async (file) => {
                    const imageData = new FormData()
                    imageData.append('file', file)
                    imageData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET)
                    const { data } = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, imageData)
                    return data.secure_url
                })
            )
            toast.dismiss(toastIdImage)
            toastIdProduct = toast.loading('New Product Adding...')
            console.log(imageUrls)
            formData.images = imageUrls
            // send data to database >>>>>>>>>>>>>>
            const { data: result } = await axios.post("http://localhost:8000/product", formData)
            if (!result.insertedId) {
                throw new Error('Failed to add product')
            }
            router.refresh()
            toast.dismiss(toastIdProduct)
            toast.success('Product Added Successfully')
            setPreviews(null)
            setSizeFieldCount(1)
            e.target.reset()
        } catch (error) {
            toast.dismiss(toastIdImage)
            toast.dismiss(toastIdProduct)
            toast.error(error.message)
        }

    }

    const handleCancel = () => {
        setSizeFieldCount(1)
        setPreviews(null)
        modalRef.current.close()
    }

    return (
        <div>
            <button onClick={() => modalRef.current.showModal()} className='btn btn-primary'><Plus className='mt-px' size={16} /> Add Product</button>
            <dialog ref={modalRef} className="modal">
                <div className="modal-box w-150 max-w-150">
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
                                className="border-2 flex justify-center items-center border-dashed border-gray-300 rounded-lg  text-center cursor-pointer hover:border-primary transition h-44 "
                            >
                                {previews ? (
                                    <div className="flex h-full items-center justify-center gap-2  px-8 w-6xl relative  overflow-x-auto ">
                                        {previews.map((preview, index) => (
                                            <Image
                                                key={index}
                                                src={preview}
                                                alt={`Preview ${index}`}
                                                width={100}
                                                height={100}
                                                className={`h-25 w-25 rounded object-cover shrink-0`}
                                            />
                                        ))}
                                        {/* <img src={preview} alt="Preview" className="h-32 w-32 object-cover rounded mb-2" /> */}
                                        {/* <p className="text-sm text-gray-500">Click to change image</p> */}
                                    </div>
                                ) : (
                                    <div className="flex flex-col justify-center items-center h-25">
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
                                name='images'
                                required
                                multiple
                            />
                        </div>

                        {/* Category Name */}
                        <div className="form-group">
                            <label htmlFor="productName" className="block text-sm font-medium mb-2" >Category Name</label>
                            <select required className='select w-full' name='categoryId' defaultValue={"Select Category"}>
                                <option disabled>Select Category</option>
                                {categoryNames?.map((data, index) =>
                                    <option key={index} value={data._id}>{data.name}</option>
                                )}
                            </select>
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
                        {/* price & discount */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="form-group">
                                <label className="block text-sm font-medium mb-2">
                                    Price
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    min={0}
                                    placeholder="0"
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <div className="flex justify-between gap-1 text-sm font-medium mb-2">
                                    Discount {discountType === "taka" ? 'Price' : "%"}
                                    <div className='space-x-2 '>
                                        <label className='inline-flex items-center gap-1'>
                                            <input onChange={handleDiscountType} type="radio" name="discountType" value={"taka"} className="radio radio-info radio-xs" defaultChecked /> TK
                                        </label>
                                        <label className='inline-flex items-center gap-1'>
                                            <input onChange={handleDiscountType} type="radio" name="discountType" value={"percentage"} className="radio radio-info radio-xs" /> %
                                        </label>
                                    </div>
                                </div>
                                <input
                                    type="number"
                                    name="discount"
                                    min={0}
                                    placeholder="Optional"
                                    className="input input-bordered w-full"
                                />
                            </div>

                        </div>
                        {/* Size */}
                        {[...Array(sizeFieldCount)].map((_, index) => (
                            <div key={index} className="flex gap-4 items-end">
                                {/* Size */}
                                <div className="form-group flex-1">
                                    <label className="block text-sm font-medium mb-2">Sizes</label>
                                    <select required className="select w-full" defaultValue="Select Size" name={`size${index}`}>
                                        <option disabled>Select Size</option>
                                        {sizes.map((size, i) => (
                                            <option key={i}>{size}</option>
                                        ))}
                                    </select>
                                </div>
                                {/* Color */}
                                <div className="form-group flex-1">
                                    <label className="block text-sm font-medium mb-2">
                                        Colors
                                    </label>

                                    <input
                                        type="text"
                                        name={`color${index}`}
                                        placeholder="Product Color"
                                        className="input input-bordered w-full"
                                    />
                                </div>

                                {/* Quantity */}
                                {/* <div className='flex gap-4 items-end'> */}
                                <div className="form-group flex-1">
                                    <label className="block text-sm font-medium mb-2">
                                        Quantity
                                    </label>
                                    <input
                                        type="number"
                                        name={`quantity${index}`}
                                        className="input input-bordered w-full"
                                        min={0}
                                        defaultValue={1}
                                        required
                                    />
                                </div>

                                {/* Add / Remove Button */}
                                {index === sizeFieldCount - 1 ? (
                                    <button
                                        type="button"
                                        className={`btn h-10 w-10 text-xl border `}
                                        onClick={() => setSizeFieldCount(prev => prev + 1)}
                                    >
                                        +
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        className="btn h-10 w-10 text-xl"
                                        onClick={() => setSizeFieldCount(prev => prev - 1)}
                                    >
                                        -
                                    </button>
                                )}
                                {/* </div> */}
                            </div>
                        ))}

                        {/* Material & Gender  */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="form-group">
                                <label className="block text-sm font-medium mb-2">
                                    Material
                                </label>

                                <input
                                    type="text"
                                    name="material"
                                    placeholder="Cotton"
                                    className="input input-bordered w-full"
                                />
                            </div>

                            <div className="form-group">
                                <label className="block text-sm font-medium mb-2">
                                    Gender
                                </label>

                                <select
                                    className="select w-full"
                                    defaultValue="Unisex"
                                    name="gender"
                                >
                                    <option>Men</option>
                                    <option>Women</option>
                                    <option>Unisex</option>
                                    <option>Kids</option>
                                </select>
                            </div>
                        </div>




                        {/* Product Description */}
                        <div className="form-group">
                            <label htmlFor="productDescription" className="block text-sm font-medium mb-2">Product Description <span className='text-xs text-yellow-400'>Separate points with double dots (..)</span></label>
                            <textarea
                                id="productDescription"
                                name="description"
                                placeholder="Enter product description"
                                className="textarea textarea-bordered w-full"
                                rows="4"
                            />
                        </div>

                        <div className='form-group'>
                            <div className='flex items-center gap-1.5'>
                                <input type="checkbox" className="checkbox  checkbox-sm" name='status' />Add Product as Draft
                            </div>
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