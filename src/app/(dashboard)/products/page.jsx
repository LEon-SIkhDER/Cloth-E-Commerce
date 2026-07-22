import { Ban, Eye, MoreVertical, Pencil, Plus, Trash2 } from "lucide-react";
import AddProductFormModal from "./AddProductFormModal";
import Image from "next/image";
import getTotalProductCount from "@/lib/getTotalProductCount";
import ProductStatus from "./ProductStatus";

const page = async () => {
    const productsRes = await fetch("http://localhost:8000/products");
    const products = await productsRes.json();


    const getFinalPrice = (product) => {
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


    return (
        <div>
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="font-bold text-4xl">Products</h1>
                    <p>Manage all products here</p>
                </div>

                <AddProductFormModal />
            </div>


            <div className="rounded-lg ">
                <table className="table table-zebra mt-10  bg-white/5">
                    <thead className="bg-base-200">
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Product</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Status</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.map((product, index) => (
                            <tr key={product._id}>
                                <td>{index + 1}</td>

                                <td>
                                    <Image
                                        src={product.images[0]}
                                        alt={product.name}
                                        width={60}
                                        height={60}
                                        className="rounded-lg object-cover h-15 w-15"
                                    />
                                </td>

                                <td>
                                    <div>
                                        <h2 className="font-semibold line-clamp-2">
                                            {product.name}
                                        </h2>

                                        <p className="text-xs text-gray-500">
                                            {product.gender}
                                        </p>
                                    </div>
                                </td>

                                <td>{product.categoryName}</td>

                                <td>
                                    <div>
                                        <span className="font-semibold text-success">
                                            ৳{getFinalPrice(product)}
                                        </span>

                                        {Number(product.discount) > 0 && (
                                            <div className="text-xs line-through text-gray-500">
                                                ৳{product.price}
                                            </div>
                                        )}
                                    </div>
                                </td>

                                <td>
                                    {/* <span
                                        className={`badge ${getTotalProductCount(product.variants) > 0
                                            ? "badge-success"
                                            : "badge-error"
                                            }`}
                                    >
                                        {product.totalQuantity}
                                    </span> */}
                                    {getTotalProductCount(product.variants)}
                                </td>

                                <td>
                                    <span
                                        className={`badge capitalize ${product.status === "active"
                                            ? "badge-success"
                                            : product.status === "draft"
                                                ? "badge-warning"
                                                : "badge-error"
                                            }`}
                                    >
                                        {product.status}
                                    </span>
                                </td>



                                <td className="text-center">
                                    <div className="dropdown dropdown-end">
                                        <button
                                            tabIndex={0}
                                            className="cursor-pointer "
                                        >
                                            <MoreVertical size={18} />
                                        </button>

                                        <ul
                                            tabIndex={0}
                                            className="dropdown-content  menu p-2 shadow bg-base-100 rounded-box w-48 border border-white/10"
                                        >
                                            <li><button><Eye size={16} />View</button></li>
                                            <li><button><Pencil size={16} />Edit</button></li>
                                            <li><ProductStatus status={product.status}></ProductStatus></li>
                                            <li><button className="text-error"><Trash2 size={16} />Delete</button></li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>





















            {products.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20">
                    <h2 className="text-2xl font-semibold text-gray-500">
                        No products added yet
                    </h2>
                    <p className="mt-2 text-gray-400">
                        Click the <span className="font-medium">Add Product</span> button to create your first product.
                    </p>
                </div>
            ) : (
                <div>
                    {/* Your products table/grid goes here */}
                </div>
            )}
        </div>
    );
};

export default page;