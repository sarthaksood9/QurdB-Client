import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const SideBar = ({sideBar,mod}) => {
    // const [sideBar, setSideBar] = useState(true);
    const navigate=useNavigate()
    return (
        <div className={`z-50 w-full md:w-[50%] xl:w-[35%] overflow-x-scroll mt-16  h-[100vh] transition-all flex flex-col duration-350 bg-white shadow-2xl fixed items-center  ${sideBar ? "left-0" : "left-[-150%] xl:left-[-35%]"} px-2 py-4 gap-3`}>
            {/* <div className='bg-[#18181B] mt-14 fixed w-[15%] h-[100vh] flex gap-[10rem] items-center text-white flex-col '> */}

                <div className='w-[80%] mt-8 cursor-pointer'>
                    <div onClick={() => { navigate('/');mod() }} className='w-full py-2 border-b-black border-b-[1px] flex justify-center items-center text-[1.1rem] gap-3'>
                        <h1 className='self-end'>Home</h1>
                    </div>
                    <div onClick={() => { navigate('/shop');mod() }} className='w-full py-2  border-b-black border-b-[1px] flex justify-center items-center text-[1.1rem] gap-3'>
                        <h1 className=''>Shop</h1>
                    </div>
                    <div onClick={() => { navigate('/shop');mod() }} className='w-full py-2  border-b-black border-b-[1px] flex justify-center items-center text-[1.1rem] gap-3'>
                        <h1 className=''>Products</h1>
                    </div>
                    <div onClick={() => { navigate('/shop');mod() }} className='w-full py-2  border-b-black border-b-[1px] flex justify-center items-center text-[1.1rem] gap-3'>
                        <h1 className=''>Contact</h1>
                    </div>


                </div>
            {/* </div> */}

        </div>
    )
}

export default SideBar