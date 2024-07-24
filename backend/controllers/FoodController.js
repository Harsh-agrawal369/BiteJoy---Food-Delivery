import prisma from "../prisma/index.js"
import fs from "fs";

// Add Food Item

const addFood = async (req, res) => {
  try {
    let image_filename = `${req.file.filename}`;

    const food = await prisma.foodModel.create({
      data: {
        name: req.body.name,
        description: req.body.description,
        price: parseInt(req.body.price, 10),
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


// All food list

const listFood = async (req, res) => {
  try {
    const foods = await prisma.foodModel.findMany();
    res.json({ success: true, data: foods });
  } catch (err) { 
    console.log(err);
    res.json({ success: false, mess: "Internal Server Error" });
  }
}


// Remove Food item

const removeFood = async (req, res) => {  
  try {
    const food = await prisma.foodModel.findUnique({
      where: {
        id: req.body.id,
      },
    });

    fs.unlink(`uploads/${food.image}`, async (err) => {});

    await prisma.foodModel.delete({
      where: {
        id: req.body.id,
      },
    });

    res.json({ success: true, mess: "Food Deleted" });
    
  }
  catch (err) {
    console.log(err);
    res.json({ success: false, mess: "Internal Server Error" });
  }

}


export { addFood, listFood, removeFood };
