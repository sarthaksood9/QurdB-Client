import React, { useContext, useEffect, useState } from 'react'
import { FaEye } from 'react-icons/fa6'
import { BsFacebook } from 'react-icons/bs'
import { FcGoogle } from 'react-icons/fc'
import toast from 'react-hot-toast'
import { json, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import axios from 'axios'

import Loading from './Loading'
import Cookies from 'js-cookie'

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

            {loading ? <Loading /> : <div class="md:w-[35%] w-full overflow-hidden h-fit py-12 px-8 border-[1px] border-slate-300 gap-4 flex flex-col rounded-lg">
                <div class="flex w-full justify-start text-[2.5rem] font-[600] md:text-[1.5rem] sm:text-[1.25rem]">
                    <h1>Login</h1>
                </div>
                <div class="flex flex-col gap-8">
                    <div class="flex flex-col w-full gap-2">
                        <div class="flex justify-between w-full">
                            <div>
                                <label for="Email" class="text-[19px] font-semibold md:text-[17px] sm:text-[15px]">Email</label>
                            </div>
                            <div class="flex gap-4 items-center">
                                <span>Need an Account ?</span>
                                <span onClick={() => { setLogin(false) }} class="font-[550] cursor-pointer text-[#04aa6d] text-[17.5px] md:text-[15px] sm:text-[13px]">Sign Up</span>
                            </div>
                        </div>
                        <input value={email} onChange={(e) => { setEmail(e.target.value) }} id="Email" placeholder="Email.." class="px-2 font-sans border-[1px] border-slate-300 rounded-lg outline-none py-3 text-[18px] md:text-[16px] sm:text-[14px]" />
                    </div>
                    <div class="flex flex-col w-full gap-2">
                        <div class="flex justify-between w-full">
                            <div>
                                <label for="Password" class="text-[19px] font-semibold md:text-[17px] sm:text-[15px]">Password</label>
                            </div>
                            <div class="flex gap-4 items-center cursor-pointer" onClick={() => { setShowPass(!showPass) }}>
                                <span><FaEye /></span>
                                <span class="font-[550] text-[17.5px] md:text-[15px] sm:text-[13px]">Show</span>
                            </div>
                        </div>
                        <input type={showPass ? "password" : "text"} value={password} onChange={(e) => { setPassword(e.target.value) }} id="Password" placeholder="Password.." class="px-2 border-[1px] border-slate-300 rounded-lg outline-none py-3 text-[18px] md:text-[16px] sm:text-[14px]" />
                    </div>
                </div>
                <div>
                    <button onClick={() => { login(email, password) }} class="w-full text-center py-[0.85rem] text-white font-[550] rounded-full bg-[#18181B] text-[22px] md:text-[20px] sm:text-[18px]">Login</button>
                </div>
                <div class="flex justify-center items-center gap-1">
                    <div class="h-[1px] bg-slate-300 w-full"></div>
                    <div>OR</div>
                    <div class="h-[1px] bg-slate-300 w-full"></div>
                </div>
                <div class="flex flex-col gap-3">
                    <div onClick={() => { toast.error("Feature Comeing Soon..") }} class="flex w-full py-[0.85rem] text-white font-[500] rounded-full bg-[#1877f2] text-[20px] md:text-[18px] sm:text-[16px] justify-center items-center gap-3">
                        <BsFacebook />
                        <button>Continue with Facebook</button>
                    </div>
                    <div onClick={() => { toast.error("Feature Comeing Soon..") }} class="flex w-full py-[0.85rem] border-[1px] border-slate-300 font-[500] rounded-full text-[20px] md:text-[18px] sm:text-[16px] justify-center items-center gap-3">
                        <FcGoogle />
                        <button>Continue with Google</button>
                    </div>
                </div>
                <div onClick={() => { toast.error("Feature Comeing Soon..") }} class="mt-2">
                    <p>Forgot Password?</p>
                </div>
            </div>}
        </>
    )
}


export function Signup({ setLogin }) {
    const [uppercase, setUppercase] = useState(false);
    const [lowcase, setLowcase] = useState(false);
    const [special, setSpecial] = useState(false);
    const [number, setNumber] = useState(false);
    const [length, setLength] = useState(false);

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false)


    const user = useContext(UserContext);
    const navigate = useNavigate();

    console.log(name);




    const signUp = (name,email,password) => {
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

    useEffect(() => {
        function containsLowerCaseCharacter(inputString) {
            return /[a-z]/.test(inputString);
        }
        function containsUpperCaseCharacter(inputString) {
            return /[A-Z]/.test(inputString);
        }
        function containsSpecialCharacter(inputString) {
            var regex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\|]/;
            return regex.test(inputString)
        }
        function containsNumber(inputString) {
            var regex = /\d/;
            return regex.test(inputString)
        }
        function containsNumber(inputString) {
            var regex = /\d/;
            return regex.test(inputString)
        }
        if (containsLowerCaseCharacter(password)) {

            // setValidations((prev) => ({ ...prev, lowCase: true }));
            setLowcase(true);
        }
        else {
            // setValidations((prev) => ({ ...prev, lowCase: false }));
            setLowcase(false);

        }
        if (containsUpperCaseCharacter(password)) {

            setUppercase(true)
        }
        else {
            setUppercase(false)
        }
        if (containsSpecialCharacter(password)) {

            setSpecial(true)
        }
        else {
            setSpecial(false)
        }
        if (containsNumber(password)) {

            setNumber(true)
        }
        else {
            setNumber(false)
        }
        if (password.length >= 8) {
            setLength(true)
        }
        else {
            setLength(false)
        }
    }, [password]);

    return (
        <>
            {loading ? <Loading /> :<div class="md:w-[35%] w-full overflow-hidden h-fit py-12 px-8 border-[1px] border-slate-300 gap-4 flex flex-col rounded-lg">
                <div class="flex w-full justify-start text-[2.5rem] font-[600] md:text-[1.5rem] sm:text-[1.25rem]">
                    <h1>Sign Up</h1>
                </div>
                <div class="flex flex-col gap-8">
                    <div class="flex flex-col w-full gap-2">
                        <div class="flex justify-between w-full">
                            <div>
                                <label for="Email" class="text-[19px] font-semibold md:text-[17px] sm:text-[15px]">Email</label>
                            </div>
                            <div class="flex gap-4 items-center">
                                <span>Already have an Account?</span>
                                <span onClick={() => { setLogin(true) }} class="font-[550] cursor-pointer text-[#04aa6d] text-[17.5px] md:text-[15px] sm:text-[13px]">Login</span>
                            </div>
                        </div>
                        <input id="Email" value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder="Email.." class="px-2 border-[1px] border-slate-300 rounded-lg outline-none py-3 text-[18px] md:text-[16px] sm:text-[14px]" />
                    </div>
                    <div class="flex flex-col w-full gap-2">
                        <div class="flex justify-between w-full">
                            <div>
                                <label for="name" class="text-[19px] font-semibold md:text-[17px] sm:text-[15px]">Name</label>
                            </div>
                        </div>
                        <input id="name" value={name} onChange={(e) => { setName(e.target.value) }} placeholder="Name.." class="px-2 border-[1px] border-slate-300 rounded-lg outline-none py-3 text-[18px] md:text-[16px] sm:text-[14px]" />
                    </div>
                    <div class="flex flex-col w-full gap-2">
                        <div class="flex justify-between w-full">
                            <div>
                                <label for="Password" class="text-[19px] font-semibold md:text-[17px] sm:text-[15px]">Password</label>
                            </div>
                            <div class="flex gap-4 items-center cursor-pointer" onClick={() => { setShowPass(!showPass) }}>
                                <span><FaEye /></span>
                                <span class="font-[550] text-[17.5px] md:text-[15px] sm:text-[13px]">Show</span>
                            </div>
                        </div>
                        <input type={showPass ? "password" : "text"} value={password} placeholder="Password.." onChange={(e) => { setPassword(e.target.value.trim()) }} class={`px-2 border-[1px] ${uppercase ? ("border-slate-300") : ("border-red-600")} border-slate-300 rounded-lg outline-none py-3 text-[18px] md:text-[16px] sm:text-[14px]`} />
                    </div>
                    <div class="flex w-full justify-between">
                        <div>
                            <ul class="custom-list flex flex-col gap-2 text-start">
                                <li class={`${lowcase ? ("text-[#04aa6d]") : ("text-black")}`}>One lowercase Character</li>
                                <li class={`${uppercase ? ("text-[#04aa6d]") : ("text-black")}`}>One uppercase Character</li>
                                <li class={`${special ? ("text-[#04aa6d]") : ("text-black")}`}>One special Character</li>
                            </ul>
                        </div>
                        <div>
                            <ul class="custom-list flex flex-col gap-2 text-start">
                                <li class={`${number ? ("text-[#04aa6d]") : ("text-black")}`}>One number</li>
                                <li class={`${length ? ("text-[#04aa6d]") : ("text-black")}`}>8 characters minimum</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div>
                    <button onClick={() => { signUp(name,email,password) }} class="w-full text-center py-[0.85rem] text-white font-[550] rounded-full bg-[#18181B] text-[22px] md:text-[20px] sm:text-[18px]">Sign Up</button>
                </div>
            </div>}
        </>
    )
}



const Login = () => {
    const [login, setLogin] = useState(true);


    return (

        <div className='h-[100vh] w-full bg-white flex justify-center items-center absolute top-0 z-50'>
            <div className='hidden md:flex flex-col w-[300px] px-5 py-3 bg-white shadow-xl rounded-lg absolute top-10 left-5'>
                <div className='flex justify-center mb-3'>
                    <h1 className='text-[1.4rem] font-semibold'>Admin Credentials:-</h1>
                </div>
                <h1>Username: <span className='text-blue-500'>admin</span></h1>
                <h1>Password: <span className='text-blue-500'>admin</span></h1>
            </div>
            {login ? (<Logn setLogin={setLogin} />) : (<Signup setLogin={setLogin} />)}

        </div>
    )
}

export default Login