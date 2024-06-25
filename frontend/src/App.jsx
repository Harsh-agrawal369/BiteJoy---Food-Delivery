import React from 'react'
import Navbar from './components/Navbar/Navbar'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Cart from './pages/Cart/Cart'
import HomePage from './pages/HomePage/HomePage'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'

const App = () => {
  return (
    <div className='app'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/placeorder' element={<PlaceOrder/>} />
      </Routes>
    </div>
  )
}

export default App
