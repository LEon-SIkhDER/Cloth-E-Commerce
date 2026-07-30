"use client"
import { Triangle } from 'lucide-react';
import Image from 'next/image';
import React, { useRef, useState } from 'react';

const ImageModalButton = ({ images, index: imageIndex, alt, children }) => {
    const imageModalRef = useRef()
    const [index, setIndex] = useState(imageIndex)

    console.log(images)
    console.log(images[index])

    return (
        <>
            <button onClick={() => imageModalRef.current.showModal()} className='cursor-pointer' >{children}</button>
            <dialog ref={imageModalRef} className="modal select-none">
                <div className="modal-box p-0">
                    <button onClick={() => setIndex(prev => prev - 1)} disabled={index === 0} type='button' className='cursor-pointer absolute left-0  top-0 bottom-0  disabled:active:*:border-red-500    opacity-30 hover:opacity-100 duration-300 transition-all'>
                        <Triangle size={16} fill='white' className='-rotate-90 bg-[#212a35] px-3 py-1 box-content rounded scale-y-90 border border-transparent' />
                    </button>
                    <Image
                        src={images[index].url}
                        alt={alt}
                        width={512}
                        height={0}
                        className="object-cover   "
                    />
                    <button onClick={() => setIndex(prev => prev + 1)} disabled={index + 1 === images.length} type='button' className='cursor-pointer absolute right-0  top-0 bottom-0   disabled:active:*:border-red-500    opacity-30 hover:opacity-100 duration-300 transition-all'>
                        <Triangle size={16} fill='white' className='rotate-90 bg-[#212a35] px-3 py-1 box-content rounded scale-y-90  border border-transparent' />
                    </button>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

        </>
    );
};

export default ImageModalButton;