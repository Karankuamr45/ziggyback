import mongoose from 'mongoose';


const connectdb=async(DATABASE_URL)=>{
    try {
        const DATABASE_NAME={
            dbName:"ziggyVite"
        }
      await  mongoose.connect(DATABASE_URL,DATABASE_NAME)
      console.log("Database connected of ZiggyVite")
    } catch (error) {
        console.log(error.message)
    }
}

export default connectdb;