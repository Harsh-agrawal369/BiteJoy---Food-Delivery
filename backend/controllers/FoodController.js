import {prisma} from "../prisma/index.js"
import fs from "fs";

// Add Food Item

const addFood = async (req, res) => {
  try {
    let image_filename = `${req.file.filename}`;

    const food = await prisma.foodModel.create({
      data: {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename,
      },
    });

    if (food) {
      res.json({ success: true, mess: "Food Added" });
    } else {
      res.json({ success: false, mess: "Internal Server Error" });
    }
  } catch (err) {
    console.log(err);
    res.json({ success: false, mess: "Internal Server Error" });
  }
};

export { addFood };
