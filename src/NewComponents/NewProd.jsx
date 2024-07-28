import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import PageExtender from './PageExtender'
import { IoIosArrowDown } from "react-icons/io";
import ProductCardSlider from './ProductCardSlider';
import { FiHeart } from "react-icons/fi";
import Footer from './Footer';
import Upperfooter from './Upperfooter';
import { UserContext } from '../context/UserContext';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { initializeCart } from '../redux/setCart';
import { addToCart } from '../redux/cartSlice';
import ViewCart from './ViewCart';



const NewProd = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    // Access user context
    const user = useContext(UserContext);

    // Get productId from the URL parameters
    const { productId } = useParams();

    // States to hold product details and to handle loading indicator
    const [product, setProduct] = useState()
    const [loading, setLoading] = useState(false);

    // Hook to dispatch actions to Redux store
    const dispatch = useDispatch();


    // Fetch product details on component mount
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/admin/productDetail/${productId}`)
            .then((req, res) => {
                setProduct(req.data.product);
                initializeCart(user.user._id);

            })
            .catch((e) => {
                console.log(e)
            })


    }, [productId])

    // Handle adding product to cart
    const hendleAddToCart = (pro) => {
        setLoading(true);
        axios.post(`${process.env.REACT_APP_BASE_URL}/add`, { userId: user.user._id, productId: pro._id, quantity: pro.quantity })
            .then((req, res) => {

                dispatch(addToCart(pro));
                setLoading(false);
                toast.success("Added To Cart")
            })
            .catch((e) => {
                console.log(e);
                setLoading(false);
            })
    }
    return (
        <div className=' w-full '>
            <div className='flex flex-col lg:flex-row justify-center py-20'>
                <div className='flex justify-center lg:w-fit h-fit'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-3 w-fit px-5 lg:px-10'>
                        <div className='h-[20rem] w-[13.5rem]'>
                            <img className='h-full w-full object-fit' src={product?.image[0]?.url} />
                        </div>
                        <div className='h-[20rem] w-[13.5rem]'>
                            <img className='h-full w-full object-fit' src={product?.image[0]?.url} />
                        </div>
                        <div className='h-[20rem] w-[13.5rem]'>
                            <img className='h-full w-full object-fit' src={product?.image[0]?.url} />
                        </div>
                        <div className='h-[20rem] w-[13.5rem]'>
                            <img className='h-full w-full object-fit' src={product?.image[0]?.url} />
                        </div>
                        <div className='h-[20rem] w-[13.5rem]'>
                            <img className='h-full w-full object-fit' src={product?.image[0]?.url} />
                        </div>
                        <div className='h-[20rem] w-[13.5rem]'>
                            <img className='h-full w-full object-fit' src={product?.image[0]?.url} />
                        </div>
                    </div>
                </div>

                <div className='lg:w-[50%] flex flex-col  items-center'>
                    <div className='flex flex-col w-[70%] gap-3 border-b-2 h-fit pb-3'>
                        <h1 className='text-[3rem] font-semibold'>{product?.name}</h1>
                        <p className='text-gray-600'>{product?.discription}</p>
                        <div className='flex items-center gap-3'>
                            <div className='text-[1.8rem]'>{`$${product?.price}`}</div>
                            <div className='mt-[0.19rem] text-decoration-line: line-through text-[1.3rem] text-clip text-gray-500'>$400.00</div>
                        </div>
                    </div>
                    <div className='flex w-[70%] gap-4 p-3 flex-col justify-start items-start '>
                        <div className='flex flex-col gap-2 items-start text-start'>
                            <h1 className=' font-semibold text-gray-700 text-[1.2rem]'>Measurements</h1>
                            <h1>
                                "17 1/2x20 5/8 "
                            </h1>
                        </div>
                        <div className='flex gap-2 flex-col items-start text-start'>
                            <div className='flex gap-2 items-center justify-center '><h1 className=' font-semibold text-gray-700 text-[1.2rem]'>Choose Color </h1> <IoIosArrowDown className='-rotate-90 mt-[0.17rem]' /></div>
                            <h1>
                                Black
                            </h1>
                            <div className=' mt-1 flex gap-4'>
                                <div className='h-[2rem] w-[2rem] bg-black rounded-full'></div>
                                <div className='h-[2rem] w-[2rem] bg-black rounded-full'></div>
                                <div className='h-[2rem] w-[2rem] bg-black rounded-full'></div>
                            </div>
                        </div>
                        <div className='flex w-full gap-2 flex-col items-start text-start'>
                            <div className='w-full flex flex-col gap-3'>
                                <div className='flex gap-4 justify-between w-full'>
                                    <div className='flex gap-3 bg-[#F5F5F5] px-[1.5rem] py-3 text-[1.3rem] rounded-lg'>
                                        <button className='px-1' onClick={() => { toast.error("Feature Comeing Soon..") }}>-</button>
                                        <div>{1}</div>
                                        <button onClick={() => { toast.error("Feature Coming Soon...") }} className='px-1'>+</button>
                                    </div>
                                    <button
                                        onClick={() => { toast.error("Feature Coming Soon...") }}
                                        className="bg-white flex justify-center items-center gap-2 border-black border-[1px] text-black  w-full bottom-6 px-2 py-4 rounded-lg  font-semibold hover:bg-primary/90"
                                    >
                                         <span><FiHeart className='text-[1.2rem] font-semibold'/></span> Wishlist
                                    </button>
                                </div>
                                <div>
                                    <button
                                        onClick={() => { toast.success("Added to Cart");hendleAddToCart(product) }}
                                        className="bg-[#18181B]  w-full bottom-6 px-2 py-4 rounded-lg text-white font-semibold hover:bg-primary/90"
                                    >
                                        Check Out
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className='flex w-[70%] gap-4 p-3 flex-col justify-start items-start '>

                        <PageExtender title="Additional Info" content="Details" info="You can use the removable tray for serving. The design makes it easy to put the tray
                            back after use since you place it directly on the table frame without having to fit it into
                            any holes." content2="Packaging" info2='Width: 20" Height: 1 1/2" Length: 21 1/2"
                            Weight: 7 lb 8 oz
                            Package(s): 1'>
                        </PageExtender>
                        <PageExtender title="Questions" />
                        <PageExtender title="Reviews (0)" />


                    </div>
                </div>
            </div>

            <ProductCardSlider title={"You might also like"} />
            
        </div>
    )
}

export default NewProd