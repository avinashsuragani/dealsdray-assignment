import mongoose from "mongoose";

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, connectionParams);
        console.log("Connection Successful");
    } catch (error) {
        console.log(error);
        console.log("Could not connect to database");
    }
};

export default connectDB; // Default export
