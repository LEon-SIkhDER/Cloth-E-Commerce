import React from 'react';
import AddCategoryFormModal from './AddCategoryFormModal';
import Image from 'next/image';
import { format } from 'date-fns';
import { EllipsisVertical, Eye, Shirt, SquarePen } from 'lucide-react';
import DeleteCategory from './DeleteCategory';
import DeactivateCategory from './DeactivateCategory';
import Link from 'next/link';

const Categories = async () => {
    const categoriesRes = await fetch("http://localhost:8000/categories")
    const categories = await categoriesRes.json()
    const categoryNames = categories?.map(category => category.name.toLowerCase().trim())

    return (
        <div className="space-y-7">
            <div className="flex flex-col justify-between gap-4 rounded-[1.5rem] border border-[#1f2520]/10 bg-white p-6 shadow-sm sm:flex-row sm:items-center">
                <div>
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#8d6047]">Catalog setup</p>
                    <h1 className="mt-2 text-4xl font-black text-[#1f2520]">Categories</h1>
                    <p className="mt-2 text-sm text-[#657061]">Manage collection groups, visuals, and storefront availability.</p>
                </div>
                <AddCategoryFormModal categoryNames={categoryNames}></AddCategoryFormModal>
            </div>
            <div className="overflow-hidden rounded-[1.5rem] border border-[#1f2520]/10 bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead className="bg-[#f1eadf] text-xs uppercase tracking-[0.14em] text-[#596255]">
                            <tr>
                                <th>#</th>
                                <th>Logo</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Status</th>
                                <th>Created</th>
                                <th>Updated</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {categories.map((category, index) => (
                                <tr key={category._id} className="border-[#1f2520]/8 hover:bg-[#fbf8f1]">
                                    <th className="text-[#7a8276]">{index + 1}</th>

                                    <td>
                                        {category.logo ?
                                            <Image
                                                src={category.logo}
                                                alt={category.name}
                                                height={48}
                                                width={48}
                                                className="h-12 w-12 rounded-2xl object-cover ring-1 ring-[#1f2520]/10"
                                            /> :
                                            <div className="grid h-12 w-12 place-items-center rounded-2xl border border-[#1f2520]/10 bg-[#f6f2e9] text-[#8d6047]" >
                                                <Shirt size={20} />
                                            </div>
                                        }
                                    </td>

                                    <td className="font-black text-[#1f2520]">{category.name}</td>
                                    <td className="max-w-xs text-sm text-[#677064]">{category.description}</td>

                                    <td>
                                        {category.isActive ? (
                                            <span className="badge border-0 bg-[#e6f4df] font-bold text-[#357329]">Active</span>
                                        ) : (
                                            <span className="badge border-0 bg-[#ffe8e1] font-bold text-[#a74432]">Inactive</span>
                                        )}
                                    </td>

                                    <td className="text-sm text-[#677064]">{format(new Date(category.createdAt), "dd MMM yyyy")}</td>
                                    <td className="text-sm text-[#677064]">{format(new Date(category.updatedAt), "dd MMM yyyy")}</td>
                                    <td>
                                        <div className="text-center">
                                            <div className="dropdown dropdown-left">
                                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle btn-sm">
                                                    <EllipsisVertical size={18} />
                                                </div>
                                                <ul tabIndex="-1" className="dropdown-content menu z-10 w-52 rounded-2xl border border-[#1f2520]/10 bg-white p-2 shadow-xl">
                                                    <li><Link href={`categories/${category._id}`}><Eye size={16} />View</Link></li>
                                                    <li><a><SquarePen size={16} />Edit</a></li>
                                                    <DeactivateCategory categoryData={{ id: category._id, isActive: !category.isActive }}></DeactivateCategory>
                                                    <DeleteCategory categoryId={category._id} ></DeleteCategory>
                                                </ul>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Categories;
