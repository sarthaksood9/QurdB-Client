import React from 'react'
import Navbar from '../components/Navbar'
import Home from '../components/Home'
import { Route, Routes } from 'react-router-dom'
import Product from '../components/Product'
import NewProd from '../NewComponents/NewProd'
import NewHome from '../NewComponents/NewHome'
import Shop from '../NewComponents/Shop'
import Rejistration from '../NewComponents/Rejistration'
import Orders from '../NewComponents/Orders'


const ProductRoutees = ({setSerch,serch}) => {
    return (

        <Routes>
            {/* <Navbar /> */}
            
            <Route path='/' element={<NewHome />}/>
            <Route path='/prod/:productId' element={<NewProd />}/>
            <Route path='/shop' element={<Shop setSerch={setSerch} serch={serch} />}/>
            <Route path='/order' element={<Orders />}/>
            
        </Routes>

    )
}

export default ProductRoutees