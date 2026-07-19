import React from 'react';
import AddCategoryFormModal from './AddCategoryFormModal';
import Image from 'next/image';
import { format } from 'date-fns';
import { Ban, EllipsisVertical, Eye, Shirt, SquarePen, Trash2 } from 'lucide-react';
import DeleteCategory from './DeleteCategory';
import DeactivateCategory from './DeactivateCategory';
import Link from 'next/link';

const Categories = async () => {
    const categoriesRes = await fetch("http://localhost:8000/categories")
    const categories = await categoriesRes.json()
    console.log(categories)
    // return
    return (
        <div>
            <div className='flex justify-between'>

                <div>
                    <h1 className='font-bold text-4xl'>Categories</h1>
                    <p>Manage all categories here</p>
                </div>
                <AddCategoryFormModal></AddCategoryFormModal>
            </div>
            <div className="">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Logo</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Created At</th>
                            <th>Updated At</th>
                            <th className='text-center'>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            categories.map((category, index) => (
                                <tr key={category._id}>
                                    <th>{index + 1}</th>

                                    <td>
                                        {category.logo ?

                                            <Image
                                                src={category.logo}
                                                alt={category.name}
                                                height={48}
                                                width={48}
                                                className="w-12 h-12 rounded-lg object-cover"
                                            /> :
                                            <div className='w-12 h-12 rounded-lg flex items-center justify-center border border-white/10' >
                                                <Shirt />
                                            </div>
                                        }

                                    </td>

                                    <td className="font-semibold">
                                        {category.name}
                                    </td>

                                    <td>
                                        {category.description}
                                    </td>

                                    <td>
                                        {
                                            category.isActive ? (
                                                <span className="badge badge-success">
                                                    Active
                                                </span>
                                            ) : (
                                                <span className="badge badge-error">
                                                    Inactive
                                                </span>
                                            )
                                        }
                                    </td>

                                    <td>
                                        {format(
                                            new Date(category.createdAt),
                                            "dd MMM yyyy"
                                        )}
                                    </td>

                                    <td>
                                        {format(
                                            new Date(category.updatedAt),
                                            "dd MMM yyyy"
                                        )}
                                    </td>
                                    <td className=''>
                                        <div className='text-center'>
                                            <div className="dropdown dropdown-left ">
                                                <div tabIndex={0} role='button' className='cursor-pointer' >
                                                    <EllipsisVertical />
                                                </div>
                                                {/* <div tabIndex={0} role="button" className="btn m-1">Click</div> */}
                                                <ul tabIndex="-1" className="dropdown-content menu bg-base-100 border border-white/10 rounded-box z-1 w-52 p-2 shadow-sm *:text-left  ">
                                                    <li><Link href={`category/${category._id}`}><Eye size={16} />View</Link></li>
                                                    <li><a><SquarePen size={16} />Edit</a></li>
                                                    <DeactivateCategory categoryData={{ id: category._id, isActive: !category.isActive }}></DeactivateCategory>
                                                    <DeleteCategory categoryId={category._id} ></DeleteCategory>
                                                </ul>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Categories;