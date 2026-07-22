"use client"
import { Ban, CircleCheckBig } from 'lucide-react';
import React from 'react';

const ProductStatus = ({ status }) => {
    console.log('status from fn', status)
    return (
        <>
            {
                status === "draft" || "inActive" ?
                    <button className='text-success'><CircleCheckBig size={16} />Activate</button>
                    :
                    <button className='text-warning'><Ban size={16} />Deactivate</button>

            }
        </>

    );
};

export default ProductStatus;