import mongoose from "mongoose";

const restaurantSchema=mongoose.Schema({
    name:String,
    items:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Item"
    }],
    image:String
})

const restaurantModel=mongoose.model('Restaurant',restaurantSchema);
export default restaurantModel;