import mongoose from "mongoose";

const itemsSchema=mongoose.Schema({
    name:String,
    price:Number,
    image:String,
    description: {
        type: String, // Added description field
      },
      restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
      },
})

const itemsModel=mongoose.model("Item",itemsSchema);
export default itemsModel;