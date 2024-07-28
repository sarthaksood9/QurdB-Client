import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import { initializeCart } from '../redux/setCart';
import toast from 'react-hot-toast';
import { LiaEdit } from "react-icons/lia";
import { MdOutlineDelete } from 'react-icons/md';
import { AddProd, DeleteModel, EditProd } from '../components/Models';


const Stock = () => {
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

    const [deleteMod, setDeleteMod] = useState(false);
    const [editMod,setEditMod]=useState(false);

    const closeEditMod=()=>{
        setEditMod(false);
    }



    const handleCloseMod = () => {
        setDeleteMod(false);
    }

    const [pordId, setProdId] = useState();
    const [product,setProduct]=useState();

    return (
        <div className='w-full'>
            <div className=' px-10 py-8 w-full shadow-xl rounded-xl'>
                <div className='flex justify-between w-full mb-[2rem]'>
                    <h1 className='font-medium text-[2.1rem]'>Product Stock</h1>

                </div>
                <div className='flex flex-col w-full gap-2 rounded-xl border-[0.2px] border-gray-400'>
                    <div className='flex w-full justify-between px-8   py-2 border-b-[1.3px] border-b-gray-400 font-medium'>
                        <div className='flex w-[100%] justify-between'>
                            <div>Image</div>
                            <div>Product Name</div>
                            <div>Category</div>
                            <div>Price</div>
                            <div>Stock</div>
                            <div>Action</div>
                        </div>
                    </div>

                    {products.map((i) => {
                        return (
                            <div className='flex w-[100%] justify-between  py-3  px-8   pr-3 border-b-[1.3px]'>
                                <div className='flex w-[47.5%] justify-between'>
                                    <img src={i.image[0].url} alt="img" className='h-[4rem] object-contain w-[4rem] rounded-lg  overflow-hidden' />
                                    <div className='flex items-center justify-start text-start'>
                                        <h1>{trimTextToWordCount(i.name, 2)}</h1>
                                    </div>
                                    <div className='flex justify-center items-center'>
                                        {i.category}
                                    </div>
                                </div>
                                <div className='flex justify-between w-[39%]'>
                                    <div className='flex items-center'>
                                        {`$${i.price}`}
                                    </div>
                                    <div className='flex items-center'>
                                        {i.stock}
                                    </div>
                                    <div className='flex items-center' onClick={()=>{setProdId(i._id)}}>
                                        <div className='border-[1px] border-gray-500 flex py-[0.2rem] text-[1.2rem] px-2 text-center font-medium rounded-md'>
                                            <div  onClick={()=>{setEditMod(true);setProduct(i)}} className='border-r-[1px] border-gray-500 px-1'>
                                                <LiaEdit  />
                                            </div>
                                            <div className='px-1' onClick={()=>{setDeleteMod(true)}} >
                                                <MdOutlineDelete className='text-[#EF3826]' />
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}


                </div>
            </div>
            {deleteMod &&
                <>

                    <DeleteModel mod={handleCloseMod} id={pordId} />
                    <style>
                        {`body{ overflow:hidden; }`}
                    </style>
                </>
            }
            {editMod &&
                <>

                    <EditProd mod={closeEditMod} pro={product} />
                    <style>
                        {`body{ overflow:hidden; }`}
                    </style>
                </>
            }
        </div>
    )
}

export default Stock