import React, { useRef } from 'react'
import "swiper/css/bundle";
import "swiper/css/navigation";
import Carocil from './Carocil';
import beadroom from "../Assits/beadroom.png"
import kitchen from "../Assits/kitchen.png"
import levingroom from "../Assits/livingRoom.png"
import { IoMdArrowForward } from "react-icons/io";
import ProductCardSlider from './ProductCardSlider';
import { PiTruckLight } from "react-icons/pi";
import { GoCreditCard } from "react-icons/go";
import { CiLock } from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";
import fimg from "../Assits/fimg.png";
import { useNavigate } from 'react-router-dom';





const NewHome = () => {

    const navigate = useNavigate();
    return (
        <>
            <div className='flex flex-col gap-8 w-full lg:px-24'>
                <Carocil />
                <div className='flex flex-col md:flex-row px-10 gap-4 md:gap-1'>
                    <div className='text-center md:text-start md:w-1/2 text-[2rem] md:text-[2.5rem] lg:text-[4rem] font-medium'>
                        <h1>Simply Unique/
                            Simply Better.
                        </h1>
                    </div>
                    <div className='text-center md:text-start md:w-1/2 flex items-center md:px-7 lg:px-10 md:text-[0.95rem] lg:text-[1.2rem]'>
                        <p>
                            <spna className="font-semibold ">3legant</spna> is a gift & decorations store based in HCMC, Vietnam. Est since 2019.
                        </p>
                    </div>
                </div>
                <div className='flex flex-col md:flex-row gap-8 w-full justify-center px-5 md:px-16'>
                    <div className='md:w-[50%] relative'>
                        <img className='h-[100%] w-[100%]' src={levingroom} alt="img" />
                        <div className='absolute top-9 left-5'>
                            <h1 className='text-[1.3rem] font-medium'>
                                Living Room
                            </h1>
                            <div onClick={() => { navigate("/shop") }} className='border-b-[1px] border-black cursor-pointer'>
                                <h1 className='flex gap-2 items-center'>Shop Now <IoMdArrowForward className='pt-[0.15rem] text-[1.1rem]' /></h1>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-8 md:w-[50%]'>
                        <div className='relative'>
                            <img className='h-[100%] w-full' src={beadroom} alt="img" />
                            <div className='absolute top-9 left-5'>
                                <h1 className='text-[1.3rem] font-medium'>
                                    Bedroom
                                </h1>
                                <div onClick={() => { navigate("/shop") }} className='border-b-[1px] border-black cursor-pointer'>
                                    <h1 className='flex gap-2 items-center'>Shop Now <IoMdArrowForward className='pt-[0.15rem] text-[1.1rem]' /></h1>
                                </div>
                            </div>
                        </div>
                        <div className='relative'>
                            <img className='h-[100%] w-full' src={kitchen} alt="img" />
                            <div className='absolute top-9 left-5'>
                                <h1 className='text-[1.3rem] font-medium'>
                                    Kitchen
                                </h1>
                                <div onClick={() => { navigate("/shop") }} className='border-b-[1px] border-black cursor-pointer'>
                                    <h1 className='flex gap-2 items-center'>Shop Now <IoMdArrowForward className='pt-[0.15rem] text-[1.1rem]' /></h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ProductCardSlider title={"You might also like"} />
                <div className='flex md:flex-row flex-col gap-5 items-center md:justify-between px-16'>
                    <div className='w-[15rem] flex gap-1 flex-col rounded-sm p-10 bg-[#F4F5F7] '>
                        <PiTruckLight className='text-[3rem]' />
                        <h1 className='font-medium text-[1.2rem]'>Free Shipping</h1>
                        <p className='text-[0.8rem] text-gray-500 '>Order above $200</p>
                    </div>
                    <div className='w-[15rem] flex gap-1 flex-col rounded-sm p-10 bg-[#F4F5F7] '>
                        <GoCreditCard className='text-[3rem]' />
                        <h1 className='font-medium text-[1.2rem]'>Money-back</h1>
                        <p className='text-[0.8rem] text-gray-500 '>30 days guarantee</p>
                    </div>
                    <div className='w-[15rem] flex gap-1 flex-col rounded-sm p-10 bg-[#F4F5F7] '>
                        <CiLock className='text-[3rem]' />
                        <h1 className='font-medium text-[1.2rem]'>Secure Payments</h1>
                        <p className='text-[0.8rem] text-gray-500 '>Secured by Stripe</p>
                    </div>
                    <div className='w-[15rem] flex gap-1 flex-col rounded-sm p-10 bg-[#F4F5F7]'>
                        <IoCallOutline className='text-[3rem]' />
                        <h1 className='font-medium text-[1.2rem]'>24/7 Support</h1>
                        <p className='text-[0.8rem] text-gray-500 '>Phone and Email support</p>
                    </div>
                </div>
                <div className='flex flex-col md:flex-row'>
                    <div className='w-full md:w-1/2'>
                        <img src={fimg} alt="img" />
                    </div>
                    <div className='flex flex-col justify-center py-5 md:py-0 px-10 gap-3 bg-[#F4F5F7]'>
                        <h2 className='text-[#377dff] font-semibold'>SALE UP TO 35% OFF</h2>
                        <h1 className='font-medium text-[3rem] leading-[2.8rem]'>HUNDREDS of
                            New lower prices!</h1>
                        <p>Its more affordable than ever to give every room in your home a stylish makeover</p>
                        <div className='border-b-[1px] w-fit border-black cursor-pointer'>
                            <h1 className='flex gap-2 items-center'>Shop Now <IoMdArrowForward className='pt-[0.15rem] text-[1.1rem]' /></h1>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NewHome