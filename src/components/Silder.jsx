import React from 'react'
import { MdOutlineCoPresent } from 'react-icons/md';
import { PiProjectorScreenLight } from "react-icons/pi";
import { PiCurrencyCircleDollarLight } from "react-icons/pi";
import { useNavigate } from "react-router-dom";



const Silder = ({ children }) => {
    const navigate = useNavigate();
    // console.log(children.path);
    return (
        <div>
            <div className='bg-[#18181B] mt-14 fixed w-[15%] h-[100vh] flex gap-[10rem] items-center text-white flex-col '>

                <div className='w-[80%] mt-8 cursor-pointer'>
                    <div onClick={() => { navigate('/') }} className='w-full py-2 border-b-rose-50 border-b-[0.8px] flex justify-center items-center text-[1.1rem] gap-3'>
                        <PiProjectorScreenLight /><h1 className='self-end'>Products</h1>
                    </div>
                    <div onClick={() => { navigate('/statistics') }} className='w-full py-2 border-b-rose-50 border-b-[0.8px] flex justify-center items-center text-[1.1rem] gap-3'>
                        <PiCurrencyCircleDollarLight /><h1 className=''>Statistics</h1>
                    </div>
                    

                </div>
            </div>
            <main className='h-full w-[80%] ml-[15.5%] py-[6rem] px-10  '>
                {children}
            </main>
        </div>
    )
}

export default Silder