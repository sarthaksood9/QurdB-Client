import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import { initializeCart } from '../redux/setCart';
import { RxCross2 } from "react-icons/rx";

const Filter = ({ loading, setLoading, setProducts,mod,setFil }) => {
    const navigate = useNavigate();

    // Get user context
    const user = useContext(UserContext);

    //  Search and filter useStates:
    const [filter, setFilter] = useState(false);
    const [upperLimit, setUpperLimit] = useState(3000);
    const [lowerLimit, setLowerLimit] = useState(500);

    // Selected categories
    const [selectedCategories, setSelectedCategories] = useState([]);

    // Handle checkbox change for category selection
    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        if (checked) {
            setSelectedCategories((prev) => [...prev, name]);
        } else {
            setSelectedCategories((prev) => prev.filter((category) => category !== name));
        }
    };

    // Handle filter application
    const hendleFilter = () => {
        const fetchScProducts = async () => {
            setLoading(true);

            // If no categories are selected, fetch products by price range only
            if (selectedCategories.length === 0) {
                axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/admin/products`, {
                    params: {
                        'price[gte]': lowerLimit,
                        'price[lte]': upperLimit,
                    }
                }).then(response => {
                    setProducts(response.data.products);
                    initializeCart(user.user._id);
                    setLoading(false);
                }).catch((error) => {
                    setLoading(false);
                    console.error('Error fetching products:', error);
                    toast.error('Server Error..');
                });
                return;
            }

            // If categories are selected, fetch products by category and price range
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
                    setLoading(false);
                })
                .catch((error) => {
                    setLoading(false);
                    console.error('Error fetching products by category:', error);
                    toast.error('Server Error..');
                });
        };
        fetchScProducts();
    };

    // Handle filter reset
    const hendleFilterReset = async () => {
        setLoading(true);
        await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/admin/products`)
            .then((req, res) => {
                setProducts(req.data.products);
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
        <div onClick={(e) => e.stopPropagation()}>
            <h1 className='text-[2rem] font-semibold absolute hidden xl:block top-[-50px]'>Filters</h1>
            <div className='absolute right-3 mt-1 cursor-pointer xl:hidden' onClick={()=>{mod()}}><RxCross2/></div>
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
                        <div>
                            <label>To: </label>
                            <span>{`$ ${upperLimit}`}</span>
                        </div>
                        <input className='w-full' min="1000" max="10000" type='range' value={upperLimit} onChange={(e) => { setUpperLimit(e.target.value) }} />
                    </div>
                </div>
            </div>
            {filter === true ? (
                <button
                    onClick={() => { hendleFilterReset(); toast.success("Filter Reset"); setFilter(!filter);mod() }}
                    className="bg-[#18181B] mt-5 w-full px-2 py-2 rounded-md text-white font-semibold hover:bg-primary/90"
                >
                    Reset Filter
                </button>
            ) : (
                <button
                    onClick={() => { hendleFilter(); setFil(false); toast.success("Filter Applied"); setFilter(!filter);mod() }}
                    className="bg-[#18181B] mt-5 w-full px-2 py-2 rounded-md text-white font-semibold hover:bg-primary/90"
                >
                    Apply
                </button>
            )}
        </div>
    )
}

export default Filter;
