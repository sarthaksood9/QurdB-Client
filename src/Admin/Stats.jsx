import React, { useContext, useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { IoTrendingUpSharp } from "react-icons/io5";
import { IoTrendingDownSharp } from "react-icons/io5";


import im1 from "../Assits/Icon (3).png"
import im2 from "../Assits/Icon.png"
import im3 from "../Assits/Icon (1).png"
import im4 from "../Assits/Icon (2).png"
import axios from 'axios';
import { initializeCart } from '../redux/setCart';
import toast from 'react-hot-toast';
import { UserContext } from '../context/UserContext';


const data2 = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];

const Stats = () => {
    // Context and Redux hooks to get user information

    const user = useContext(UserContext);

    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);


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


    function trimTextToWordCount(text, wordCount) {
        const words = text.split(' ');
        if (words.length > wordCount) {
            return words.slice(0, wordCount).join(' ') + '...';
        }
        return text;
    }


    return (
        <>
            <div className='w-full'>
                <div className='w-full flex justify-between'>
                    <div className='flex-col flex gap-5 p-4 w-fit h-fit shadow-xl rounded-2xl'>
                        <div className='flex gap-24'>
                            <div className='flex gap-4 flex-col'>
                                <h3 className='text-gray-500 text-[0.98rem] font-medium'>Total User</h3>
                                <h1 className='text-[1.4rem] font-medium'>40,689</h1>
                            </div>
                            <img className='h-[3rem] w-[3rem]' src={im1} alt="img" />
                        </div>
                        <div>
                            <h4 className='flex text-[0.8rem] gap-1 text-gray-500 items-center  font-medium'> <span className='flex text-[#05B69B] gap-1 items-center'>< IoTrendingUpSharp className='text-[1.48rem]' />  8.5% </span> Up from yesterday</h4>
                        </div>
                    </div>
                    <div className='flex-col flex gap-5 p-4 w-fit h-fit shadow-xl rounded-2xl'>
                        <div className='flex gap-24'>
                            <div className='flex gap-4 flex-col'>
                                <h3 className='text-gray-500 text-[0.98rem] font-medium'>Total Order</h3>
                                <h1 className='text-[1.4rem] font-medium'>10293</h1>
                            </div>
                            <img className='h-[3rem] w-[3rem]' src={im2} alt="img" />
                        </div>
                        <div>
                            <h4 className='flex text-[0.8rem] gap-1 text-gray-500 items-center  font-medium'> <span className='flex text-[#05B69B] gap-1 items-center'>< IoTrendingUpSharp className='text-[1.48rem]' />  1.3% </span> Up from yesterday</h4>
                        </div>
                    </div>
                    <div className='flex-col flex gap-5 p-4 w-fit h-fit shadow-xl rounded-2xl'>
                        <div className='flex gap-24'>
                            <div className='flex gap-4 flex-col'>
                                <h3 className='text-gray-500 text-[0.98rem] font-medium'>Total Sales</h3>
                                <h1 className='text-[1.4rem] font-medium'>$89,000</h1>
                            </div>
                            <img className='h-[3rem] w-[3rem]' src={im3} alt="img" />
                        </div>
                        <div>
                            <h4 className='flex text-[0.8rem] gap-1 text-gray-500 items-center  font-medium'> <span className='flex text-[#F93C65] gap-1 items-center'>< IoTrendingDownSharp className='text-[1.48rem]' />  4.3% </span> Up from yesterday</h4>
                        </div>
                    </div>
                    <div className='flex-col flex gap-5 p-4 w-fit h-fit shadow-xl rounded-2xl'>
                        <div className='flex gap-24'>
                            <div className='flex gap-4 flex-col'>
                                <h3 className='text-gray-500 text-[0.98rem] font-medium'>Total Pending</h3>
                                <h1 className='text-[1.4rem] font-medium'>2040</h1>
                            </div>
                            <img className='h-[3rem] w-[3rem]' src={im4} alt="img" />
                        </div>
                        <div>
                            <h4 className='flex text-[0.8rem] gap-1 text-gray-500 items-center  font-medium'> <span className='flex text-[#05B69B] gap-1 items-center'>< IoTrendingUpSharp className='text-[1.48rem]' />  1.8% </span> Up from yesterday</h4>
                        </div>
                    </div>
                </div>
                <div className=' h-[50vh] px-10 py-8 w-full shadow-xl rounded-xl'>
                    <div className='flex justify-between w-full mb-[3rem]'>
                        <h1 className='font-medium text-[2.1rem]'>Sales Details</h1>

                        <div class="relative w-[7rem] ">
                            <select class="w-full px-2 py-1 border text-gray-300 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none">
                                <option value="0-10000">October</option>
                                <option value="0-50">$0-$50</option>
                                <option value="50-1000">$50-$1000</option>
                            </select>
                            {/* <div class="absolute right-2 top-1/2 -translate-y-1/2">
                            <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div> */}
                        </div>

                    </div>
                    <ResponsiveContainer width="100%" height="80%">
                        <LineChart width={300} height={100} data={data2}>
                            <Line type="amt" dataKey="pv" stroke="#8884d8" strokeWidth={2} />
                            <XAxis />
                            <YAxis />
                        </LineChart>
                    </ResponsiveContainer>

                </div>


                <div className=' px-10 py-8 w-full shadow-xl rounded-xl'>
                    <div className='flex justify-between w-full mb-[2rem]'>
                        <h1 className='font-medium text-[2.1rem]'>Sales Details</h1>

                        <div class="relative w-[7rem] ">
                            <select class="w-full px-2 py-1 border text-gray-300 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none">
                                <option value="0-10000">October</option>
                                <option value="0-50">$0-$50</option>
                                <option value="50-1000">$50-$1000</option>
                            </select>
                        </div>

                    </div>
                    <div className='flex flex-col w-full gap-2'>
                        <div className='flex w-full justify-between px-8  rounded-xl py-2 bg-[#c8cdd4] font-medium'>
                            <div className='flex w-[100%] justify-between'>
                                <div>Product Name</div>
                                <div>Location</div>
                                <div>Date-time</div>
                                <div>Price</div>
                                <div>Amount</div>
                                <div>Status</div>
                            </div>
                        </div>

                        {products.map((i) => {
                            return (
                                <div className='flex w-[100%] justify-between  py-4  pr-3 border-b-2'>
                                    <div className='flex w-[50%] justify-between'>
                                        <div className='flex items-center gap-2'>
                                            <img src={i.image[0].url} alt="img" className='h-[2.5rem] object-contain w-[2.5rem] rounded-full overflow-hidden' />
                                            <h1>{trimTextToWordCount(i.name, 2)}</h1>
                                        </div>
                                        <div className='flex items-center'>
                                            6096 Marjolaine Landing
                                        </div>
                                        <div className='flex items-center'>
                                            12.09.2019
                                        </div>
                                    </div>
                                    <div className='flex justify-between w-[39%]'>
                                        <div className='flex items-center'>
                                            {`$${i.price}`}
                                        </div>
                                        <div className='flex items-center'>
                                            $34,295
                                        </div>
                                        <div className='flex items-center'>
                                            <div className='bg-[#05B69b] py-[0.2rem] px-2 text-center text-[0.8rem] font-medium text-white rounded-full'>Delivered</div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}


                    </div>
                </div>
            </div>
            
        </>
    );
};



export default Stats;