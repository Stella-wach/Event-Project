import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Events from './pages/Events'
import EventDetails from './pages/EventDetails'
import EventCheckout from './pages/EventCheckout'
import MyBookings from './pages/MyBookings'
import Favorite from './pages/Favorite'
import { Toaster } from 'react-hot-toast'
import Footer from './components/Footer'


import AdminLayout from './pages/admin/AdminLayout'

import Dashboard from './pages/admin/Dashboard'
import AddEvents from './pages/admin/AddEvents'
import ListEvents from './pages/admin/ListEvents'
import ListBookings from './pages/admin/ListBookings'

const App = () => {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')

  return (
    <>
      <Toaster />
      {!isAdminRoute && <Navbar />}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/events' element={<Events />} />
        <Route path='/event/:id' element={<EventDetails />} />
        <Route path='/event/:id/checkout' element={<EventCheckout />} />
        <Route path='/my-bookings' element={<MyBookings />} />
        <Route path='/favorite' element={<Favorite />} />

        {/* ✅ Admin route layout with nested children */}
        <Route path='/admin/*' element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path='add-events' element={<AddEvents />} />
          <Route path='list-events' element={<ListEvents />} />
          <Route path='list-bookings' element={<ListBookings />} />
        </Route>
      </Routes>

      {!isAdminRoute && <Footer />}
    </>
  )
}

export default App
