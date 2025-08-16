import React from 'react'
import BlurCircle from './BlurCircle'

const DateSelect = ({dateTime, id}) => {
  return (
    <div id='dateSelect' className='pt-30'>

    <div className='flex flex-col md:flex-row items-center justify-between gap-10 relative p-8 bg-primary/10 border border-primary/20 rounded-lg'>
        <BlurCircle top='100px' left='100px'/>
        <BlurCircle top='100px' left='100px'/>
    </div>
      
    </div>
  )
}

export default DateSelect
