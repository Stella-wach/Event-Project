import Booking from '../models/booking.js';
import Event from '../models/Event.js'



//Function to check availability of Tickets for an event

const checkTicketsAvailability = async (eventId, selectedTickets)=>{
    try{
        await Event.findById(eventId)
        if(!eventData) return false;

        const bookedTickets = eventData.bookedTickets;

            const isAnyTicketsbooked = selectedTickets.some(ticket => bookedTickets[ticket]);

            return !isAnyTicketsbooked;

    } catch (error) {
        console.log(error.message);
        return false;
    }

}

export const createBooking = async (req, res)=>{

    try{
        const {userId} = req.auth();
        const {eventId} = req.body;
        const {origin} = req.headers;


    //Check if the ticket is available for the selected show

    const isAvailable = await checkTicketsAvailability(eventId, selectedTickets)

    if(!isAvailable){
        return res.json({success: false, message: "Selected Tickets are not avalable."})
    }

    // Get the events details
    const eventData = await Event.findById(eventId).populate('event');

    //Create a new booking

    const booking = await Booking.create({
        user: userId,
        event: eventId,
        amount: eventData.eventPrice * selectedTickets.length,
        bookedTickets: selectedTickets
    })

    selectedTickets.map((ticket) =>{
        eventData.bookedTickets[ticket]= userId;
    })

    eventData.markModified('bookedTickets');

    await eventData.save();

    // Daraja Gateway Initialize


    res.json({success: true, message: "booked successfully"})

    }catch(error){

        console.log(error.message);
        res.json({success: false, message: error.message})

    }
}


export const getBookedTickets = async (req, res)=>{

    try{

        const {eventId} = req.params;
        const eventData = await Event.findById(eventId)

        const bookedTickets = Object.keys(eventData.bookedTickets)

        res.json({success: true, bookedTickets})

    } catch(error){
        console.log(error.message);
        res.json({success: false, message: error.message})
    }

}