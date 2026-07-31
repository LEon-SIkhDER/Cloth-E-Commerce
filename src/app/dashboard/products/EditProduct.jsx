"use client"
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Minus } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
// import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import toast from 'react-hot-toast';
const sizes = [
    "XS",
    "S",
    "M",
    "L",
    "XL",
    "XXL"
];
const EditProduct = ({ product, className, children }) => {
    // console.log(product)
    const portalRoot = typeof document !== "undefined" ? document.body : null;
    const editModalRef = useRef()
    const imagesRef = useRef()
    const fileInputRef = useRef(null)
    const router = useRouter()
    const [previews, setPreviews] = useState(product.images.map(image => ({ url: image.url, publicId: image.publicId })))
    // console.log(previews)

    // const [mounted, setMounted] = useState(false);

    // useEffect(() => {
    //     setMounted(true);
    // }, []);

    const { data: categoryNames } = useQuery({
        queryKey: ['category-name'],
        queryFn: async () => {
            const { data: result } = await axios.get("http://localhost:8000/categoryNames")
            return result

        }
    })
    // console.log(categoryNames)
    // form extra size button
    const [variants, setVariants] = useState(product.variants)
    console.log(variants)
    // form discount type 
    const [discountType, setDiscountType] = useState("taka")
    // const [readyToScroll, setReadyToScroll] = useState(false)
    const readyToScroll = useRef(false)
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files)
        // console.log(typeof files, files )
        if (files) {
            const fileUrls = files.map(file => ({ url: URL.createObjectURL(file), file }))
            readyToScroll.current = true
            setPreviews([...previews, ...fileUrls])
        }

    }
    useEffect(() => {
        if (!imagesRef.current || !readyToScroll.current) return;
        imagesRef.current.scrollTo({
            left: imagesRef.current.scrollWidth,
            behavior: "smooth",
        });
        readyToScroll.current = false
        // setReadyToScroll(false)
    }, [previews]);
    const handleDiscountType = (e) => {
        // console.log(e.target.value)
        setDiscountType(e.target.value)
    }



    const toastId = useRef()
    const [error, setError] = useState()
    const handleEditProduct = async (e) => {
        e.preventDefault()
        setError()
        toastId.current = toast.loading('Updating Data...')
        const formEntries = new FormData(e.target)
        const formData = Object.fromEntries(formEntries)

        formData.categoryName = categoryNames.find(item => item._id === formData.categoryId).name
        let newVariants = []
        for (let i = 0; i < variants.length; i++) {
            newVariants.push({
                size: formData[`size${i}`],
                color: formData[`color${i}`],
                quantity: formData[`quantity${i}`],
                sku: formData[`sku${i}`] || "",
            })
            delete formData[`size${i}`]
            delete formData[`color${i}`]
            delete formData[`quantity${i}`]
            delete formData[`sku${i}`]
        }
        formData.variants = newVariants
        // duplicate size or color
        const seen = new Set()
        for (let variant of formData.variants) {
            const key = `${variant.size}|${variant.color}`.toLowerCase()
            if (seen.has(key)) {
                toast.dismiss(toastId.current)
                return setError("Duplicate Size or Color")
            }
            seen.add(key)
        }
        editModalRef.current.close()
        formData.productId = product.productId
        const previousImages = previews.filter(preview => preview.publicId) // object {publicId, url} images that has url 
        const newPublicIds = new Set(previousImages.map(image => image.publicId))
        // console.log(newPublicIds)
        const publicIdsToDelete = product.images.filter(image => !newPublicIds.has(image.publicId)).map(image => image.publicId)
        // console.log(publicIdsToDelete)
        // const publicIdsToDelete = product.images.filter(image => image.publicId !== previousImages.publicId)
        const files = previews.filter(preview => preview.file).map(preview => preview.file)
        console.log(previousImages)
        try {
            let newImageUrls = []
            if (files.length !== 0) {
                newImageUrls = await Promise.all(files.map(async (file) => {
                    const imageData = new FormData()
                    imageData.append("file", file)
                    imageData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET)
                    const { data } = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, imageData)
                    return { url: data.secure_url, publicId: data.public_id }

                }))
            }
            const images = [...previousImages, ...newImageUrls]
            formData.images = images
            console.log(formData)

            const { data: result } = await axios.patch(`http://localhost:8000/product/${product._id}`, { formData, publicIdsToDelete })
            if (result.modifiedCount !== 1) {
                throw new Error("Update Failed")
            }
            router.refresh()
            console.log(previousImages)
            console.log(publicIdsToDelete)

            toast.dismiss(toastId.current)
            toast.success("Updated")
            console.log(result)

        } catch (error) {
            toast.dismiss(toastId.current)
            toast.error(error.message || "Something Went Wrong")
        }

    }

    const handleSubtractImagePreview = (e, url) => {
        e.stopPropagation()
        const newPreviewImage = previews.filter((preview) => preview.url !== url)
        setPreviews(newPreviewImage)
    }
    console.log(previews)

    const handleCancel = (e) => {
        setVariants(product.variants)
        setPreviews(product.images.map(image => ({ url: image.url, publicId: image.publicId })))
        editModalRef.current.close()
    }
    // console.log(sizeFieldCount, product.variants.length)
    // if(!editModalRef) return
    return (
        <>
            <button onClick={() => editModalRef.current.showModal()} className={className}>{children}</button>
            {
                portalRoot &&
                createPortal(
                    <dialog ref={editModalRef} className="modal">
                        <div className="modal-box w-150 max-w-150">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            </form>
                            <h3 className="font-bold text-lg mb-4">Add New Product</h3>
                            <form onSubmit={handleEditProduct} className="space-y-4">
                                {/* Product Logo Image */}
                                <div className="form-group">
                                    <div className='flex justify-between items-end mb-2'>
                                        <label className="block text-sm font-medium ">Product Image</label>
                                        <button
                                            onClick={() => fileInputRef.current.click()}
                                            className='btn text-cyan-500 bg-cyan-500/10 border border-cyan-500' type='button'>+ Add Image</button>
                                    </div>
                                    <div
                                        className="border-2 flex justify-center items-center border-dashed border-gray-300 rounded-lg  text-center  hover:border-primary transition h-44 "
                                    >
                                        {previews.length !== 0 ? (
                                            <div ref={imagesRef} className="flex h-full items-center  gap-2  px-8 w-6xl relative  overflow-x-auto ">
                                                {previews.map((preview, index) => (
                                                    <div key={index} className='relative h-25 w-25 shrink-0'>
                                                        <Image
                                                            src={preview.url}
                                                            alt={`Preview ${index}`}
                                                            width={100}
                                                            height={100}
                                                            className={`h-25 w-25 rounded object-cover shrink-0`}
                                                        />
                                                        <button onClick={(e) => handleSubtractImagePreview(e, preview.url)} type='button' className='cursor-pointer absolute top-1 right-1 h-4.5 w-4.5 flex items-center justify-center  rounded-full bg-red-500 text-white text-2xl'><Minus strokeWidth={3} /></button>
                                                    </div>
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
                                        multiple
                                    />
                                </div>

                                {/* Category Name */}
                                <div className="form-group">
                                    <label htmlFor="productName" className="block text-sm font-medium mb-2" >Category Name</label>
                                    <select required className='select w-full' name='categoryId' defaultValue={product.categoryId}>
                                        <option disabled value={''}>Select Category</option>
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
                                        defaultValue={product.name}
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
                                            defaultValue={product.price}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <div className="flex justify-between gap-1 text-sm font-medium mb-2">
                                            Discount {discountType === "taka" ? 'Price' : "%"}
                                            <div className='space-x-2 '>
                                                <label className='inline-flex items-center gap-1'>
                                                    <input onChange={handleDiscountType} type="radio" name="discountType" value={"taka"} className="radio radio-info radio-xs"
                                                        defaultChecked={product.discountType === "taka" ? true : false} /> TK
                                                </label>
                                                <label className='inline-flex items-center gap-1'>
                                                    <input onChange={handleDiscountType} type="radio" name="discountType" value={"percentage"} className="radio radio-info radio-xs"
                                                        defaultChecked={product.discountType === "percentage" ? true : false} /> %
                                                </label>
                                            </div>
                                        </div>
                                        <input
                                            type="number"
                                            name="discount"
                                            min={0}
                                            placeholder="Optional"
                                            className="input input-bordered w-full"
                                            defaultValue={product.discount}
                                        />
                                    </div>

                                </div>
                                {/* Size */}
                                <div className='flex justify-between'>
                                    <div>
                                        <label className='label m-0 '>Variants</label>
                                        <p className='text-gray-500 text-sm'>Manage Size, Color and Quantity</p>
                                    </div>
                                    <button
                                        onClick={() => setVariants(prev => [...prev, { size: "", color: "", quantity: "", sku: "", tempId: crypto.randomUUID() }])} type='button'
                                        className='btn text-cyan-500 bg-cyan-500/10 border border-cyan-500'>+ Add Variant</button>
                                </div>
                                {variants.map((variant, index) => (
                                    <div key={variant.sku || variant.tempId} className="flex gap-4 items-end bg-black/10 p-3 rounded">
                                        {/* Size */}
                                        <div className="form-group flex-1">
                                            <label className="block text-sm font-medium mb-2">Sizes</label>
                                            <select required className="select w-full" defaultValue={variant.size || ''} name={`size${index}`}>
                                                <option disabled value={''}>Select Size</option>
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
                                                defaultValue={variant.color}
                                                required
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
                                                required
                                                defaultValue={variant.quantity || 1}

                                            />
                                            {index + 1 <= product.variants.length &&
                                                < input type="text" className='h-0 w-0 invisible opacity-0' name={`sku${index}`} defaultValue={variant.sku} />
                                            }
                                        </div>

                                        {/* Add / Remove Button */}
                                        {variants.length > 1 &&
                                            <button
                                                type="button"
                                                className="btn h-10 w-10  p-0 border border-red-500 text-red-500"
                                                onClick={() => setVariants(prev => prev.filter((_, i) => i !== index))}
                                            >
                                                <Minus size={20} />
                                            </button>
                                        }
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
                                            defaultValue={product.material}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="block text-sm font-medium mb-2">
                                            Gender
                                        </label>

                                        <select
                                            required
                                            className="select w-full"
                                            defaultValue={product.gender}
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
                                        required
                                        // id="productDescription"
                                        name="description"
                                        placeholder="Enter product description"
                                        className="textarea textarea-bordered w-full"
                                        rows="4"
                                        defaultValue={product.description}
                                    />
                                </div>
                                {error &&
                                    <p className='text-red-500 text-xs m-0'>{error}</p>
                                }



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
                                        Update Product
                                    </button>
                                </div>
                            </form>
                        </div>
                        <form method="dialog" className="modal-backdrop">
                            <button>close</button>
                        </form>
                    </dialog>, portalRoot
                )}


        </>
    );
};

export default EditProduct;
