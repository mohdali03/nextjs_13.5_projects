import mongoose from 'mongoose'

let isConnected: boolean = false

export const connecToDatabase = async () => {
    mongoose.set('strictQuery', true)
    if (!process.env.MONGODB_URL) {
        return console.log("MONGODB_URL IS MISSING")
    }
    if (isConnected) {
        return;
    }
    try {
        mongoose.connect(process.env.MONGODB_URL, {
            dbName: "Stackflow"

        })
        isConnected = true;
        console.log('Mongodb is connected');
        
    } catch (error) {
        console.log('MongoDB connection failed', error)


    }
}