import Booking from "../models/booking.js"
import Events from "../models/Event.js"


//API to check if user is admin
export const isAdmin = async(req, res) =>{
    res.json({success:true, isAdmin: true})
}


//API to get dashboard data
export const getDashboardData = async(req, res) =>{
    try{
        const bookings = await Booking.find({isPaid: true});
        const activeEvents = await Events.find({eventDateTime:{$gte: new Date()}}).populate('event');

        const totalUsers = await User.countDocuments();

        const dashboardData ={
            totalBookings: bookings.length,
            totalRevenue: bookings.reduce((acc, booking)=> acc + bookings.amount, 0),
            activeEvents,
            totalUsers
        }

        res.json({success: true, dashboardData})

    }catch(error){
        console.error(error);
        res.json({success:false, message: error.message})

    }
} 

//API TO GET ALL EVENTS

export const getAllEvents = async (req, res) =>{

    try{
        const events = await Event.find({eventDateTime: {$gte: new Date()}}).populate('event').sort({eventDateTime: 1})
        res.json({success: true, events})

    } catch (error) {
        console.error(error);
        res.json({success: false, message: error.message})
    }

}


//API TO GET ALL BOOKINGS
export const getAllBookings = async (req, res) =>{
    try{

        const bookings = await Booking.find({}).populate('user').populate({
            path: "events",
            populate: {path: "event"}
        }).sort({ createdAt: -1 })
        res.json({success:true, bookings })

    } catch(error){
        console.error(error);
        res.json({success: false, message: error.message})
    }
}