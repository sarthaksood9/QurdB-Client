import React, { useContext, useState } from 'react'
import { RiSearch2Line } from "react-icons/ri";
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { SlBag } from "react-icons/sl";
import { RxAvatar } from 'react-icons/rx';
import Cart from '../components/Cart';
import SideBar from './SideBar';
import toast from 'react-hot-toast';


const NewNav = ({ serch, setSerch }) => {
    // Accessing cart items from Redux store
    const cartItems = useSelector(state => state.cart.cart);

    // Accessing user context
    const user = useContext(UserContext);

    // State for toggling the cart visibility
    const [isCart, setIsCart] = useState(false);

    // Function to close the cart
    const closeCart = () => {
        setIsCart(false)
    }
    const navigate = useNavigate();
    const [sideBar, setSideBar] = useState(false);
    const closebar = () => {
        setSideBar(false)
    }

    const [mark, setMark] = useState("Home");

    
    
    const location = useLocation();

    const hendleSerch=()=>{
        if(location.pathname!=="/shop"){
            navigate("/shop");
            toast.success("Redirected To Shop");
            setSerch(true);
        }
        else{
            setSerch(!serch);
        }

    }

    return (
        <>
            <header className="flex bg-white items-center justify-between h-16 px-4 border-b fixed w-full z-40">
                <div onClick={() => { user.user?.role === "user" && setSideBar(!sideBar) }} className="text-2xl font-bold">3legant.</div>
                {user.user?.role === "user" && <nav className="hidden md:flex items-center space-x-8">
                    <a href="/" onClick={()=>{setMark("Home")}} className={`font-medium ${mark === "Home" ? "text-black font-semibold" : "text-muted-foreground"}`}>
                        Home
                    </a>
                    <a href="/shop" onClick={()=>{setMark("Shop")}} className={`font-medium ${mark === "Shop" ? "text-black font-semibold" : "text-muted-foreground"}`}>
                        Shop
                    </a>
                    <a href="/shop" onClick={()=>{setMark("Product")}} className={`font-medium ${mark === "Product" ? "text-black font-semibold" : "text-muted-foreground"}`}>
                        Product
                    </a>
                    <a href="/shop" onClick={()=>{setMark("Contact")}} className={`font-medium ${mark === "Contact" ? "text-black font-semibold" : "text-muted-foreground"}`}>
                        Contact Us
                    </a>
                </nav>}
                <div className="flex items-center text-[1.4rem] space-x-4">
                    {user.user?.role === "user" && <div onClick={() => { hendleSerch() }} className="w-6 h-6 text-black" ><RiSearch2Line /></div>}
                    {user.user?.role === "user" && <div onClick={() => { setIsCart(!isCart) }} className="w-6 h-6 text-black relative" ><SlBag />
                        <div className=' absolute top-[-5px] px-1 right-[-10px] rounded-full bg-black text-white text-center text-[0.7rem]'>{cartItems.length}</div>
                    </div>}
                    <div onClick={() => { user.logOut(); setIsCart(false); navigate("/") }} className="w-6 h-6 text-black" ><RxAvatar /></div>
                </div>
            </header>
            <Cart isCart={isCart} mod={closeCart} />
            <SideBar sideBar={sideBar} mod={closebar} />
        </>
    )
}

export default NewNav