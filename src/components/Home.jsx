import React, { useContext, useEffect, useState } from 'react'
import { HiMiniInbox } from "react-icons/hi2";
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { initializeCart } from '../redux/setCart';
import { addToCart, setCart } from '../redux/cartSlice';
import axios from 'axios'
import toast from 'react-hot-toast';


const Home = () => {

    const dispatch = useDispatch();
    const user = useContext(UserContext);



    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);


    //  Search and filter useStates:
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState(false);
    const [upperLimit, setUpperLimit] = useState(3000);
    const [lowerLimit, setLowerLimit] = useState(500);





    function trimTextToWordCount(text, wordCount) {
        const words = text.split(' ');
        if (words.length > wordCount) {
            return words.slice(0, wordCount).join(' ') + '...';
        }
        return text;
    }

    const [selectedCategories, setSelectedCategories] = useState([]);

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        if (checked) {
            setSelectedCategories((prev) => [...prev, name]);
        } else {
            setSelectedCategories((prev) => prev.filter((category) => category !== name));
        }
    };






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

    const hendleFilter = () => {
        const fetchScProducts = async () => {
            setLoading(false)
            const promises = selectedCategories.map((category) => {
                return axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/admin/products`, {
                    params: {
                        'price[gte]': lowerLimit,
                        'price[lte]': upperLimit,
                        category: category.trim()
                    }
                });
            });

            Promise.all(promises)
                .then((responses) => {
                    const allProducts = responses.flatMap(response => response.data.products);
                    setProducts(allProducts); // Assuming setProducts expects an array of products
                    initializeCart(user.user._id);
                    setLoading(false)

                })
                .catch((error) => {
                    setLoading(false)
                    console.error('Error fetching products by category:', error);
                    toast.error('Server Error..')
                });
        }
        fetchScProducts();
    }



    const cartItems = useSelector(state => state.cart.cart);





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
    }, [cartItems])



    const hendleAddToCart = async (pro) => {

        // const adtocart = (pro) => {
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





    const navigate = useNavigate();

    const hendleFilterReset = async () => {
        setLoading(true)
        await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/admin/products`)
            .then((req, res) => {
                setProducts(req.data.products);
                initializeCart(user.user._id);
                setLoading(false)
            })
            .catch((e) => {
                console.log(e);
                setLoading(false);
                toast.error('Server Error..')
            })
    }








    return (
        <div className=' flex relative overflow-hidden pt-[8vh]'>
            <div className='flex flex-col px-5 py-10 gap-8 min-w-full'>
                <div className=' w-full flex justify-center'>
                    <div className='flex w-[80%] md:w-[50%]'>
                        <input className='px-5 py-2 w-full border-[1px] rounded-l-full' placeholder='Search...' type="text" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                        <button className='bg-[#18181B] px-5 py-2 rounded-r-full text-white font-[500]' onClick={() => { hendleSearch() }}>Search</button>
                    </div>
                </div>
                <div className='flex gap-10 pt-10 justify-center px-5'>
                    <div className='w-[20%] relative hidden border-[1px] p-2 xl:flex flex-col gap-5 rounded-sm h-fit'>
                        <h1 className='text-[2rem] font-semibold absolute top-[-50px]'>Filters</h1>
                        <div className='flex flex-col gap-3'>
                            <div className='flex flex-col gap-3'>
                                <h1 className='font-semibold text-[1.3rem]'>Category</h1>
                                <div className='flex flex-col px-3'>
                                    <div className='flex items-center gap-4'>
                                        <input
                                            type='checkbox'
                                            name='Laptop'
                                            onChange={handleCheckboxChange}
                                        />
                                        <label>Laptops</label>
                                    </div>
                                    <div className='flex items-center gap-4'>
                                        <input
                                            type='checkbox'
                                            name='Moblie'
                                            onChange={handleCheckboxChange}
                                        />
                                        <label>Mobile</label>
                                    </div>
                                    <div className='flex items-center gap-4'>
                                        <input
                                            type='checkbox'
                                            name='accessories'
                                            onChange={handleCheckboxChange}
                                        />
                                        <label>Accessories</label>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className='flex flex-col gap-3'>
                            <h1 className='font-semibold text-[1.3rem]'>Price</h1>
                            <div className='flex flex-col px-3 gap-4'>
                                <div className='flex flex-col items-start gap-1'>
                                    <div>
                                        <label>From: </label>
                                        <span>{`$ ${lowerLimit}`}</span>
                                    </div>
                                    <input className='w-full' min="0" max="1000" type='range' value={lowerLimit} onChange={(e) => { setLowerLimit(e.target.value) }} />
                                </div>
                                <div className='flex flex-col items-start gap-1'>
                                    <div onc>
                                        <label>To:-</label>
                                        <span>{`$ ${upperLimit}`}</span>
                                    </div>
                                    <input className='w-full' min="1000" max="10000" type='range' value={upperLimit} onChange={(e) => { setUpperLimit(e.target.value) }} />
                                </div>

                            </div>
                        </div>
                        {filter === true ? (<button
                            onClick={() => { hendleFilterReset(); toast.success("Filter Applied"); setFilter(!filter) }}
                            className="bg-[#18181B] mt-5 w-full px-2 py-2 rounded-md text-white font-semibold hover:bg-primary/90"
                        >
                            Reset Filter
                        </button>) :
                            (<button
                                onClick={() => { hendleFilter(); toast.success("Filter Reset"); setFilter(!filter) }}
                                className="bg-[#18181B] mt-5 w-full px-2 py-2 rounded-md text-white font-semibold hover:bg-primary/90"
                            >
                                Apply
                            </button>)}
                    </div>
                    <div className="w-full  p-3 rounded-md grid relative sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
                        <h1 className='text-[2.4rem] font-bold absolute top-[-60px]'>Products</h1>
                        {loading ? <div className='w-full flex justify-center items-center absolute h-full'><div className="animate-spin rounded-full border-4 border-[#736f6f] border-primary border-t-transparent h-8 w-8" />
                            <span className="text-[#625757] font-semibold ml-3">Loading...</span></div> : <>{products.length !== 0 ? products.map((i, x) => {

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
                            }) :
                                <div className='flex justify-center items-center w-full absolute top-[40%] gap-5'>
                                    <span>No Product Found...!</span>
                                    <HiMiniInbox className='text-[4rem] text-gray-600' />
                                </div>}</>}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Home