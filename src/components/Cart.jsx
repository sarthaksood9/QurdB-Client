import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineDelete } from "react-icons/md";
import { removeFromCart } from '../redux/cartSlice';
import toast from 'react-hot-toast';
const Cart = ({ isCart }) => {


    const cartItems = useSelector(state => state.cart.cart);
    // console.log(cartItems);

    function trimTextToWordCount(text, wordCount) {
        const words = text.split(' ');
        if (words.length > wordCount) {
            return words.slice(0, wordCount).join(' ') + '...';
        }
        return text;
    }

    const dispatch = useDispatch();


    const handleRemove = (productId) => {
        toast.success("Items Removed From Cart")
        dispatch(removeFromCart(productId));
    };

    const Total = cartItems.map((i, x) => {
        return (i.price)
    })



    let sum = Total.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
    }, 0);

    



    return (
        // <div>
        <div className={`z-30 xl:w-[35%]  h-[92vh] transition-all flex flex-col duration-350 bg-white shadow-2xl absolute ${isCart ? "right-0" : "right-[-120%] xl:right-[-35%]"} px-2 py-4 gap-3`}>
            {cartItems.length !== 0 ? cartItems.map((i, x) => {

                return (
                    <div className='flex items-center justify-between px-5 py-5 border rounded-xl gap-1'>
                        <div>
                            {`${x + 1}.`}
                        </div>
                        <div className='flex items-center gap-5'>
                            <div>
                                <img src={i.image[0].url} alt="srv" width={100} height={100} />
                            </div>
                            <div>
                                {trimTextToWordCount(i.name, 3)}
                                {/* {i.name} */}
                            </div>
                        </div>
                        <div className='flex items-center gap-5'>
                            <div className='flex gap-1 bg-slate-100 p-[0.15rem] rounded-sm'>
                                <button className='bg-white rounded-sm px-1' onClick={() => { toast.error("Feature Comeing Soon..") }}>-</button>
                                <div>{i.quantity}</div>
                                <button onClick={() => { toast.error("Feature Comeing Soon..") }} className='bg-white rounded-sm px-1'>+</button>
                            </div>
                            <div onClick={() => { handleRemove(i._id) }} className='text-[1.6rem] text-red-500'>
                                <MdOutlineDelete />
                            </div>
                        </div>
                    </div>
                )
            }) : <div className='flex justify-center items-center h-full'><span>No Items In cart..</span></div>}

            <div className='absolute w-full bottom-20 px-4'>
                <div className='flex w-full'>
                    
                    <div>
                        SubTotal: {`$${sum}`}
                    </div>
                </div>
                <div className='flex justify-between '>
                <div>Discount: 0.00$</div>
                    <div className='ml-auto'>Total: {`$${sum}`}</div>
                </div>
            </div>

            <div className="mt-2 justify-self-end bottom-3 absolute w-[95%] flex items-center justify-between">

                <button
                    className="bg-[#18181B]  w-full bottom-6 px-2 py-4 rounded-full text-white font-semibold hover:bg-primary/90"
                >
                    Check Out
                </button>
            </div>

        </div>
        // </div>
    )
}

export default Cart