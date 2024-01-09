import mongoose from "mongoose";

const restaurantSchema=mongoose.Schema({
    name:String,
    items:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Item"
    }],
    image:String,
    description: {
        type: String, // Added description field
        required: true,
      },
    ratings: {
        type: Number, // Added ratings field
        default: 0,
      },
})

const restaurantModel=mongoose.model('Restaurant',restaurantSchema);
export default restaurantModel;