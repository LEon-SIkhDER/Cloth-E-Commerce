import { Plus, TagPlus } from 'lucide-react';
import React from 'react';
import AddPromoCodeButton from './AddPromoCodeButton';

const PromoCodes = () => {
    return (
        <div>
            <div className="flex flex-col justify-between gap-4 rounded-3xl border border-[#1f2520]/10 bg-white p-6 shadow-sm sm:flex-row sm:items-center">
                <div>
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#8d6047]">
                        Promotions
                    </p>
                    <h1 className="mt-2 text-4xl font-black text-[#1f2520]">
                        Promo Codes
                    </h1>
                    <p className="mt-2 text-sm text-[#657061]">
                        Create and manage promo codes, discounts, usage limits, expiration dates, and activation status.
                    </p>
                </div>

                <AddPromoCodeButton className="btn border border-[#f3eee5] bg-[#f6f2e9] text-black shadow-none">
                    <TagPlus className="mt-px" size={16} />
                    Add Promo Code
                </AddPromoCodeButton>
            </div>
        </div>
    );
};

export default PromoCodes;