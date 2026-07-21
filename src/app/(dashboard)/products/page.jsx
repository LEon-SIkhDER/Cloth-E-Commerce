import { Eye, MoreVertical, Pencil, Plus, Trash2 } from "lucide-react";
import AddProductFormModal from "./AddProductFormModal";
import Image from "next/image";

const page = async () => {
    const productsRes = await fetch("http://localhost:8000/products")
    const products = await productsRes.json()
    console.log(products)
    const getFinalPrice = (product) => {
        const price = Number(product.price);
        const discount = Number(product.discount);

        if (product.discountType === "taka") {
            return price - discount;
        }

        return price - (price * discount) / 100;
    };
    return (
        <div>
            <div className='flex justify-between'>

                <div>
                    <h1 className='font-bold text-4xl'>Products</h1>
                    <p>Manage all products here</p>
                </div>
                <AddProductFormModal></AddProductFormModal>
            </div>
            <div className="hidden md:block overflow-x-auto rounded-xl border border-base-300 bg-base-100">
                <table className="table">
                    <thead className="bg-base-200">
                        <tr>
                            <th>Image</th>
                            <th>Product</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Status</th>
                            <th>Updated</th>
                            <th className="text-end">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products?.map((product) => (
                            <tr key={product._id} className="hover">
                                {/* Image */}
                                <td>
                                    <Image
                                        src={product.images[0]}
                                        alt={product.name}
                                        height={64}
                                        width={64}
                                        className="w-16 h-16 rounded-lg object-cover"

                                    />
                                </td>

                                {/* Product */}
                                <td className="max-w-xs">
                                    <h3 className="font-semibold line-clamp-2">
                                        {product.name}
                                    </h3>

                                    <p className="text-xs opacity-60 mt-1">
                                        {product.material}
                                    </p>
                                </td>

                                {/* Category */}
                                <td>
                                    <div className="badge badge-outline">
                                        {product.categoryName}
                                    </div>
                                </td>

                                {/* Price */}
                                <td>
                                    <p className="font-bold text-primary">
                                        ৳{getFinalPrice(product)}
                                    </p>

                                    <p className="text-xs line-through opacity-60">
                                        ৳{product.price}
                                    </p>
                                </td>

                                {/* Stock */}
                                <td>
                                    <span
                                        className={`font-semibold ${product.totalQuantity === 0
                                            ? "text-error"
                                            : "text-success"
                                            }`}
                                    >
                                        {product.totalQuantity}
                                    </span>
                                </td>

                                {/* Status */}
                                <td>
                                    <div
                                        className={`badge ${product.status === "Active"
                                            ? "badge-success"
                                            : "badge-error"
                                            }`}
                                    >
                                        {product.status}
                                    </div>
                                </td>

                                {/* Updated */}
                                <td>
                                    {new Date(product.updatedAt).toLocaleDateString()}
                                </td>

                                {/* Actions */}
                                <td className="text-end">
                                    <div className="dropdown dropdown-end">
                                        <label tabIndex={0} className="btn btn-ghost btn-sm">
                                            <MoreVertical size={18} />
                                        </label>

                                        <ul
                                            tabIndex={0}
                                            className="dropdown-content menu bg-base-200 rounded-box w-44 shadow-lg z-10"
                                        >
                                            <li>
                                                <button>
                                                    <Eye size={16} />
                                                    View
                                                </button>
                                            </li>

                                            <li>
                                                <button>
                                                    <Pencil size={16} />
                                                    Edit
                                                </button>
                                            </li>

                                            <li>
                                                <button className="text-error">
                                                    <Trash2 size={16} />
                                                    Delete
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ================= Mobile ================= */}

            <div className="grid gap-4 md:hidden">
                {products.map((product) => (
                    <div
                        key={product._id}
                        className="card bg-base-100 border border-base-300 shadow-md"
                    >
                        <div className="card-body p-4">
                            <div className="flex gap-4">
                                <Image
                                    src={product.images[0]}
                                    alt={product.name}
                                    height={96}
                                    width={96}
                                    className="w-24 h-24 rounded-lg object-cover"


                                />

                                <div className="flex-1">
                                    <h2 className="font-bold line-clamp-2">
                                        {product.name}
                                    </h2>

                                    <p className="text-sm opacity-70">
                                        {product.categoryName}
                                    </p>

                                    <div className="mt-2">
                                        <span className="text-primary font-bold text-lg">
                                            ৳{getFinalPrice(product)}
                                        </span>

                                        <span className="ml-2 text-xs line-through opacity-60">
                                            ৳{product.price}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="divider my-3"></div>

                            <div className="grid grid-cols-2 gap-2 text-sm">
                                <div>
                                    <span className="opacity-60">Stock</span>
                                    <p className="font-semibold">
                                        {product.totalQuantity}
                                    </p>
                                </div>

                                <div>
                                    <span className="opacity-60">Gender</span>
                                    <p className="font-semibold">
                                        {product.gender}
                                    </p>
                                </div>

                                <div>
                                    <span className="opacity-60">Status</span>

                                    <div
                                        className={`badge mt-1 ${product.status === "Active"
                                            ? "badge-success"
                                            : "badge-error"
                                            }`}
                                    >
                                        {product.status}
                                    </div>
                                </div>

                                <div>
                                    <span className="opacity-60">Sizes</span>

                                    <div className="flex flex-wrap gap-1 mt-1">
                                        {product.sizes.map((size, i) => (
                                            <span
                                                key={i}
                                                className="badge badge-outline badge-sm"
                                            >
                                                {size.size}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="card-actions justify-end mt-4">
                                <button className="btn btn-ghost btn-sm">
                                    <Eye size={18} />
                                </button>

                                <button className="btn btn-ghost btn-sm">
                                    <Pencil size={18} />
                                </button>

                                <button className="btn btn-ghost btn-sm text-error">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default page;