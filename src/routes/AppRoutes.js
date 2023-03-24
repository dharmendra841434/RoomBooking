import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import OrderPlace from '../pages/OrderPlace'
import Payment from '../pages/Payment'

const AppRoutes = () => {
  return (
    <>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/order" element={<OrderPlace />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </>
  )
}

export default AppRoutes