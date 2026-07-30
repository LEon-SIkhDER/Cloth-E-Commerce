import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";
import React from "react";
import DeleteProductButton from "../DeleteProductButton";
import ImageModalButton from "./ImageModalButton";
import EditProduct from "../EditProduct";
import NavigateBackButton from "@/Components/NavigateBackButton";
// import { useParams } from "next/navigation";
const Info = ({ label, value }) => {
    return (
        <div>
            <p className="text-sm text-gray-500">
                {label}
            </p>

            <p className={`font-medium  ${label.toLowerCase() === 'status' ? (value === "active" ? "badge-success badge capitalize" : value === "inactive" ? "badge-error badge capitalize" : value === "draft" ? "badge-warning badge capitalize" : "") : ""}`}>
                {value}
            </p>
        </div>
    );
};

const ProductDetails = async ({ params }) => {
    const { id } = await params;
    console.log(id)


    const productRes = await fetch(`http://localhost:8000/product/${id}`);

    const product = await productRes.json();
    console.log(product)


    const getFinalPrice = () => {
        const price = Number(product.price);
        const discount = Number(product.discount);

        if (product.discountType === "taka") {
            return price - discount;
        }

        if (product.discountType === "percentage") {
            return price - (price * discount) / 100;
        }

        return price;
    };
    // return <h1>hello</h1>
    const handleDescription = (text) => {
        console.log()
        if (!text) return text
        return (< ul className="list-disc list-inside">
            {
                text.replaceAll("\n", '').split("..").map((line, index) =>
                    <li key={index}>{line}</li>
                )
            }
        </ul >)



    }

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            {/* <div className="flex justify-between items-center"> */}
            <NavigateBackButton
                className="btn btn-outline btn-sm  gap-2"
            >
                <ArrowLeft size={18} />
                Back
            </NavigateBackButton>
            {/* </div> */}
            {/* Product Main Info */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Images */}
                <div className="card bg-base-100 shadow p-5">
                    <h2 className="font-semibold text-lg mb-4">
                        Product Images
                    </h2>
                    <div className="grid grid-cols-2 gap-3">
                        {
                            product.images.map((image, index) => (
                                <div
                                    key={image.publicId}
                                    className="relative aspect-square rounded-lg overflow-hidden"
                                >
                                    <ImageModalButton images={product.images} index={index} alt={product.name}>
                                        <Image
                                            src={image.url}
                                            alt={product.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </ImageModalButton>
                                </div>
                            ))
                        }
                    </div>
                </div>




                {/* Details */}
                <div className="lg:col-span-2 card bg-base-100 shadow p-5">
                    <h1 className="text-2xl font-bold">
                        {product.name}
                    </h1>
                    <div className="divider"></div>
                    <div className="grid grid-cols-2 gap-4">
                        <Info
                            label="Product ID"
                            value={product.productId}
                        />
                        <Info
                            label="Category"
                            value={product.categoryName}
                        />
                        <Info
                            label="Gender"
                            value={product.gender}
                        />
                        <Info
                            label="Material"
                            value={product.material}
                        />
                        <Info
                            label="Original Price"
                            value={`৳ ${product.price}`}
                        />
                        <Info
                            label="Discount"
                            value={`${product.discount} ${product.discountType}`}
                        />
                        <Info
                            label="Final Price"
                            value={`৳ ${getFinalPrice()}`}
                        />
                        <Info
                            label="Status"
                            value={product.status}
                        />
                    </div>
                    <div className="mt-5">

                        <h3 className="font-semibold mb-2">
                            Description
                        </h3>


                        <div className="text-sm text-gray-500 whitespace-pre-line">
                            {handleDescription(product.description)}
                        </div>

                    </div>

                    <div className="flex gap-2 justify-end flex-1 items-end">

                        <EditProduct
                            product={product}
                            className="btn btn-warning btn-sm flex gap-2"
                        >
                            <Pencil size={17} />
                            Edit
                        </EditProduct>


                        <DeleteProductButton
                            id={product._id}
                            className="btn btn-error btn-sm flex gap-2"
                            navigate={'/products'}
                        >
                            <Trash2 size={17} />
                            Delete
                        </DeleteProductButton>

                    </div>



                </div>


            </div>




            {/* Variants */}
            <div className="card bg-base-100 shadow p-5">


                <h2 className="text-lg font-semibold mb-4">
                    Product Variants
                </h2>


                <div className="overflow-x-auto">


                    <table className="table">

                        <thead>

                            <tr>
                                <th>Size</th>
                                <th>Color</th>
                                <th>Quantity</th>
                                <th>SKU</th>
                            </tr>

                        </thead>


                        <tbody>


                            {
                                product.variants.map((variant) => (
                                    <tr key={variant.sku}>

                                        <td>
                                            {variant.size}
                                        </td>


                                        <td>
                                            {variant.color}
                                        </td>


                                        <td>
                                            {variant.quantity}
                                        </td>


                                        <td>
                                            <span className="badge badge-outline">
                                                {variant.sku}
                                            </span>
                                        </td>


                                    </tr>
                                ))
                            }


                        </tbody>


                    </table>


                </div>


            </div>


        </div>
    );
};





export default ProductDetails;
