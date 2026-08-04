"use client"
import Skeleton from "react-loading-skeleton";
// import AddCategoryFormModal from "../categories/AddCategoryFormModal";
import { Plus } from "lucide-react";


const loading = () => {
    const categories = [...Array(8)]


    return (
        <div className="space-y-7">
            <div className="flex flex-col justify-between gap-4 rounded-3xl border border-[#1f2520]/10 bg-white p-6 shadow-sm sm:flex-row sm:items-center">
                <div>
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#8d6047]">Catalog setup</p>
                    <h1 className="mt-2 text-4xl font-black text-[#1f2520]">Categories</h1>
                    <p className="mt-2 text-sm text-[#657061]">Manage collection groups, visuals, and storefront availability.</p>
                </div>
                <button className='btn bg-[#f6f2e9] shadow-none border border-[#f3eee5] text-black'><Plus className='mt-px' size={16} /> Add Category</button>
            </div>
            <div className=" rounded-3xl border border-[#1f2520]/10 bg-white shadow-sm">
                <div className="">
                    <table className="table w-full">
                        <thead className="bg-[#f1eadf] text-xs uppercase tracking-[0.14em] text-[#596255]">
                            <tr className='*:first:rounded-tl-3xl *:last:rounded-tr-3xl'>
                                <th className="text-center"> #</th>
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
                            {categories.map((_, index) => (
                                <tr key={index} className={`border-[#1f2520]/8 ${categories.length === index + 1 ? "*:first:rounded-bl-3xl *:last:rounded-br-3xl" : ""}`}>
                                    <th className="text-[#7a8276]  text-center"><Skeleton /></th>

                                    <td>

                                        <div className=" h-12 w-12 rounded-2xl" >
                                            <Skeleton width={48} height={48}  />
                                        </div>

                                    </td>

                                    <td className="font-black text-[#1f2520]"><Skeleton height={24} /></td>
                                    <td className="max-w-xs text-sm text-[#677064]"><Skeleton /></td>

                                    <td>
                                        <Skeleton />
                                    </td>

                                    <td className="text-sm text-[#677064]"><Skeleton /></td>
                                    <td className="text-sm text-[#677064]"><Skeleton /></td>
                                    <td>
                                        <div className="text-center">
                                            <Skeleton />
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

export default loading;
