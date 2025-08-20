import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <footer className="px-6 pt-8 md:px-16 lg:px-36 mt-40 w-full text-gray-300 text-base">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row justify-between gap-10 border-b border-gray-500 pb-10">
        
        {/* Logo + About */}
        <div className="md:max-w-md">
          <img src={assets.logo} alt="QuickEvents Logo" className="h-16 w-auto" />
          <p className="mt-6 text-sm leading-relaxed">
            QuickEvents is your go-to platform for discovering and booking the best events in town. 
            From concerts to conferences, we make attending unforgettable moments easy.
          </p>
          <div className="flex items-center gap-3 mt-4">
            <img src={assets.googlePlay} alt="Google Play" className="h-9 w-auto border border-white rounded" />
            <img src={assets.appStore} alt="App Store" className="h-9 w-auto" />
          </div>
        </div>

        {/* Links + Contact */}
        <div className="flex flex-col sm:flex-row gap-12 md:gap-24">
          <div>
            <h2 className="font-semibold mb-4">Company</h2>
            <ul className="text-sm space-y-2">
              <li><a href="/" className="hover:text-white transition">Home</a></li>
              <li><a href="/events" className="hover:text-white transition">Events</a></li>
              <li><a href="/" className="hover:text-white transition">Venues</a></li>
              <li><a href="/" className="hover:text-white transition">Categories</a></li>
              <li><a href="/favorite" className="hover:text-white transition">Favorites</a></li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold mb-4">Get in Touch</h2>
            <div className="text-sm space-y-2">
              <p>+254-734-567-890</p>
              <p>QuickEvents@gmail.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <p className="pt-4 text-center text-xs md:text-sm pb-5 text-gray-400">
        © {new Date().getFullYear()} QuickEvents. All Rights Reserved.
      </p>
    </footer>
  )
}

export default Footer
