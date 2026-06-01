import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

// import dns from "dns"

// dns.setServers(["1.1.1.1", "8.8.8.8"])



const connectDB = async () => {
    try {
        
       const conectionInstance =  await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
       console.log(`\n MongoDB connected !! DB Host: ${conectionInstance.connection.host}`)
    } catch (error) {
        console.error('MongoDb connection erroer ', error)
        process.exit(1)
    }
}

export default connectDB