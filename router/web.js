import express  from "express";
import multer from 'multer';
import path from 'path';
import { addRestaurantController, addRestaurantItems, getAllRestaurants, homeController } from "../controller/homeController.js";
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

// Route to get all restaurants
router.get('/restaurants',getAllRestaurants);


// Route to add a new item to a restaurant with an image
router.post('/restaurants/:restaurantId/items', upload.single('image'), addRestaurantItems);


export default router;