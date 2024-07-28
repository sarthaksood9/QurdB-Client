import React from 'react'

import upFo from "../Assits/Paste image.png"
import { HiOutlineMail } from "react-icons/hi";


const Upperfooter = () => {
    return (
        <div className=' hidden md:block relative'>
            <img src={upFo} />
            <div className='absolute flex flex-col gap-7 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
                <div className='text-center'>
                    <h1 className='text-[3rem] font-semibold'>Join Our Newsletter</h1>
                    <p>Sign up for deals, new products and promotions</p>
                </div>
                <div className='text-[#6C7275] flex gap-2 justify-between items-center border-b-[1px] border-[#6C7275] pb-3'>
                    <div className='flex gap-3 items-center '>
                        <HiOutlineMail className='text-[1.5rem]' />
                        <input className='w-[100%] bg-transparent border-none outline-none' placeholder='Email Address' />
                    </div>
                    <span className='cursor-pointer'>Send</span>
                </div>
            </div>
        </div>
    )
}

export default Upperfooter