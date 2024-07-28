import React, { useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineDelete } from "react-icons/md";
import { removeFromCart } from '../redux/cartSlice';
import toast from 'react-hot-toast';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Cart = ({ isCart, mod }) => {

    const user = useContext(UserContext);

    const [loading, setLoading] = useState(false);

    const cartItems = useSelector(state => state.cart.cart);
    console.log(cartItems);

    // Function to trim text to a specified word count

    function trimTextToWordCount(text, wordCount) {
        const words = text.split(' ');
        if (words.length > wordCount) {
            return words.slice(0, wordCount).join(' ') + '...';
        }
        return text;
    }

    const dispatch = useDispatch();

    // Handling removing an item from the cart
    const handleRemove = async (productId) => {
        setLoading(true);
        try {


            const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/cart/remove`, {
                data: {
                    userId: user.user._id,
                    productId: productId
                }
            });
            toast.success("Item Removed From Cart");
            dispatch(removeFromCart(productId));
        } catch (error) {
            console.error('Error removing item from cart:', error);
            toast.error("Failed to remove item from cart");
            setLoading(false);
        }
    };



    // Calculate total price of items in the cart


    const Total = cartItems.map((i, x) => {
        return (i.price)
    })


    let sum = Total.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
    }, 0);


    const navigate=useNavigate();






    return (
        // <div>
        <div className={`z-30 w-full md:w-[50%] xl:w-[35%] overflow-x-scroll  h-[92vh] transition-all flex flex-col duration-350 bg-white shadow-2xl fixed mt-16 ${isCart ? "right-0" : "right-[-150%] xl:right-[-35%]"} px-2 py-4 gap-3`}>
            {cartItems.length !== 0 ? cartItems.map((i, x) => {

                return (
                    <div className={`flex items-center justify-between px-5 py-5 border rounded-xl gap-1 ${x == cartItems.length - 1 ? "mb-36" : "mb-0"}`}>
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
                                <button onClick={() => { toast.error("Feature Coming Soon...") }} className='bg-white rounded-sm px-1'>+</button>
                            </div>
                            <div onClick={() => { handleRemove(i._id) }} className='text-[1.6rem] text-red-500'>
                                <MdOutlineDelete />
                            </div>
                        </div>
                    </div>
                )
            }) : <div className='flex justify-center items-center h-full'><span>No Items In cart..</span></div>}

            <div className='relative w-full h-full bottom-0'>
                <div className='absolute bg-white w-full bottom-20 px-4'>
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
                        onClick={() => { navigate("/order"); mod() }}
                        className="bg-[#18181B]  w-full bottom-6 px-2 py-4 rounded-full text-white font-semibold hover:bg-primary/90"
                    >
                        Check Out
                    </button>
                </div>
            </div>

        </div>
        // </div>
    )
}

export default Cart