import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { addToCart } from '../redux/cartSlice';
import toast from 'react-hot-toast';
import { EditProd } from './Models';

const AdminproductCard = ({ setProdId,pordId,i, setLoading, deleteMod, setDeleteMod }) => {
    const navigate = useNavigate(); // Hook for navigation

    const dispatch = useDispatch(); // Hook for dispatching actions

    const user = useContext(UserContext); // Get user context

    function trimTextToWordCount(text, wordCount) {
        const words = text.split(' ');
        if (words.length > wordCount) {
            return words.slice(0, wordCount).join(' ') + '...';
        }
        return text;
    }


   

    const [editMod,setEditMod]=useState(false);

    const closeEditMod=()=>{
        setEditMod(false);
    }

    const [product,setProduct]=useState();



    return (
        <>
            <div onClick={() => {setEditMod(true);setProduct(i)}} className="group relative border border-muted rounded-lg overflow-hidden  xl:w-fit hover:scale-105 transition-all duration-500">
                <div href="#" prefetch={false}>
                    <img
                        src={i.image[0].url}
                        alt='ji'

                        width={300}
                        height={300}
                        className="w-full h-[300px] p-3 object-fit group-hover:opacity-80 transition-opacity"
                    />
                </div>
                <div className="p-4" onClick={(e) => e.stopPropagation()}>
                    <h3 className="font-medium text-lg">{i.name}</h3>
                    <p className="text-muted-foreground text-sm">
                        {trimTextToWordCount(i.discription, 8)}</p>
                    <div className="mt-2 flex items-center justify-between " >
                        <span className="font-medium text-primary">{`$ ${i.price}`}</span>

                    </div>
                    <div className='flex flex-col gap-2'>
                        <button
                            size="sm"
                            variant="outline"
                            onClick={() => {setEditMod(true);setProduct(i)} }
                            className="bg-[#18181B] px-2 py-2 rounded-md text-white font-semibold hover:bg-primary/90"
                        >
                            Edit
                        </button>
                        <button
                            size="sm"
                            variant="outline"
                            onClick={() => { setDeleteMod(true);setProdId(i._id)}}
                            className="bg-[#18181B] px-2 py-2 rounded-md text-white font-semibold hover:bg-primary/90"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
            
            {editMod &&
                <>

                    <EditProd mod={closeEditMod} pro={product} />
                    <style>
                        {`body{ overflow:hidden; }`}
                    </style>
                </>
            }
        </>
    )
}

export default AdminproductCard