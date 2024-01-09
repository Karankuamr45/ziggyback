import itemsModel from "../models/itemsSchema.js";
import restaurantModel from "../models/restaurantSchema.js";
import cloudinary from 'cloudinary';
const { v2 } = cloudinary;





const homeController=(req,res)=>{
    res.send("hello Ziggy with mvc module")
}

const addRestaurantController= async (req, res) => {
    try {
      const result = await v2.uploader.upload(req.file.path);
      

      const restaurant = new restaurantModel({
        name: req.body.name,
        image: result.secure_url,
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

  const addRestaurantItems = async (req, res) => {
    try {
      const { restaurantId } = req.params;
      
      const restaurant = await restaurantModel.findById(restaurantId);
      
  
      if (!restaurant) {
        return res.status(404).send({ message: 'Restaurant not found' });
      
      }
  
  
  
      // Upload the item image to Cloudinary
     
      const result = await v2.uploader.upload(req.file.path);
     
  
      const item = new itemsModel({
        name:req.body.name,
        price:req.body.price,
        image: result.secure_url, // Use the secure_url from Cloudinary
      });

     
  
      await item.save();
      console.log("restaurant.items",restaurant.items)

  
      restaurant.items.push(item);
      console.log("restaurant.items.after.pushing",restaurant.items)
      await restaurant.save();
  
      // Delete the temporary file after Cloudinary upload
      // deleteTempFile(req.file.path);
  
      res.status(201).send(item);
    } catch (error) {
      res.status(500).send(error);
    }
  };
  


  // const addRestaurantItems=async (req, res) => {
  //   try {
  //     const { restaurantId } = req.params;
  //     const restaurant = await restaurantModel.findById(restaurantId);
  
  //     if (!restaurant) {
  //       return res.status(404).send({ message: 'Restaurant not found' });
  //     }
  
  //     const { name, price } = req.body;
  //     const item = new itemsModel({ name, price, image: req.file.filename });
  //     await item.save();
  
  //     restaurant.items.push(item);
  //     await restaurant.save();
  
  //     res.status(201).send(item);
  //   } catch (error) {
  //     res.status(500).send(error);
  //   }
  // }





  // export const deleteRestaurant = async (req, res) => {
  //   const { restaurantId } = req.params;
  
  //   try {
  //     // Delete the restaurant
  //     await restaurantModel.findByIdAndDelete(restaurantId);
  
  //     // Also delete all items associated with the restaurant
  //     await itemsModel.deleteMany({ restaurant: restaurantId });
  
  //     res.status(200).json({ message: 'Restaurant and its items deleted successfully.' });
  //   } catch (error) {
  //     console.error('Error deleting restaurant:', error);
  //     res.status(500).json({ error: 'Internal server error' });
  //   }
  // };
  
  // // Controller to delete an item
  // export const deleteItem = async (req, res) => {
  //   const { restaurantId, itemId } = req.params;
  
  //   try {
  //     // Delete the item
  //     await itemsModel.findByIdAndDelete(itemId);
  
  //     res.status(200).json({ message: 'Item deleted successfully.' });
  //   } catch (error) {
  //     console.error('Error deleting item:', error);
  //     res.status(500).json({ error: 'Internal server error' });
  //   }
  // };

  export const deleteRestaurant = async (req, res) => {
    try {
      // Fetch the restaurant to get the image URL
      const restaurant = await restaurantModel.findById(req.params.restaurantId);
  
      // Delete the restaurant from the database
      await restaurantModel.findByIdAndDelete(req.params.restaurantId);
  
      // Delete the restaurant image from Cloudinary
      await v2.uploader.destroy(getPublicId(restaurant.image));
  
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting restaurant:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  export const deleteItem = async (req, res) => {
    try {
      // Fetch the item to get the image URL
      const item = await itemsModel.findById(req.params.itemId);
  
      // Delete the item from the database
      await itemsModel.findByIdAndDelete(req.params.itemId);
  
      // Delete the item image from Cloudinary
      await v2.uploader.destroy(getPublicId(item.image));
  
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting item:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  const getPublicId = (url) => {
    const startIndex = url.lastIndexOf('/') + 1;
    const endIndex = url.lastIndexOf('.');
    return url.substring(startIndex, endIndex);
  };
  

export {addRestaurantController,homeController,getAllRestaurants,addRestaurantItems}