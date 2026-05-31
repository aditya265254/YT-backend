import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";



const connectDB = async () => {
    try {
            console.log(process.env.MONGODB_URI) // yeh add kar
       const conectionInstance =  await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
       console.log(`MongoDB connected !! DB Host: ${conectionInstance.connection.host}`)
    } catch (error) {
        console.error('MongoDb connection erroer ', error)
        process.exit(1)
    }
}

export default connectDB