import React, { useContext, useEffect, useState } from 'react'
import { initializeCart } from '../redux/setCart';
import axios from 'axios';
import toast from 'react-hot-toast';
import { UserContext } from '../context/UserContext';
import { HiMiniInbox } from 'react-icons/hi2';
import ProductCard from './ProductCard';
import AdminproductCard from './AdminproductCard';
import { AddProd, DeleteModel } from './Models';

const AdminProd = () => {
    // Context and Redux hooks to get user information

    const user = useContext(UserContext);

    // State hooks for loading, products, and search input

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



    const [deleteMod, setDeleteMod] = useState(false);
    const [addProMod, setAddProMod] = useState(false);

    

    const handleCloseMod = () => {
        setDeleteMod(false);
    }
    const handleCloseAddProMod = () => {
        setAddProMod(false);
    }

    const [pordId,setProdId]=useState();


    return (
        <>
            <div className="w-full  p-3 rounded-md grid relative sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
                <h1 className='text-[2.4rem] font-bold absolute top-[-60px]'>Products</h1>
                {loading ? <div className='w-full flex justify-center items-center absolute h-full'><div className="animate-spin rounded-full border-4 border-[#736f6f] border-primary border-t-transparent h-8 w-8" />
                    <span className="text-[#625757] font-semibold ml-3">Loading...</span></div> : <>{products.length !== 0 ? products.map((i, x) => {

                        return (

                            <AdminproductCard pordId={pordId} setProdId={setProdId} i={i} setLoading={setLoading} deleteMod={deleteMod} setDeleteMod={setDeleteMod} />
                        )
                    }) :
                        <div className='flex justify-center items-center w-full absolute top-[40%] gap-5'>
                            <span>No Product Found...!</span>
                            <HiMiniInbox className='text-[4rem] text-gray-600' />
                        </div>}</>}

                <div onClick={()=>{setAddProMod(true)}} className='fixed bottom-10 shadow-md right-10'>
                    <button className="bg-[#18181B] px-12 py-3 shadow-xl rounded-full text-white font-semibold hover:bg-primary/90">Add Product +</button>
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
            {addProMod &&
                <>

                    <AddProd mod={handleCloseAddProMod} />
                    <style>
                        {`body{ overflow:hidden; }`}
                    </style>
                </>
            }
        </>
    )
}

export default AdminProd