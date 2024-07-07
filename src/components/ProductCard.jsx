import axios from 'axios';
import React, { useContext } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { addToCart } from '../redux/cartSlice';
import toast from 'react-hot-toast';

const ProductCard = ({ i, setLoading }) => {
    const navigate = useNavigate(); // Hook for navigation

    const dispatch = useDispatch(); // Hook for dispatching actions

    const user = useContext(UserContext); // Get user context

    // Function to trim text to a specified word count
    function trimTextToWordCount(text, wordCount) {
        const words = text.split(' ');
        if (words.length > wordCount) {
            return words.slice(0, wordCount).join(' ') + '...';
        }
        return text;
    }


    // Handleing adding a product to the cart

    const hendleAddToCart = async (pro) => {

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
        <div onClick={() => { navigate(`/product/${i._id}`) }} className="group relative border border-muted rounded-lg overflow-hidden  xl:w-fit hover:scale-105 transition-all duration-500">
            <div href="#" prefetch={false}>
                <img
                    src={i.image[0].url}
                    alt='ji'

                    width={300}
                    height={300}
                    className="w-full h-[300px] p-3 object-fit group-hover:opacity-80 transition-opacity"
                />
            </div>
            <div className="p-4">
                <h3 className="font-medium text-lg">{i.name}</h3>
                <p className="text-muted-foreground text-sm">
                    {trimTextToWordCount(i.discription, 8)}</p>
                <div className="mt-2 flex items-center justify-between " onClick={(e) => e.stopPropagation()}>
                    <span className="font-medium text-primary">{`$ ${i.price}`}</span>
                    <button
                        size="sm"
                        variant="outline"
                        onClick={() => hendleAddToCart(i)}
                        className="bg-[#18181B] px-2 py-2 rounded-md text-white font-semibold hover:bg-primary/90"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard