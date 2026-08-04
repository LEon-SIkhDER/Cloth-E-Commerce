'use client'
import dynamic from 'next/dynamic';
import React from 'react';

const EditCategoryButtonDynamic = dynamic(() => import("./EditCategoryButton"), { ssr: false })

export default EditCategoryButtonDynamic;