import React, { useState } from 'react'
import { ChevronDown, Mail, Phone, MessageCircle } from 'lucide-react'
import BlurCircle from '../components/BlurCircle'
import PageTransition from '../components/PageTransition'

const faqs = [
  {
    q: 'How do I book a ticket?',
    a: "Browse Events, open the one you want, pick a date and time, choose how many tickets, then check out. You'll be asked to log in at that final step if you haven't already.",
  },
  {
    q: 'How does payment work?',
    a: "Payment is handled through M-PESA. At checkout you'll enter your M-PESA number, and a payment prompt (STK Push) will be sent directly to your phone to confirm.",
  },
  {
    q: "My M-PESA prompt didn't arrive - what do I do?",
    a: "Double check the phone number you entered is correct and has M-PESA active. If it still doesn't arrive after a minute, try the checkout again - occasionally the request times out on a slow connection.",
  },
  {
    q: 'Can I get a refund?',
    a: "Refund requests are handled case by case. Reach out through the contact details below with your booking reference and we'll look into it.",
  },
  {
    q: 'Where can I see my tickets after booking?',
    a: "All your bookings are listed under 'My Bookings' once you're logged in.",
  },
  {
    q: 'Do I need an account to browse events?',
    a: 'No - browsing and viewing event details is open to everyone. An account is only needed when you actually book a ticket.',
  },
]

const HelpDesk = () => {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <PageTransition>
      <div className='relative my-40 mb-60 px-6 md:px-16 lg:px-40 xl:px-44 overflow-hidden min-h-[80vh]'>
        <BlurCircle top='150px' left='0px' />
        <BlurCircle bottom='50px' right='50px' />

        <h1 className='text-3xl font-bold mb-2'>Help Desk</h1>
        <p className='text-gray-400 mb-10'>Answers to common questions, and how to reach us directly.</p>

        <div className='space-y-3 max-w-3xl'>
          {faqs.map((item, index) => {
            const isOpen = openIndex === index
            return (
              <div key={item.q} className='bg-gray-800 rounded-xl overflow-hidden'>
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className='w-full flex items-center justify-between text-left px-5 py-4 cursor-pointer'
                >
                  <span className='font-medium text-sm'>{item.q}</span>
                  <ChevronDown className={`w-4 h-4 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <p className='px-5 pb-4 text-sm text-gray-400 leading-relaxed'>{item.a}</p>
                )}
              </div>
            )
          })}
        </div>

        <div className='mt-14 max-w-3xl'>
          <h2 className='text-xl font-semibold mb-4'>Still need help?</h2>
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
            <a href='mailto:QuickEvents@gmail.com' className='flex items-center gap-3 bg-gray-800 rounded-xl px-5 py-4 hover:bg-gray-700 transition'>
              <Mail className='w-5 h-5 text-primary flex-shrink-0' />
              <div>
                <p className='text-sm font-medium'>Email us</p>
                <p className='text-xs text-gray-400'>QuickEvents@gmail.com</p>
              </div>
            </a>
            <a href='tel:+254734567890' className='flex items-center gap-3 bg-gray-800 rounded-xl px-5 py-4 hover:bg-gray-700 transition'>
              <Phone className='w-5 h-5 text-primary flex-shrink-0' />
              <div>
                <p className='text-sm font-medium'>Call us</p>
                <p className='text-xs text-gray-400'>+254-734-567-890</p>
              </div>
            </a>
            <div className='flex items-center gap-3 bg-gray-800 rounded-xl px-5 py-4'>
              <MessageCircle className='w-5 h-5 text-primary flex-shrink-0' />
              <div>
                <p className='text-sm font-medium'>Response time</p>
                <p className='text-xs text-gray-400'>Usually within 24 hours</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}

export default HelpDesk
