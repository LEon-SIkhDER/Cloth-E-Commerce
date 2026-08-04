'use client'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { TagPlus } from 'lucide-react';
import React, { useRef, useState } from 'react';

const AddPromoCodeButton = ({ className, children }) => {
    const promoCodeModalRef = useRef()
    const { data: categoryNames } = useQuery({
        queryKey: ["category-names"],
        queryFn: async () => {
            const { data: result } = await axios.get("http://localhost:8000/categoryNames")
            return result
        }
    })
    console.log(categoryNames)
    const [customUsageLimitType, setCustomUsageLimitType] = useState(false)
    return (
        <>
            <button onClick={() => promoCodeModalRef.current.showModal()} className={className}>{children}</button>
            <dialog ref={promoCodeModalRef} className="modal">
                <div className="modal-box w-150 max-w-150 rounded-3xl border border-[#1f2520]/10 bg-white p-6 shadow-sm">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <div className="">
                        <h2 className="text-2xl font-bold text-[#1f2520]">
                            Add Promo Code
                        </h2>
                        <p className="mt-1 text-sm text-[#657061]">
                            Create a discount code customers can apply during checkout.
                        </p>
                        <form >
                            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">

                                {/* Promo Code */}
                                <div>
                                    <label className="label">
                                        <span className="label-text font-semibold">Promo Code</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="SAVE20"
                                        className="input input-bordered w-full uppercase"
                                    />
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="label">
                                        <span className="label-text font-semibold">Description</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="20% off all orders"
                                        className="input input-bordered w-full"
                                    />
                                </div>

                                {/* Discount Type */}
                                <div>
                                    <label className="label">
                                        <span className="label-text font-semibold">Discount Type</span>
                                    </label>
                                    <select className="select select-bordered w-full">
                                        <option>Percentage</option>
                                        <option>Fixed Amount</option>
                                    </select>
                                </div>

                                {/* Discount Value */}
                                <div>
                                    <label className="label">
                                        <span className="label-text font-semibold">Discount Value</span>
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="20"
                                        className="input input-bordered w-full"
                                    />
                                </div>

                                {/* Minimum Order */}
                                <div>
                                    <label className="label">
                                        <span className="label-text font-semibold">
                                            Minimum Order
                                        </span>
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="Maximum discount amount"
                                        className="input input-bordered w-full"
                                    />
                                </div>

                                {/* Maximum Discount */}
                                <div>
                                    <label className="label">
                                        <span className="label-text font-semibold">
                                            Maximum Discount
                                        </span>
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="Maximum discount amount"
                                        className="input input-bordered w-full"
                                    />
                                </div>

                                {/* Usage Limit */}
                                <div>
                                    <label className="label">
                                        <span className="label-text font-semibold">Usage Limit</span>
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="100"
                                        className="input input-bordered w-full"
                                    />
                                </div>

                                {/* Per Customer */}
                                <div>
                                    <label className="label">
                                        <span className="label-text font-semibold">
                                            Per Customer Limit
                                        </span>
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="1"
                                        className="input input-bordered w-full"
                                    />
                                </div>

                                {/* Start */}
                                <div>
                                    <label className="label">
                                        <span className="label-text font-semibold">Start Date</span>
                                    </label>
                                    <input
                                        type="date"
                                        className="input input-bordered w-full"
                                    />
                                </div>

                                {/* Expiry */}
                                <div>
                                    <label className="label">
                                        <span className="label-text font-semibold">Expiry Date</span>
                                    </label>
                                    <input
                                        type="date"
                                        className="input input-bordered w-full"
                                    />
                                </div>


                            </div>
                        </form>


                        <div className="mt-8 flex justify-end gap-3">
                            <button className="btn btn-ghost">
                                Cancel
                            </button>

                            <button className="btn bg-[#8d6047] text-white hover:bg-[#744d38]">
                                Save Promo Code
                            </button>
                        </div>
                    </div>

                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    );
};

export default AddPromoCodeButton;  