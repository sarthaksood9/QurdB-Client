import React, { useContext, useEffect, useRef, useState } from 'react'
import mimg from "../Assits/shopimg.png"
import { useSelector } from 'react-redux';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import { initializeCart } from '../redux/setCart';
import toast from 'react-hot-toast';
import NewProductCard from './NewProductCard';
import { HiMiniInbox } from 'react-icons/hi2';
import Loading from '../components/Loading';
import { FiFilter } from "react-icons/fi";
import { MdOutlineFilterAltOff } from "react-icons/md";



const Shop = ({ serch, setSerch }) => {
    const user = useContext(UserContext);
    const cartItems = useSelector(state => state.cart.cart);

    // State hooks for loading, products, and search input

    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");


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


    // Handle search functionality

    const hendleSearch = () => {
        const fetchScProducts = async () => {
            setLoading(true)
            let ss = search;
            await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/admin/products?keyword=${ss.trim()}`)
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
        fetchScProducts();
    }

    // Update cart items when cartItems state changes


    useEffect(() => {
        const updateCart = async (userId) => {

            const productIds = cartItems.map(cartItems => cartItems._id);
            axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/user/addtocart`, { userId, productIds })
                .then((req, res) => {
                    // console.log(req.data);
                })
                .catch((e) => {
                    console.log(e);
                })


        };
        if (cartItems.length !== 0) {
            updateCart(user.user._id);
        }
    }, [cartItems]);


    // Responsive Filter :-




    const [fil, setFil] = useState(false);

    const hendleFilterReset = async () => {
        setLoading(true);
        await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/admin/products`)
            .then((req, res) => {
                setProducts(req.data.products);
                setFil(false);
                initializeCart(user.user._id);
                setLoading(false);
            })
            .catch((e) => {
                console.log(e);
                setLoading(false);
                toast.error('Server Error..');
            });
    };


    const [selectedCategories, setSelectedCategories] = useState('all');
    const [lowerLimit, setlowerLimit] = useState(0);
    const [upperLimit, setUpperLimit] = useState(100000);

    // Handle checkbox change for category selection
    const handleCheckboxChange = (event) => {
        const name = event.target.value;
        setSelectedCategories(name);
    };

    const hendlePriceVal = (e) => {
        let val = e.target.value;
        if (val === "all") {
            setlowerLimit(0);
            setUpperLimit(100000);
        }
        else {
            let parts = val.split("-");
            setlowerLimit(parts[0]);
            setUpperLimit(parts[1]);
        }
    }



    useEffect(() => {
        const fetchScProducts = async () => {
            setLoading(true);
            if (selectedCategories !== "all") {
                axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/admin/products`, {
                    params: {
                        'price[gte]': lowerLimit,
                        'price[lte]': upperLimit,
                        category: selectedCategories
                    }
                }).then(response => {
                    setProducts(response.data.products);
                    initializeCart(user.user._id);
                    setLoading(false);
                    setFil(true);
                }).catch((error) => {
                    setLoading(false);
                    console.error('Error fetching products:', error);
                    toast.error('Server Error..');
                });
                return;
            }
            axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/admin/products`, {
                params: {
                    'price[gte]': lowerLimit,
                    'price[lte]': upperLimit,
                }
            }).then(response => {
                setProducts(response.data.products);
                initializeCart(user.user._id);
                setLoading(false);
                setFil(true);
            }).catch((error) => {
                setLoading(false);
                console.error('Error fetching products:', error);
                toast.error('Server Error..');
            });
            return;
            // }
        };
        fetchScProducts();
    }, [selectedCategories, lowerLimit, upperLimit])




    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className='flex relative flex-col gap-6 pt-[10rem] px-[2rem] lg:px-[10rem]'>
            <div className={`${serch === true ? "flex" : "hidden"} fixed z-50 focus top-24 left-0 w-full justify-center`}>
                <div className='flex w-[80%] md:w-[50%]'>
                    <input className='px-5 py-2 w-full border-[1px] rounded-l-full' placeholder='Search...' type="text" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                    <button className='bg-[#18181B] px-5 py-2 rounded-r-full text-white font-[500]' onClick={() => { hendleSearch() }}>Search</button>
                </div>
            </div>
            <div className='w-full'>
                <img src={mimg} alt="img" />
            </div>
            <div class="flex md:w-full md:flex-row flex-col gap-5 items-center relative">
                <div class="flex w-full md:w-fit flex-col gap-2">
                    <div class="text-gray-600 font-medium">CATEGORIES</div>
                    <div class="relative w-full md:w-48">
                        <select onChange={handleCheckboxChange} class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none">
                            <option value="all">All Products</option>
                            <option value="Laptop">Bedroom</option>
                            <option value="Moblie">Kitchen</option>
                        </select>
                    </div>
                </div>
                <div class="flex flex-col w-full md:w-fit gap-2">
                    <div class="text-gray-600 font-medium">PRICE</div>
                    <div class="relative w-full md:w-48 ">
                        <select onChange={hendlePriceVal} class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none">
                            <option value="0-10000">All Prices</option>
                            <option value="0-50">$0-$50</option>
                            <option value="50-1000">$50-$1000</option>
                        </select>
                        {/* <div class="absolute right-2 top-1/2 -translate-y-1/2">
                            <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div> */}
                    </div>
                </div>
                {/* {!fil?<FiFilter className='absolute right-5 text-[1.3rem] text-gray-500 bottom-4' /> :<MdOutlineFilterAltOff className='absolute right-5 text-[1.3rem] text-gray-500 bottom-4' /> } */}
            </div>

            <div className='flex flex-wrap justify-center md:justify-between gap-5 pb-10'>
                {loading ?
                    <div className="text-[#625757] h-[30vh] w-full flex items-center justify-center font-semibold ml-3"><Loading /></div> : <>{products.length !== 0 ? products.map((i, x) => {

                        return (
                            <NewProductCard i={i} setLoading={setLoading} />
                        )
                    }) :
                        <div className='flex h-[40vh] justify-center items-center w-full top-[40%] gap-5'>
                            <span>No Product Found...!</span>
                            <HiMiniInbox className='text-[4rem] text-gray-600' />
                        </div>}</>}
            </div>

        </div>
    )
}

export default Shop