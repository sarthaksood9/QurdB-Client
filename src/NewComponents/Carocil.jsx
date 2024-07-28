import React, { useRef } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import {
    EffectFade,
    Autoplay,
    Navigation,
    Pagination,
} from "swiper/modules";
import "swiper/css/bundle";
import "swiper/css/navigation";
import { HiOutlineArrowSmRight } from "react-icons/hi";
import caro1 from "../Assits/caro1.png";




const Carocil = () => {
    const swiperRef = useRef();
    const swiperRef2 = useRef();
    const swiperRef3 = useRef();
  return (
    <div className='w-full flex justify-center relative  pt-[18vh]'>
                    <div className='flex-1  bg-white w-full h-full flex items-center relative'>
                        {/* <SwitchCircle radius={"w-[900px] h-[900px]"} top={"0%"} /> */}
                        <div onClick={() => swiperRef2.current?.slidePrev()} className="w-10 h-10 absolute left-8 z-10  flex items-center justify-center bg-white p-2 rounded-full shadow-sm cursor-pointer">
                            <HiOutlineArrowSmRight className="-rotate-180 text-[1.5rem] text-gray-600" />
                        </div>
                        <Swiper
                            onBeforeInit={(swiper) => {
                                swiperRef2.current = swiper;
                            }}
                            modules={[Navigation, Pagination, EffectFade, Autoplay]}
                            loop={true}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                            }}
                            slidesPerView={1}
                            spaceBetween={30}
                            preventInteractionOnTransition={true}
                            className="w-full h-full"
                            keyboard={{
                                enabled: true,
                                onlyInViewport: true,
                            }}
                            freeMode={false}
                            draggable={true}
                            pagination={true}

                        >
                            <SwiperSlide>
                                <div className='w-full h-full bg-slate-100'>
                                    <img className='h-[30rem] w-full' src={caro1} />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='w-full h-full bg-slate-100'>
                                    <img className='h-[30rem] w-full' src={caro1} />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='w-full h-full bg-slate-100'>
                                    <img className='h-[30rem] w-full' src={caro1} />
                                </div>
                            </SwiperSlide>

                        </Swiper>
                        <div onClick={() => swiperRef2.current?.slideNext()} className="cursor-pointer absolute z-10 right-8 w-10 h-10 flex items-center justify-center bg-white p-2 rounded-full shadow-sm">
                            <HiOutlineArrowSmRight className="text-[1.5rem] text-gray-600" />
                        </div>
                    </div>
                </div>
  )
}

export default Carocil