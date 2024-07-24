import express from "express";
import { addFood } from "../controllers/foodController.js";
import multer from "multer";

const foodRouter = express.Router();

// Image Storage Engine (Middleware)

const storgae = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, callback) => {
    return callback(null, `${Date.now()}${file.originalname}`); // To make the filename unique
  },
});

const upload = multer({storage:storgae})


foodRouter.post("/add", upload.single("image"), addFood);

export default foodRouter;
