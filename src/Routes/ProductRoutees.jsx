import React from 'react'
import Navbar from '../components/Navbar'
import Home from '../components/Home'
import { Route, Routes } from 'react-router-dom'
import Product from '../components/Product'

const ProductRoutees = () => {
    return (

        <Routes>
            {/* <Navbar /> */}
            
            <Route path='/' element={<Home />}/>
            <Route path='/product/:productId' element={<Product />}/>
        </Routes>

    )
}

export default ProductRoutees