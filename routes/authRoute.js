import express from "express";

 // Import the auth controllers
import {registerController,
        loginController,
        testController,
} from "../controllers/authController.js"

//checking
 import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

 // Import the file controllers
 import {
        uploadFileController,
        listFilesController,
        deleteFileController,
      } from "../controllers/fileController.js"; // Import the file controllers
 //multer 

//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);

//LOGIN 
router.post("/login", loginController);

//test routes
router.get("/test", requireSignIn, isAdmin,  testController);

//upload file
router.post("/upload", requireSignIn, uploadFileController);

//get file
router.get("/files", requireSignIn, listFilesController);

//deleting file
router.delete("/files/:fileId", requireSignIn, deleteFileController);


export default router;