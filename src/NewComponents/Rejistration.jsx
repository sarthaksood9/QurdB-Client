import React, { useContext, useState } from 'react'

import loginPng from "../Assits/Left.png"
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import Loading from '../components/Loading';
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";





export function Logn({ setLogin }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(true);

    const [loading, setLoading] = useState(false)



    const user = useContext(UserContext);
    const navigate = useNavigate();


    const login = (email, password) => {
        setLoading(true);

        axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/user/login`, { email, password })
            .then((req, res) => {
                user.logIn(req.data.user);
                navigate("/");
                setLoading(false);
                toast.success(`Welcome Back ${req.data.user.name}`);

            })
            .catch((e) => {
                toast.error('Invalid UserName Or Password')
                console.log(e);
                setLoading(false)
            })
    }




    return (
        <>

            {loading ? <Loading /> :
                <div class="flex flex-col w-full md:px-6 lg:px-[10rem] gap-4">
                    <div class="flex w-full justify-start text-[2.5rem] font-medium md:text-[2.3rem] sm:text-[1.25rem]">
                        <h1>Sign In</h1>
                    </div>
                    <div class="flex gap-2 items-center text-gray-500">
                        <span>Don't have an accout yet?</span>
                        <span onClick={() => { setLogin(false) }} class="font-[550] cursor-pointer text-[#04aa6d] text-[17.5px] md:text-[15px] sm:text-[13px]">Sign Up</span>
                    </div>
                    <div class="flex flex-col gap-8">
                        <div class="flex flex-col w-full gap-2">
                            <input value={email} onChange={(e) => { setEmail(e.target.value) }} id="Email" placeholder="Email.." class="px-2 font-sans border-b-[1px] border-slate-300  outline-none py-3 text-[18px] md:text-[16px] sm:text-[14px]" />
                        </div>
                        <div class="flex w-full relative">
                            <input type={showPass ? "password" : "text"} value={password} onChange={(e) => { setPassword(e.target.value) }} id="Password" placeholder="Password.." class="px-2 w-full border-b-[1px] border-slate-300  outline-none py-3 text-[18px] md:text-[16px] sm:text-[14px]" />
                            <div class="flex absolute top-[1rem] right-4 gap-4 items-center cursor-pointer" onClick={() => { setShowPass(!showPass) }}>
                                {!showPass ? < FaRegEye className='font-thin text-[1.6rem] text-gray-500' /> :
                                    <FaRegEyeSlash className='font-thin text-[1.6rem] text-gray-500' />}

                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col w-full gap-2">
                        <div className='w-full flex justify-between items-center'>
                            <div className='flex items-center gap-2'>
                                <input type="checkbox" className='text-[2rem] h-[1.15rem] w-[1.15rem]' name="rem" />
                                <label htmlFor="rem" className='text-gray-500'>Remember me</label>
                            </div>
                            <div>
                                <h1 className='font-medium'>Forgot password?</h1>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button onClick={() => { login(email, password) }} class="w-full mt-3 text-center py-[0.85rem] text-white font-[550] rounded-lg bg-[#18181B] text-[22px] md:text-[20px] sm:text-[18px]">Sign In</button>
                    </div>

                </div>}
        </>
    )
}





export function Signup({ setLogin }) {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false)


    const user = useContext(UserContext);
    const navigate = useNavigate();





    const signUp = (name, email, password) => {
        axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/user/registration`, { name, email, password })
            .then((req, res) => {
                user.logIn(req.data.user);
                console.log(req.data);
                console.log("ho")
                navigate("/");
                setLoading(false);
                toast.success(`Welcome ${req.data.user.name}`);

            })
            .catch((e) => {
                toast.error('This Email Already Exists...')
                console.log(e);
                setLoading(false);
            })
    }






    const [showPass, setShowPass] = useState(true);

    return (
        <>
            {loading ? <Loading /> :
                <div class="flex flex-col w-full md:px-6 lg:px-[10rem] gap-4">
                    <div class="flex w-full justify-start text-[2.5rem] font-medium md:text-[2.3rem] sm:text-[1.25rem]">
                        <h1>Sign Up</h1>
                    </div>
                    <div class="flex gap-2 items-center text-gray-500">
                        <span>Already have an account?</span>
                        <span onClick={() => { setLogin(true) }} class="font-[550] cursor-pointer text-[#04aa6d] text-[17.5px] md:text-[15px] sm:text-[13px]">Sign in</span>
                    </div>
                    <div class="flex flex-col gap-8">

                        <div class="flex flex-col w-full gap-2">
                            <input id="name" value={name} onChange={(e) => { setName(e.target.value) }} placeholder="Your name" className="px-2 w-full border-b-[1px] border-slate-300  outline-none py-3 text-[18px] md:text-[16px] sm:text-[14px]" />
                        </div>
                        <div class="flex flex-col w-full gap-2">
                            <input id="Email" value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder="Email address" className="px-2 w-full border-b-[1px] border-slate-300  outline-none py-3 text-[18px] md:text-[16px] sm:text-[14px]" />
                        </div>
                        <div class="flex w-full relative">
                            <input type={showPass ? "password" : "text"} value={password} onChange={(e) => { setPassword(e.target.value) }} id="Password" placeholder="Password" className="px-2 w-full border-b-[1px] border-slate-300  outline-none py-3 text-[18px] md:text-[16px] sm:text-[14px]" />
                            <div class="flex absolute top-[1rem] right-4 gap-4 items-center cursor-pointer" onClick={() => { setShowPass(!showPass) }}>
                                {!showPass ? < FaRegEye className='font-thin text-[1.6rem] text-gray-500' /> :
                                    <FaRegEyeSlash className='font-thin text-[1.6rem] text-gray-500' />}

                            </div>
                        </div>

                    </div>
                    <div class="flex flex-col w-full gap-2 py-6">
                        <div className='w-full flex justify-between items-center'>
                            <div className='flex items-center gap-2'>
                                <input type="checkbox" className='text-[2rem] h-[1.15rem] w-[1.15rem]' name="rem" />
                                <label htmlFor="rem" className='text-gray-500'>I agree with Privacy <span className='text-black font-medium'>Policy</span> and <sanp className='text-black font-medium'>Terms of Use</sanp></label>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button onClick={() => { signUp(name, email, password) }} class="w-full text-center py-[0.85rem] text-white font-[550] rounded-full bg-[#18181B] text-[22px] md:text-[20px] sm:text-[18px]">Sign Up</button>
                    </div>
                </div>}
        </>
    )
}

const Rejistration = () => {
    const [login, setLogin] = useState(true);
    return (
        <div className='flex w-full h-screen items-center justify-center absolute z-50 bg-white'>
            <div className='w-[50%] hidden  lg:block'>
                <img src={loginPng} className='h-screen' alt="Login" />
            </div>
            <div className='w-[90%] flex justify-center items-center'>
                {login ? (<Logn setLogin={setLogin} />) : (<Signup setLogin={setLogin} />)}
            </div>
        </div>
    )
}

export default Rejistration