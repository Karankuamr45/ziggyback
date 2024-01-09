import itemsModel from "../models/itemsSchema.js";
import restaurantModel from "../models/restaurantSchema.js";

const homeController=(req,res)=>{
    res.send("hello Ziggy with mvc module")
}

const addRestaurantController= async (req, res) => {
    try {
      const { name } = req.body;
      const restaurant = new restaurantModel({
         name,
         image: req.file.filename 
        });

      await restaurant.save();

      res.status(201).send(restaurant);
    } catch (error) {
      res.status(500).send(error);
    }
  }



  const getAllRestaurants=async (req, res) => {
    try {
      const restaurants = await restaurantModel.find().populate('items');
      res.send(restaurants);
    } catch (error) {
      res.status(500).send(error);
    }
  }


  const addRestaurantItems=async (req, res) => {
    try {
      const { restaurantId } = req.params;
      const restaurant = await restaurantModel.findById(restaurantId);
  
      if (!restaurant) {
        return res.status(404).send({ message: 'Restaurant not found' });
      }
  
      const { name, price } = req.body;
      const item = new itemsModel({ name, price, image: req.file.filename });
      await item.save();
  
      restaurant.items.push(item);
      await restaurant.save();
  
      res.status(201).send(item);
    } catch (error) {
      res.status(500).send(error);
    }
  }





  export const deleteRestaurant = async (req, res) => {
    const { restaurantId } = req.params;
  
    try {
      // Delete the restaurant
      await restaurantModel.findByIdAndDelete(restaurantId);
  
      // Also delete all items associated with the restaurant
      await itemsModel.deleteMany({ restaurant: restaurantId });
  
      res.status(200).json({ message: 'Restaurant and its items deleted successfully.' });
    } catch (error) {
      console.error('Error deleting restaurant:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  // Controller to delete an item
  export const deleteItem = async (req, res) => {
    const { restaurantId, itemId } = req.params;
  
    try {
      // Delete the item
      await itemsModel.findByIdAndDelete(itemId);
  
      res.status(200).json({ message: 'Item deleted successfully.' });
    } catch (error) {
      console.error('Error deleting item:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

export {addRestaurantController,homeController,getAllRestaurants,addRestaurantItems}