import mongoose from 'mongoose';

const connectDB = async () => {
    try{
        mongoose.connection.on('connected', ()=> console.log('Connected to MongoDB successfully'));
        await mongoose.connect(`${process.env.MONGODB_URI}/quickevents`)
    } catch (error) {
console.log(error.message);

    }
}

export default connectDB