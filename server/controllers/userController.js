import { clerkClient } from "@clerk/express";
import Booking from "../models/booking.js";
import Event from "../models/Event.js";

//API CONTROLLER FUNCTIONS TO GET USER BOOKINGS
export const getUserBookings = async (req, res)=>{
    try{
         const user = req.auth().userId;

         const bookings = await Booking.find({user}).populate('event').sort({createdAt: -1})

         res.json({success:true, bookings})
    }catch(error){
    console.error(error.message);
    res.json({success: false, message: error.message});
     }
}

//API CONTROLLER FUNCTION TO UPDATE FAVORITE MOVIE IN CLERK METADATA
export const updateFavorite = async (req, res)=>{
try{
    const {eventId} = req.body;
    const userId = req.auth().userId;

    const user = await clerkClient.users.getUser(userId)

    if(!user.privateMetadata.favorites){
        user.privateMetadata.favorites =[]
    }

    if(!user.privateMetadata.favorites.includes(eventId)){
        user.privateMetadata.favorites.push(eventId)
    } else{
        user.privateMetadata.favorites =  user.privateMetadata.favorites.filter(item => item !== eventId)
     }

    await clerkClient.users.updateUserMetadata(userId, {privateMetadata: user.privateMetadata})

    res.json({success: true, message: "Favorite events updated."})

}catch(error){
 console.error(error.message);
 res.json({success: false, message: error.message});
  }
} 

export const getFavorites = async (req, res) =>{
    try{
        const user = await clerkClient.users.getUser(req.auth().userId)
        const favorites = user.privateMetadata.favorites;

        //Get events from database
        const events = await Event.find({_id: {$in: favorites}})

        res.json({success: true, events})
     }catch (error) {
        console.error(error.message);
        res.json({success:false, message: error.message});
    }
}