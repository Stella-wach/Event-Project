import { ChartLineIcon, Coins, PlayCircleIcon, StarIcon, UsersIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { dummyDashboardData } from '../../assets/assets';
import Title from '../../components/admin/Title';
import BlurCircle from '../../components/BlurCircle';
import { dateFormat } from '../../library/dateFormat';
import Loading from '../../components/Loading';


const Dashboard = () => {

    const currency = import.meta.env.VITE_CURRENCY

    const [dashboardData, setDashboardData] = useState({

        totalBookings: 0,
        totalRevenue: 0,
        activeEvents: [],
        totalUsers: 0
    });

    const [loading, setLoading] = useState(true);

    const dashboardCards = [
        {title: "Total Bookings", value: dashboardData.totalBookings || "0", icon: ChartLineIcon},
        {title: "Total Revenue", value: (currency + " " + dashboardData.totalRevenue) || "0", icon: Coins},
        {title: "Active Events", value: dashboardData.activeEvents.length || "0", icon: PlayCircleIcon},
        {title: "Total Users", value: dashboardData.totalUsers || "0", icon: UsersIcon},
        
    ]

    const fetchDashboardData = async () => {
        setDashboardData(dummyDashboardData)
        setLoading(false)
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);
    

return !loading ? (
    <>
     <Title  text1= "Admin" text2="Dashboard"/> 
     <BlurCircle top='-100px' left='0'/>
        
       <div className="relative flex flex-wrap gap-4 mt-6">

    {dashboardCards.map((card,index) => (
       <div key={index}  className="flex items-center justify-between px-4 py-3 bg-primary/10 border border-primary/20 rounded-md max-w-50 w-full">
 
        <div>
            <h1 className='text-sm'>{card.title}</h1>
            <p className='text-xl font-medium mt-1'>{card.value}</p>
        </div>
        <card.icon className='w-6 h-6'/>
       </div>

    ))}

       </div>
    
    <p className=' mt-10 text-lg font-medium'>Active Events</p>
    <div className='relative flex flex-wrap gap-6 mt-4 max-w-5xl' >
        <BlurCircle top='100px' left='-10%' />

        {dashboardData.activeEvents.map((event) => (
            <div key ={event._id} className='w-55 rounded-lg overflpw-hidden h-full pb-3 bg-primary/10 border border-primary/20 hover:-translate-y-1 transition duration-300'>

                <img src={event.event.poster_path} alt="" className='h-60 w-full object-cover' />

                <p className='font-medium p-2 truncate'>{event.event.title}</p>

                <div className='flex items-center justify-between px-2'>
                    

                <div className='text-sm text-gray-500'>
  {Object.entries(event.ticketTypes || {}).map(([type, count]) => (
    <p key={type} className='capitalize'>{type}: {count}</p>
  ))}
</div>


                <p className='flex items-center gap-1 text-sm text-gray-400 mt-1 pr-1'>

                    <StarIcon className='w-4 h-4 text-primary fill-primary' />
                    {event.event.rating.toFixed(1)}
                </p>
                </div>

                <p className='px-2 pt-2 text-sm text-gray-500'>{ dateFormat(event.eventDateTime)}</p>

            </div>
        ))}

    </div>

    </>
  ) : <Loading />
}

export default Dashboard
