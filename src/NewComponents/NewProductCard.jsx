import React, { useContext } from 'react'
import { IoIosStar } from "react-icons/io";
import sofa from "../Assits/sofa.png"
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import { addToCart } from '../redux/cartSlice';


const NewProductCard = ({i, setLoading }) => {

    const navigate = useNavigate(); // Hook for navigation

    const dispatch = useDispatch(); // Hook for dispatching actions

    const user = useContext(UserContext); // Get user context

    const st = () => {
        window.scrollTo({
          top: 0,
        //   behavior: 'smooth',
        });
      };

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
        <div onClick={() => { navigate(`/prod/${i._id}`);st(); }}className='showhim  relative shadow-sm min-h-fit min-w-fit flex flex-col gap-2 rounded-sm'>
            <div className=''>
                <img src={i.image[0]?.url} alt="img" className='h-[16rem]  w-[13.4rem] pgp object-contain ' />
            </div>
            <div className='absolute z-10 bottom-0 showme w-full ' onClick={(e) => e.stopPropagation()}>
                <button
                    onClick={() => { hendleAddToCart(i) }}
                    className="bg-[#18181B]  w-full bottom-6 px-2 py-4 rounded-md text-white font-semibold hover:bg-primary/90"
                >
                    Add to cart
                </button>
            </div>
            <div className='flex  flex-col gap-1' >
                <div className='flex gap-1'>
                    <IoIosStar />
                    <IoIosStar />
                    <IoIosStar />
                    <IoIosStar />
                    <IoIosStar />
                </div>
                <h1>{`${trimTextToWordCount(i.name ,3)}`}</h1>
                <div className='flex items-center gap-3'>
                    <div className='text-[1rem]'>{`$${i.price}`}</div>
                    <div className='mt-[0.19rem] text-decoration-line: line-through text-clip text-gray-500'>$400.00</div>
                </div>
            </div>
        </div>
    )
}

export default NewProductCard