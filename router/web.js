import express  from "express";
import multer from 'multer';
import path from 'path';
import { addRestaurantController, addRestaurantItems, deleteItem, deleteRestaurant, getAllRestaurants, homeController } from "../controller/homeController.js";
const router=express.Router();
import cloudinary from 'cloudinary';

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: 'dsmg4dxbj',
  api_key: '483718598284622',
  api_secret: 'Fk6BqXdGzmWy0R4lqQbmewNjOec',
});

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
router.post('/restaurants', upload.single('file'),addRestaurantController);

// Route to delete a restaurant
router.delete('/restaurants/:restaurantId', deleteRestaurant);

// Route to get all restaurants
router.get('/restaurants',getAllRestaurants);


// Route to add a new item to a restaurant with an image
router.post('/restaurants/:restaurantId/items', upload.single('file'), addRestaurantItems);


// Route to delete an item
router.delete('/restaurants/:restaurantId/items/:itemId', deleteItem);



export default router;