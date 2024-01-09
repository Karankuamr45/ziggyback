import express  from "express";
import multer from 'multer';
import path from 'path';
import { addRestaurantController, addRestaurantItems, deleteItem, deleteRestaurant, getAllRestaurants, homeController } from "../controller/homeController.js";
const router=express.Router();

// for image  

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(process.cwd(),'/public/uploads/'))
    },
    filename: function (req, file, cb) {
      const file_filename = Date.now() + '-' + file.originalname
      cb(null, file_filename)
    }
  })
  
  const upload = multer({ storage: storage })

  // end for image

router.get('/',homeController)

// Route to add a new restaurant with an image
router.post('/restaurants', upload.single('image'),addRestaurantController);

// Route to delete a restaurant
router.delete('/restaurants/:restaurantId', deleteRestaurant);

// Route to get all restaurants
router.get('/restaurants',getAllRestaurants);


// Route to add a new item to a restaurant with an image
router.post('/restaurants/:restaurantId/items', upload.single('image'), addRestaurantItems);


// Route to delete an item
router.delete('/restaurants/:restaurantId/items/:itemId', deleteItem);



export default router;