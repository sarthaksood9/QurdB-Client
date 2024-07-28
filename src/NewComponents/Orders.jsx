import React, { useState } from 'react'
import img from "../Assits/livingRoom.png"
import { RxCross2 } from "react-icons/rx";
import { useSelector } from 'react-redux';
import { IoCheckmarkOutline } from "react-icons/io5";
import { CiCreditCard1 } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';



const Orders = () => {
    const cartItems = useSelector(state => state.cart.cart);
    function trimTextToWordCount(text, wordCount) {
        const words = text.split(' ');
        if (words.length > wordCount) {
            return words.slice(0, wordCount).join(' ') + '...';
        }
        return text;
    }


    const [shippingMethod, setShippingMethod] = useState('Free shipping');
    const handleShippingChange = (method) => {
        setShippingMethod(method);
    };


    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const calculateTotal = () => {
        const subtotal = calculateSubtotal();
        let shippingCost = 0;

        switch (shippingMethod) {
            case 'Express shipping':
                shippingCost = 15.00;
                break;
            case 'Pick Up':
                shippingCost = 21.00;
                break;
            default:
                shippingCost = 0;
        }

        return subtotal + shippingCost;
    };

    const navigate = useNavigate();

    const [page, setPage] = useState("Cart");


    const width = window.innerWidth;
    return (
        <div className='py-24 flex flex-col w-full px-4 md:px-12 lg:px-24 '>
            <div className='w-full text-center text-[3rem] font-medium'>
                <h1>{page}</h1>
            </div>
            <div className='flex gap-10 justify-center'>
                <div onClick={() => { setPage("Cart") }} className={` ${width <= 1024 && page !== "Cart" ? "hidden" : "flex"}  items-center gap-3  w-fit py-7 ${page === "Checkout details" || page === "Order complete" ? "border-[#38CB8A]" : "border-black"} lg:px-16 border-b-[2px] border-black`}>
                    <div className={`w-[2.1rem] h-[2.1rem] flex justify-center items-center text-white ${page === "Checkout details" || page === "Order complete" ? "bg-[#38CB8A]" : "bg-black"} rounded-full font-medium`}>
                        {page === "Checkout details" || page === "Order complete" ? <IoCheckmarkOutline /> :
                            <h1>1</h1>
                        }
                    </div>
                    <div>Shopping Cart</div>
                </div>
                <div onClick={() => { setPage("Checkout details") }} className={`${width <= 1024 && page !== "Checkout details" ? "hidden" : "flex"} items-center gap-3  w-fit py-7 ${page === "Order complete" ? "border-[#38CB8A]" : "border-black"} lg:px-16 border-b-[2px] border-black`}>
                    <div className={`w-[2.1rem] h-[2.1rem] flex justify-center items-center text-white ${page === "Order complete" ? "bg-[#38CB8A]" : "bg-black"} rounded-full font-medium`}>
                        {page === "Order complete" ? <IoCheckmarkOutline /> :
                            <h1>2</h1>
                        }
                    </div>
                    <div>Checkout details</div>
                </div>
                <div onClick={() => { setPage("Order complete") }} className={`${width <= 1024 && page !== "Order complete" ? "hidden" : "flex"} items-center gap-3  w-fit py-7 lg:px-16 border-b-[2px] border-black`}>
                    <div className='w-[2.1rem] h-[2.1rem] flex justify-center items-center text-white bg-black  rounded-full font-medium'><h1>3</h1></div>
                    <div>Order complete</div>
                </div>
            </div>

            {page === "Cart" ?
                <div className='flex w-full gap-4 flex-col lg:flex-row mt-10'>
                    <div className='flex flex-col w-full lg:w-1/2'>
                        <div className='flex justify-between w-full  py-3 border-b-[1.6px] border-black'>
                            <div>Product</div>
                            <div className='flex justify-between w-1/2'>
                                <h1 className='hidden md:block'>Quantity</h1>
                                <h1>Price</h1>
                                <h1>Subtotal</h1>
                            </div>
                        </div>
                        {cartItems.map((i, x) => {
                            return (
                                <div className='flex justify-between w-full py-3 border-b-2'>
                                    <div className='flex gap-2'>
                                        <div className='w-16 h-20 object-contain'>
                                            <img className='w-full h-full' src={i.image[0].url} alt="img" />
                                        </div>
                                        <div className='flex flex-col justify-between h-full py-[0.15rem]'>
                                            <h1 className='font-medium'>{trimTextToWordCount(i.name, 2)}</h1>
                                            <p className='text-[0.8rem] text-gray-400'>Color: Black</p>
                                            <div className='flex items-center gap-1 text-gray-500 font-medium'>
                                                <RxCross2 />
                                                <h1 className='text-[0.8rem]'>Remove</h1>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex h-full items-center justify-between w-1/2'>
                                        <div className="hidden  md:flex items-center justify-center gap-2 border-[1px] border-black rounded-md h-fit overflow-hidden">
                                            <button className=" px-2 py-[0.18rem] rounded-sm text-gray-500 hover:bg-gray-300" >
                                                -
                                            </button>
                                            <span>{i.quantity}</span>
                                            <button className=" px-2 py-[0.18rem] rounded-sm text-gray-500 hover:bg-gray-300">
                                                +
                                            </button>
                                        </div>
                                        <div>
                                            <h1>{`$${i.price}.00`}</h1>
                                        </div>
                                        <div>
                                            <h1 className='font-semibold'>{`$${i.price}.00`}</h1>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>


                    <div className='w-full lg:w-1/2 flex justify-center items-center'>
                        <div className="border-black border-[1px] p-4 rounded-md w-[90%] lg:w-[70%]">
                            <h2 className="text-xl font-bold mb-6">Cart summary</h2>

                            <div className="flex items-center mb-2 border-black border-[1px] px-5 py-2 rounded-md">
                                <input
                                    type="radio"
                                    name="shipping"
                                    id="free-shipping"
                                    checked={shippingMethod === 'Free shipping'}
                                    onChange={() => handleShippingChange('Free shipping')}
                                    className="mr-2"
                                />
                                <label htmlFor="free-shipping" className="font-medium">Free shipping</label>
                                <span className="ml-auto">${shippingMethod === 'Free shipping' ? '0.00' : ''}</span>
                            </div>

                            <div className="flex items-center mb-2 border-black border-[1px] px-5 py-2 rounded-md">
                                <input
                                    type="radio"
                                    name="shipping"
                                    id="express-shipping"
                                    checked={shippingMethod === 'Express shipping'}
                                    onChange={() => handleShippingChange('Express shipping')}
                                    className="mr-2"
                                />
                                <label htmlFor="express-shipping" className="font-medium">Express shipping</label>
                                <span className="ml-auto">${shippingMethod === 'Express shipping' ? '+15.00' : ''}</span>
                            </div>

                            <div className="flex items-center mb-10 border-black border-[1px] px-5 py-2 rounded-md">
                                <input
                                    type="radio"
                                    name="shipping"
                                    id="pick-up"
                                    checked={shippingMethod === 'Pick Up'}
                                    onChange={() => handleShippingChange('Pick Up')}
                                    className="mr-2"
                                />
                                <label htmlFor="pick-up" className="font-medium">Pick Up</label>
                                <span className="ml-auto">${shippingMethod === 'Pick Up' ? '%21.00' : ''}</span>
                            </div>


                            <div className="flex items-center justify-between mb-2 border-b pb-1">
                                <p className="font-medium">Subtotal</p>
                                <p>${calculateSubtotal().toFixed(2)}</p>
                                {/* <p>200</p> */}
                            </div>

                            <div className="flex items-center justify-between mb-4">
                                <p className="font-bold">Total</p>
                                <p>${calculateTotal().toFixed(2)}</p>
                                {/* <p>200</p> */}
                            </div>

                            <div className='pt-5'>
                                <button onClick={() => { setPage("Checkout details") }} className="bg-black w-full text-white px-4 py-2 rounded-md hover:bg-gray-800">
                                    Checkout
                                </button>
                            </div>
                        </div>
                    </div>

                </div> :
                page === "Checkout details" ?


                    <div className='flex w-full gap-4 flex-col-reverse lg:flex-row py-10'>
                        <div className='w-full lg:w-1/2 flex flex-col gap-7'>
                            <div className='flex rounded-md flex-col gap-5 w-full px-6 py-7 border-black border-[1px]'>
                                <div>
                                    <h1 className='text-[1.3rem] font-medium'>Contact Infomation</h1>
                                </div>
                                <div className='flex gap-4 w-full'>
                                    <div className='flex flex-col gap-[0.45rem] w-full'>
                                        <label className='text-gray-500 font-semibold text-[0.9rem] px-1' htmlFor="First Name">FIRST NAME</label>
                                        <input className='w-full border-gray-400 border-[1px] px-2 py-1 rounded-md' type="text" name='First Name' placeholder='First Name' />
                                    </div>
                                    <div className='flex flex-col gap-[0.45rem] w-full'>
                                        <label className='text-gray-500 font-semibold text-[0.9rem] px-1' htmlFor="First Name">LAST NAME</label>
                                        <input className='w-full border-gray-400 border-[1px] px-2 py-1 rounded-md' type="text" name='First Name' placeholder='First Name' />
                                    </div>
                                </div>
                                <div className='flex flex-col gap-[0.45rem] w-full'>
                                    <label className='text-gray-500 font-semibold text-[0.9rem] px-1' htmlFor="Phone Number">PHONE NUMBER</label>
                                    <input className='w-full border-gray-400 border-[1px] px-2 py-1 rounded-md' type="text" name='Phone Number' placeholder='Phone Number' />
                                </div>
                                <div className='flex flex-col gap-[0.45rem] w-full'>
                                    <label className='text-gray-500 font-semibold text-[0.9rem] px-1' htmlFor="Email address">EMAIL ADDRESS</label>
                                    <input className='w-full border-gray-400 border-[1px] px-2 py-1 rounded-md' type="text" name='Email address' placeholder='Your Email' />
                                </div>

                            </div>
                            <div className='flex rounded-md flex-col gap-5 w-full px-6 py-7 border-black border-[1px]'>
                                <div>
                                    <h1 className='text-[1.3rem] font-medium'>Shipping Address</h1>
                                </div>
                                <div className='flex flex-col gap-[0.45rem] w-full'>
                                    <label className='text-gray-500 font-semibold text-[0.9rem] px-1' htmlFor="Street Address">STREET ADDRESS *</label>
                                    <input className='w-full border-gray-400 border-[1px] px-2 py-1 rounded-md' type="text" name='Street Address' placeholder='Street Address' />
                                </div>
                                <div className='flex flex-col gap-[0.45rem] w-full'>
                                    <label className='text-gray-500 font-semibold text-[0.9rem] px-1' htmlFor="Country">COUNTRY *</label>
                                    <input className='w-full border-gray-400 border-[1px] px-2 py-1 rounded-md' type="text" name='Country' placeholder='Country' />
                                </div>
                                <div className='flex flex-col gap-[0.45rem] w-full'>
                                    <label className='text-gray-500 font-semibold text-[0.9rem] px-1' htmlFor="Town / City">TOWN / CITY *</label>
                                    <input className='w-full border-gray-400 border-[1px] px-2 py-1 rounded-md' type="text" name='Town / City' placeholder='Town / City' />
                                </div>
                                <div className='flex gap-4 w-full'>
                                    <div className='flex flex-col gap-[0.45rem] w-full'>
                                        <label className='text-gray-500 font-semibold text-[0.9rem] px-1' htmlFor="State">STATE *</label>
                                        <input className='w-full border-gray-400 border-[1px] px-2 py-1 rounded-md' type="text" name='State' placeholder='State' />
                                    </div>
                                    <div className='flex flex-col gap-[0.45rem] w-full'>
                                        <label className='text-gray-500 font-semibold text-[0.9rem] px-1' htmlFor="Zip Code">ZIP CODE *</label>
                                        <input className='w-full border-gray-400 border-[1px] px-2 py-1 rounded-md' type="text" name='Zip Code' placeholder='Zip Code' />
                                    </div>
                                </div>

                            </div>
                            <div className='flex rounded-md flex-col gap-5 w-full px-6 py-7 border-black border-[1px]'>
                                <div>
                                    <h1 className='text-[1.3rem] font-medium'>Contact Infomation</h1>
                                </div>

                                <div className="flex items-center mb-2 border-black border-[1px] px-5 py-2 rounded-md">
                                    <input
                                        type="radio"
                                        name="shipping"
                                        id="free-shipping"
                                        className="mr-2"
                                    />
                                    <label htmlFor="free-shipping" className="text-gray-500 text-[0.9rem]">Pay by Card Credit</label>
                                    <span className="ml-auto"><CiCreditCard1 className='text-[2rem]' /></span>
                                </div>
                                <div className="flex items-center mb-2 border-black border-[1px] px-5 py-2 rounded-md">
                                    <input
                                        type="radio"
                                        name="shipping"
                                        id="free-shipping"
                                        className="mr-2"
                                    />
                                    <label htmlFor="free-shipping" className="text-gray-500 text-[0.9rem]">PayPal</label>
                                    {/* <span className="ml-auto"><CiCreditCard1 className='text-[2rem]' /></span> */}
                                </div>

                                <hr className='bg-black h-[1px] w-full' />

                                <div className='flex flex-col gap-[0.45rem] w-full'>
                                    <label className='text-gray-500 font-semibold text-[0.9rem] px-1' htmlFor="Card Number">CARD NUMBER</label>
                                    <input className='w-full border-gray-400 border-[1px] px-2 py-1 rounded-md' type="text" name='Card Number' placeholder='1234 XXXX XXXX 1234' />
                                </div>
                                <div className='flex gap-4 w-full'>
                                    <div className='flex flex-col gap-[0.45rem] w-full'>
                                        <label className='text-gray-500 font-semibold text-[0.9rem] px-1' htmlFor="Expiration date">EXPIRATION DATE</label>
                                        <input className='w-full border-gray-400 border-[1px] px-2 py-1 rounded-md' type="text" name='Expiration date' placeholder='MM/YY' />
                                    </div>
                                    <div className='flex flex-col gap-[0.45rem] w-full'>
                                        <label className='text-gray-500 font-semibold text-[0.9rem] px-1' htmlFor="cvv">CVV</label>
                                        <input className='w-full border-gray-400 border-[1px] px-2 py-1 rounded-md' type="text" name='cvv' placeholder='CVC code' />
                                    </div>
                                </div>

                            </div>
                            <button onClick={() => { setPage("Order complete") }} className="bg-black w-full text-white px-4 py-2 rounded-md hover:bg-gray-800">
                                Place Order
                            </button>
                        </div>
                        <div className='w-full flex justify-center h-fit lg:w-1/2'>
                            <div className="border-black border-[1px] p-4 rounded-md w-[90%] lg:w-[70%]">
                                <h2 className="text-xl font-bold mb-6">Order summary</h2>
                                <div className='flex flex-col gap-6 w-full'>
                                    {cartItems.map((i, x) => {
                                        return (
                                            <div className='flex justify-between w-full py-3 border-b-2'>
                                                <div className='flex gap-3'>
                                                    <div className='w-16 h-20 object-contain'>
                                                        <img className='w-full h-full' src={i.image[0].url} alt="img" />
                                                    </div>
                                                    <div className='flex flex-col justify-between h-full py-[0.15rem]'>
                                                        <h1 className='font-medium'>{trimTextToWordCount(i.name, 2)}</h1>
                                                        <p className='text-[0.8rem] text-gray-400'>Color: Black</p>
                                                        <div className="hidden w-fit  md:flex items-center justify-center gap-2 border-[1px] border-black rounded-md h-fit overflow-hidden">
                                                            <button className=" px-2 py-[0.10rem] rounded-sm text-gray-500 hover:bg-gray-300" >
                                                                -
                                                            </button>
                                                            <span>{i.quantity}</span>
                                                            <button className=" px-2 py-[0.10rem] rounded-sm text-gray-500 hover:bg-gray-300">
                                                                +
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <div className='flex h-full items-center justify-between w-1/2'> */}
                                                <h1 className='font-semibold'>{`$${i.price}.00`}</h1>
                                                {/* </div> */}
                                            </div>
                                        )
                                    })}
                                </div>

                                <div className="flex mt-4 items-center justify-between mb-2 border-b pb-1">
                                    <p className="px-3">Shipping</p>
                                    <p>Free</p>

                                </div>
                                <div className="flex items-center justify-between mb-2 border-b pb-1">
                                    <p className="px-3">Subtotal</p>
                                    <p>${calculateSubtotal().toFixed(2)}</p>

                                </div>

                                <div className="flex items-center justify-between mb-4">
                                    <p className="font-bold text-[1.3rem]">Total</p>
                                    <p className='font-semibold'>${calculateTotal().toFixed(2)}</p>

                                </div>
                            </div>
                        </div>

                    </div>



                    :
                    <div className='flex flex-col gap-5 px-3 xl:px-[10rem] py-[5rem] md:w-[70%] shadow-2xl self-center mt-12'>
                        <div className='text-[1.2rem] text-gray-500'>
                            <h1 className='text-center'>Thank you! 🎉</h1>
                        </div>
                        <div className='text-[2rem] md:text-[3.2rem] font-medium text-center leading-[3.5rem]'>
                            <h1>Your order has been received</h1>
                        </div>
                        <div className='flex flex-col gap-6 mt-4 w-full px-[20%]'>
                            <div className='flex justify-between'>
                                <div className='font-semibold text-gray-500'>Order code:</div>
                                <div>#0123_45678</div>
                            </div>
                            <div className='flex justify-between'>
                                <div className='font-semibold text-gray-500'>Date:</div>
                                <div>October 19, 2023</div>
                            </div>
                            <div className='flex justify-between'>
                                <div className='font-semibold text-gray-500'>Total:</div>
                                <div>#0123_45678</div>
                            </div>
                            <div className='flex justify-between'>
                                <div className='font-semibold text-gray-500'>Payment method:</div>
                                <div>Credit Card</div>
                            </div>
                        </div>
                        <button onClick={() => { navigate("/") }} className="bg-black font-semibold w-fit self-center mt-4 text-white px-12 py-3 rounded-full hover:bg-gray-800">
                            Continue Shopping
                        </button>
                    </div>
            }

        </div>
    )
}

export default Orders