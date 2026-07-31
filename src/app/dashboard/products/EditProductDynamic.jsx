"use client"
import dynamic from 'next/dynamic';
import React from 'react';

const EditProductDynamic = dynamic(() => import("./EditProduct"), { ssr: false })




export default EditProductDynamic;