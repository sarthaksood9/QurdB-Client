import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addToCart } from '../redux/cartSlice';
import toast from 'react-hot-toast';
import { UserContext } from '../context/UserContext';
import { initializeCart } from '../redux/setCart';

const Product = () => {
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


    }, [])

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
        <div className='flex w-full justify-center items-center md:h-[100vh]'>
            <div className="grid md:grid-cols-2 gap-28 max-w-6xl py-12 px-4 w-full ">
                <div className="grid gap-4">
                    <img
                        src={product?.image[0]?.url}
                        alt="Product Image"
                        width={900}
                        height={900}
                        className="rounded-lg overflow-hidden w-full aspect-square object-contain"
                    />
                </div>
                <div className="grid gap-6">
                    <div>
                        <h1 className="text-3xl font-bold">{product?.name}</h1>
                        <p className="text-muted-foreground mt-2">
                            {product?.discription}
                        </p>
                    </div>
                    <div className="text-4xl font-bold">{`$${product?.price}.00`}</div>
                    <div>
                        <button
                            onClick={() => { hendleAddToCart(product) }}
                            className="bg-[#18181B]  w-full bottom-6 px-2 py-4 rounded-full text-white font-semibold hover:bg-primary/90"
                        >
                            Add To Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product