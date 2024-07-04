import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addToCart } from '../redux/cartSlice';

const Product = () => {

    const { productId } = useParams();

    const [product,setProduct]=useState()

    const dispatch = useDispatch();


    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/admin/productDetail/${productId}`)
          .then((req, res) => {
            setProduct(req.data.product);
          })
          .catch((e) => {
            console.log(e)
          })
    
    
      }, [])
      const hendleAddToCart = (pro) => {
        console.log(pro);
        dispatch(addToCart(pro));
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
                    onClick={()=>{hendleAddToCart(product)}}
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