import React, { useState } from 'react'
import { IoMdCart } from "react-icons/io";
import { useSelector } from 'react-redux';
import { RxAvatar } from "react-icons/rx";

import Cart from './Cart';
import { UserContext } from '../context/UserContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    // Accessing cart items from Redux store
    const cartItems = useSelector(state => state.cart.cart);

    // Accessing user context
    const user = useContext(UserContext);

    // State for toggling the cart visibility
    const [isCart, setIsCart] = useState(false);
    
    // Function to close the cart
    const closeCart = () => {
        setIsCart(false)
    }
    const navigate = useNavigate();
    return (
        <div>
            <div className='h-[8vh] cursor-pointer fixed z-10 text-[white] w-full bg-[#18181B] flex justify-between items-center px-7'>
                <div onClick={() => { navigate("/") }}>
                    <h1>E-Com</h1>
                </div>
                <div className='flex gap-10'>
                   { user.user?.role === "user" && <div onClick={() => { setIsCart(!isCart) }} className=' relative w-fit'>
                        <IoMdCart className='text-[1.5rem]' />
                        <div className=' absolute bottom-[-1px] px-1 right-[-10px] rounded-full bg-white text-black text-center text-[0.7rem]'>{cartItems.length}</div>
                    </div>}
                    <div onClick={() => { user.logOut(); setIsCart(false) }} className=' profile hover:after:flex  w-fit relative transition-all duration-500    after:hidden after:content-["LogOut"] after:mt-1 after:absolute after:left-[-100%] after:bg-[white] after:text-[black] after:shadow-[rgba(0,0,0,0.35)_0px_5px_15px] after:px-2.5 py-[5px] after:rounded-[10px]'>
                        <RxAvatar className='text-[1.5rem]' />
                        {/* <div className=' absolute bottom-[-10px] px-1 right-[-10px] rounded-full bg-white text-black text-center text-[0.7rem]'>{cartItems.length}</div> */}
                    </div>
                </div>
            </div>
            <Cart isCart={isCart} mod={closeCart} />
        </div>

    )
}

export default Navbar