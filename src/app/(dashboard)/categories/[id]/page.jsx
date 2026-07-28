import Image from "next/image";
import Link from "next/link";

const CategoryDetailsPage = async ({ params }) => {
    const { id } = await params
    console.log(id)

    const [categoryRes, productsRes] = await Promise.all([
        fetch(`http://localhost:8000/category/${id}`),
        fetch(`http://localhost:8000/products/${id}`)
    ])
    const [category, products] = await Promise.all([
        categoryRes.json(),
        productsRes.json()
    ])
    console.log(category, products)

    const getFinalPrice = (product) => {
        const price = Number(product.price);
        const discount = Number(product.discount);

        if (product.discountType === "taka") {
            return price - discount;
        }

        return price - (price * discount) / 100;
    };


    return (
        <div className="space-y-8">

            {/* Category Header */}
            <div className="rounded-xl   p-6 bg-black/10">
                <div className="flex items-center gap-5">

                    <Image
                        src={category.logo}
                        alt={category.name}
                        width={90}
                        height={90}
                        className="rounded-lg border border-white/10"
                    />

                    <div>
                        <h1 className="text-3xl font-bold">{category.name}</h1>

                        <p className="text-gray-500 mt-2">
                            {category.description}
                        </p>

                        <div className="flex gap-3 mt-4">
                            <span
                                className={`badge ${category.isActive
                                    ? "badge-success"
                                    : "badge-error"
                                    }`}
                            >
                                {category.isActive ? "Active" : "Inactive"}
                            </span>

                            <span className="badge badge-outline">
                                {products.length} Products
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Products */}
            <div>

                <h2 className="text-2xl font-semibold mb-5">
                    Products
                </h2>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                    {products.map((product) => {

                        const totalStock = product.variants.reduce(
                            (sum, item) => sum + Number(item.quantity),
                            0
                        );

                        return (
                            <div
                                key={product._id}
                                className="border border-white/10 rounded-xl overflow-hidden "
                            >
                                <Image
                                    src={product.images[0].url}
                                    alt={product.name}
                                    width={600}
                                    height={600}
                                    className="aspect-square object-cover"
                                />

                                <div className="p-5 space-y-3">

                                    <h3 className="font-semibold line-clamp-2">
                                        {product.name}
                                    </h3>

                                    <div className="flex items-center gap-3">

                                        <span className="text-lg font-bold text-primary">
                                            ৳{getFinalPrice(product)}
                                        </span>

                                        <span className="line-through text-gray-400">
                                            ৳{product.price}
                                        </span>

                                    </div>

                                    <div className="grid grid-cols-2 gap-y-2 text-sm">

                                        <p>
                                            <span className="font-medium">
                                                Material:
                                            </span>{" "}
                                            {product.material}
                                        </p>

                                        <p>
                                            <span className="font-medium">
                                                Gender:
                                            </span>{" "}
                                            {product.gender}
                                        </p>

                                        <p>
                                            <span className="font-medium">
                                                Variants:
                                            </span>{" "}
                                            {product.variants.length}
                                        </p>

                                        <p>
                                            <span className="font-medium">
                                                Stock:
                                            </span>{" "}
                                            {totalStock}
                                        </p>

                                    </div>

                                    <div className="flex justify-between items-center pt-3">

                                        <span
                                            className={`badge ${product.status === "active"
                                                ? "badge-success"
                                                : product.status === "draft"
                                                    ? "badge-warning"
                                                    : "badge-error"
                                                }`}
                                        >
                                            {product.status}
                                        </span>

                                        <div className="flex gap-2">

                                            <Link
                                                href={`/products/${product._id}`}
                                                className="btn btn-sm"
                                            >
                                                View
                                            </Link>

                                            <Link
                                                href={`/dashboard/products/edit/${product._id}`}
                                                className="btn btn-sm btn-primary"
                                            >
                                                Edit
                                            </Link>

                                        </div>

                                    </div>

                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </div>
    );
};

export default CategoryDetailsPage;