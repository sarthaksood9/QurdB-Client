import React, { useContext, useEffect, useState } from 'react'
import { HiMiniInbox } from "react-icons/hi2";
import { UserContext } from '../context/UserContext';
import { useSelector } from "react-redux";
import { initializeCart } from '../redux/setCart';
import axios from 'axios'
import toast from 'react-hot-toast';
import Filter from './Filter';
import ProductCard from './ProductCard';
import { BiFilterAlt } from "react-icons/bi";
import { MdOutlineFilterAltOff } from "react-icons/md";




const Home = () => {
    // Context and Redux hooks to get user and cart information

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
                    console.log(req.data);
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


    const [filterModel, setFilterModel] = useState(false);

    const HandleCloseFilter = () => {
        setFilterModel(false);
    }

    const[fil,setFil]=useState(true);

    const hendleFilterReset = async () => {
        setLoading(true);
        await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/admin/products`)
            .then((req, res) => {
                setProducts(req.data.products);
                setFil(true);
                initializeCart(user.user._id);
                setLoading(false);
            })
            .catch((e) => {
                console.log(e);
                setLoading(false);
                toast.error('Server Error..');
            });
    };
    

 

    return (
        <>
            <div  className=' flex relative overflow-hidden pt-[8vh]'>
                <div className='flex flex-col px-2 md:px-5 py-10 gap-8 min-w-full'>
                    <div className=' w-full flex justify-center'>
                        <div className='flex w-[80%] md:w-[50%]'>
                            <input className='px-5 py-2 w-full border-[1px] rounded-l-full' placeholder='Search...' type="text" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                            <button className='bg-[#18181B] px-5 py-2 rounded-r-full text-white font-[500]' onClick={() => { hendleSearch() }}>Search</button>
                        </div>
                    </div>
                    <div className='flex gap-10 pt-10 justify-center px-5'>
                        <div className='w-[20%] bg-white relative hidden border-[1px] p-2 xl:flex flex-col gap-5 rounded-sm h-fit'>
                            <Filter mod={HandleCloseFilter} fil={fil} setFil={setFil} loading={loading} setLoading={setLoading} setProducts={setProducts} />
                        </div>

                        <div className="w-full  p-3 rounded-md grid relative sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
                            <h1 className='text-[2.4rem] font-bold absolute top-[-60px]'>Products</h1>
                            {fil ?<h1 onClick={()=>{setFilterModel(true)}} className='text-[1.4rem] font-bold absolute top-[-40px] right-0 text-[#625757] xl:hidden'><BiFilterAlt/> </h1>:<h1 onClick={()=>{hendleFilterReset()}} className='text-[1.4rem] font-bold absolute top-[-40px] right-0 text-[#625757] xl:hidden'><MdOutlineFilterAltOff/> </h1>}
                            {loading ? <div className='w-full flex justify-center items-center absolute h-full'><div className="animate-spin rounded-full border-4 border-[#736f6f] border-primary border-t-transparent h-8 w-8" />
                                <span className="text-[#625757] font-semibold ml-3">Loading...</span></div> : <>{products.length !== 0 ? products.map((i, x) => {

                                    return (
                                        <ProductCard i={i} setLoading={setLoading} />
                                    )
                                }) :
                                    <div className='flex justify-center items-center w-full absolute top-[40%] gap-5'>
                                        <span>No Product Found...!</span>
                                        <HiMiniInbox className='text-[4rem] text-gray-600' />
                                    </div>}</>}
                        </div>
                    </div>
                </div>

            </div>
            {filterModel &&
                <>
                    <div
                        className="h-full w-full flex justify-center items-center fixed top-0 left-0 z-30"
                        onClick={() => {
                            HandleCloseFilter();
                        }}
                        style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
                    >
                        <div className='w-[80%] md:w-[30%] bg-white relative  border-[1px] p-2 flex flex-col gap-5 rounded-sm h-fit'>

                            <Filter mod={HandleCloseFilter} fil={fil} setFil={setFil} loading={loading} setLoading={setLoading} setProducts={setProducts} />
                        </div>
                        <style>
                            {`body{ overflow:hidden; }`}
                        </style>
                    </div>
                </>
            }
        </>
    )
}

export default Home