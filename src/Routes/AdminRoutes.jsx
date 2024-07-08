import React from 'react'
import Slider from '../components/Silder'
import { Route, Routes } from 'react-router-dom'
import AdminProd from '../components/AdminProd'
import ComingSoon from '../components/ComingSoon'

const AdminRoutes = () => {
  return (
    <Slider>
      <Routes>

        <Route path='/' element={<AdminProd />} />
        <Route path='/statistics' element={<ComingSoon />} />

      </Routes>
    </Slider>
  )
}

export default AdminRoutes