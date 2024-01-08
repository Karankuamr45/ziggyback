import mongoose from "mongoose";

const itemsSchema=mongoose.Schema({
    name:String,
    price:Number,
    image:String
})

const itemsModel=mongoose.model("Item",itemsSchema);
export default itemsModel;