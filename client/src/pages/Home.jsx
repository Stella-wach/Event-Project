import React from 'react'
import HeroSection from '../components/HeroSection'
import FeaturedSection from '../components/FeaturedSection'
import EventPreview from '../components/EventPreview'
import PageTransition from '../components/PageTransition'

const Home = () => {
  return (
    <PageTransition>
      <div>
        <HeroSection />
        <FeaturedSection />
        <EventPreview />
      </div>
    </PageTransition>
  )
}

export default Home