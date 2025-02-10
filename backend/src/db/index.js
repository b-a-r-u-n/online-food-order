import mongoose from "mongoose"
import { dbName } from "../constant.js";

export const connectDb = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${dbName}`,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            readPreference: 'primary', // Force using the primary node
            serverSelectionTimeoutMS: 5000, // Wait 5 seconds before timing out
          });
        console.log(`MONGO DB connection successfully ${connectionInstance.connection.host}`);
        // const fetched_data = await mongoose.connection.db.collection("menuItems");
        // const data = await fetched_data.find({}).toArray();
        // console.log(data);              
    } catch (error) {
        console.log("MONGO DB Connection Error!!", error);
    }
}