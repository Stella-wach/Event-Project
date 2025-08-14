import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Events from './pages/Events'
import EventDetails from './pages/EventDetails'
import SeatLayout from './pages/SeatLayout'
import MyBookings from './pages/MyBookings'
import Favorite from './pages/Favorite'
import {Toaster} from 'react-hot-toast'
import Footer from './components/Footer'

const App = () => {

const isAdminRoute = useLocation().pathname.startsWith('/admin');


  return (
    <>
    <Toaster/>
      {!isAdminRoute && <Navbar />}

<Routes>

  <Route path='/' element={<Home/>}/>
  <Route path='/events' element={<Events/>}/>
  <Route path='/events/:id' element={<EventDetails/>}/>
  <Route path='/events/:id/:date' element={<SeatLayout/>}/>
  <Route path='/my-bookings' element={<MyBookings/>}/>
  <Route path='/favorite' element={<Favorite/>}/>

</Routes>
{!isAdminRoute && <Footer />}
         </>
  )
}

export default App
