import { Eye, MoreVertical, Pencil, Trash2 } from "lucide-react";
import AddProductFormModal from "./AddProductFormModal";
import Image from "next/image";
import getTotalProductCount from "@/lib/getTotalProductCount";
import ProductStatus from "./ProductStatus";
import Link from "next/link";
import DeleteProductButton from "./DeleteProductButton";
import dynamic from "next/dynamic";
import EditProductDynamic from "./EditProductDynamic";
// import { createPortal } from "react-dom";

const page = async () => {
    const productsRes = await fetch("http://localhost:8000/products", { cache: "no-store" });
    const products = await productsRes.json();

    const portalRoot = typeof document !== "undefined" ? document.body : null

    const getFinalPrice = (product) => {
        const price = Number(product.price);
        const discount = Number(product.discount);
        if (product.discountType === "taka") {
            return (price - discount);
        }
        if (product.discountType === "percentage") {
            return Math.round(price - (price * discount) / 100);
        }
        return price;
    };

    return (
        <div className="space-y-7">
            <div className="flex flex-col justify-between gap-4 rounded-3xl border border-[#1f2520]/10 bg-white p-6 shadow-sm sm:flex-row sm:items-center">
                <div>
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#8d6047]">Inventory</p>
                    <h1 className="mt-2 text-4xl font-black text-[#1f2520]">Products</h1>
                    <p className="mt-2 text-sm text-[#657061]">Manage pricing, status, stock, and product imagery.</p>
                </div>

                <AddProductFormModal />
            </div>

            <div className=" rounded-3xl border border-[#1f2520]/10 bg-white shadow-sm">
                <div className="">
                    <table className="table w-full table-zebra">
                        <thead className="bg-[#f1eadf] text-xs uppercase tracking-[0.14em] text-[#596255] " >
                            <tr >
                                <th className="rounded-tl-3xl">#</th>
                                <th>Image</th>
                                <th>Product</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Status</th>
                                <th className="text-center rounded-tr-3xl">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {products.map((product, index) => (
                                <tr key={product._id} className={`border-[#1f2520]/8 hover:bg-[#fbf8f1] ${products.length === index + 1 ? '*:first:rounded-bl-3xl *:last:rounded-br-3xl' : ""}`}>
                                    <td className="text-[#7a8276] ">{index + 1}</td>

                                    <td>
                                        <Image
                                            src={product.images[0].url}
                                            alt={product.name}
                                            width={64}
                                            height={64}
                                            className="h-16 w-16 rounded-2xl object-cover ring-1 ring-[#1f2520]/10"
                                        />
                                    </td>

                                    <td>
                                        <div>
                                            <h2 className="max-w-xs font-black leading-snug text-[#1f2520] line-clamp-2">{product.name}</h2>
                                            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#8d6047]">{product.gender}</p>
                                        </div>
                                    </td>

                                    <td className="font-semibold text-[#596255]">{product.categoryName}</td>

                                    <td>
                                        <div>
                                            <span className="font-black text-[#357329]">Tk {getFinalPrice(product)}</span>
                                            {Number(product.discount) > 0 && (
                                                <div className="text-xs text-[#8a9186] line-through">Tk {product.price}</div>
                                            )}
                                        </div>
                                    </td>

                                    <td>
                                        <span className="badge border-0 bg-[#f1eadf] font-bold text-[#1f2520]">{getTotalProductCount(product.variants)}</span>
                                    </td>

                                    <td>
                                        <span
                                            className={`badge border-0 font-bold capitalize ${product.status === "active"
                                                ? "bg-[#e6f4df] text-[#357329]"
                                                : product.status === "draft"
                                                    ? "bg-[#fff2c7] text-[#886318]"
                                                    : "bg-[#ffe8e1] text-[#a74432]"
                                                }`}
                                        >
                                            {product.status}
                                        </span>
                                    </td>

                                    <td className="text-center ">
                                        <div className="dropdown dropdown-end">
                                            <button tabIndex={0} className="btn btn-ghost btn-circle btn-sm">
                                                <MoreVertical size={18} />
                                            </button>

                                            <ul tabIndex={0} className="dropdown-content menu z-10 w-48 rounded-2xl border border-[#1f2520]/10 bg-base-100 p-2 shadow-xl">
                                                <li><Link href={`/dashboard/products/${product._id}`}><Eye size={16} />View</Link></li>
                                                <li><EditProductDynamic product={product}><Pencil size={16} />Edit</EditProductDynamic></li>
                                                <li><ProductStatus status={product.status}></ProductStatus></li>
                                                <li><DeleteProductButton id={product._id} className={"text-error"} ><Trash2 size={16} />Delete</DeleteProductButton></li>
                                            </ul>


                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {products.length === 0 && (
                <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-[#1f2520]/15 bg-white/70 py-20 text-center">
                    <h2 className="text-2xl font-black text-[#1f2520]">No products added yet</h2>
                    <p className="mt-2 text-[#667064]">Use the Add Product button to create your first catalog item.</p>
                </div>
            )}
        </div>
    );
};

export default page;
