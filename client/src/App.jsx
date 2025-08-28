import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import Events from './pages/Events'
import EventDetails from './pages/EventDetails'
import EventCheckout from './pages/EventCheckout'
import MyBookings from './pages/MyBookings'
import Favorite from './pages/Favorite'
import toast, { Toaster } from 'react-hot-toast'
import Footer from './components/Footer'

import AdminLayout from './pages/admin/AdminLayout'

import Dashboard from './pages/admin/Dashboard'
import AddEvents from './pages/admin/AddEvents'
import ListEvents from './pages/admin/ListEvents'
import ListBookings from './pages/admin/ListBookings'
import { useAppContext } from './context/appContext'
import { SignIn } from '@clerk/clerk-react'

const App = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const isAdminRoute = location.pathname.toLowerCase().startsWith('/admin')

  const { user } = useAppContext()

  // ✅ get user email safely (works with Clerk)
  const userEmail = user?.primaryEmailAddress?.emailAddress || user?.email

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
        <Route
          path='/admin/*'
          element={
            user ? (
              userEmail === "wstellawambui@gmail.com" ? (
                <AdminLayout />
              ) : (
                <NotAuthorizedRedirect />
              )
            ) : (
              <div className='min-h-screen flex justify-center items-center'>
                <SignIn fallbackRedirectUrl={'/admin'} />
              </div>
            )
          }
        >
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

// ✅ Separate component so toast + redirect runs only once
const NotAuthorizedRedirect = () => {
  const navigate = useNavigate()

  useEffect(() => {
    toast.error("You are not authorized to access admin dashboard")
    navigate("/")
  }, [navigate])

  return null
}

export default App