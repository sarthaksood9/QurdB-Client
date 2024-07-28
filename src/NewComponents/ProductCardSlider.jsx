import React, { useContext, useEffect, useState } from 'react';
import NewProductCard from './NewProductCard';
import { IoMdArrowForward } from "react-icons/io";
import { UserContext } from '../context/UserContext';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { initializeCart } from '../redux/setCart';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';

const ProductCardSlider = ({ title }) => {
  // Context and Redux hooks to get user and cart information

  const user = useContext(UserContext);
  const cartItems = useSelector(state => state.cart.cart);

  // State hooks for loading, products, and search input

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);


  // Fetch products when the component mounts


  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)

      await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/admin/products`)
        .then((req, res) => {
          setProducts(req.data.products);
          initializeCart(user.user._id);
          setLoading(false)
        })
        .catch((e) => {
          setLoading(false)
          console.log(e);
          toast.error('Server Error..')
        })
    };
    fetchProducts();
  }, [])

  const navigate = useNavigate();

  return (
    <div className="container mx-auto py-8 overflow-scroll px-5 md:px-5">
      <div className='flex pb-2 justify-between items-center'> <h2 className="text-2xl font-medium mb-4">{title}</h2> <div onClick={() => { navigate("/shop") }} className='border-b-[1px] border-black cursor-pointer'><h1 className='flex gap-2 items-center'>More Products <IoMdArrowForward className='pt-[0.15rem] text-[1.1rem]' />
      </h1></div></div>
      {loading ? <Loading /> : <div className="flex gap-5 overflow-x-scroll overflow-y-hidden scroll-container">
        {products.map((i) => (
          <div className='pb-10 min-w-fit'>
            <NewProductCard
              key={i.id}
              i={i}
              setLoading={setLoading}
              ap={400}
            />
          </div>
        ))}
      </div>}

    </div>
  );
};

export default ProductCardSlider;