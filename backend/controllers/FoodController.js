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
        display: true,
      },
    });

    if (food) {
      res.json({ success: true, message: "Food Added" });
    } else {
      res.json({ success: false, message: "Internal Server Error" });
    }
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "Internal Server Error" });
  }
};


// All food list

const listFood = async (req, res) => {
  try {
    const foods = await prisma.foodModel.findMany();

    const sortedFoodList = foods.sort((a, b) =>
      a.category.localeCompare(b.category)
    );

    res.json({ success: true, data: sortedFoodList });
  } catch (err) {
    console.log("Error fetching food list:", err);
    res.json({ success: false, message: "Internal Server Error" });
  }
};



// Remove Food item

const removeFood = async (req, res) => {  
  try {
    const { id, display } = req.body; // Destructuring the request body to get id and makeAvailable

    const food = await prisma.foodModel.findUnique({
      where: {
        id: id,
      },
    });

    if (!food) {
      return res.json({ success: false, message: "Food item not found" });
    }

    await prisma.foodModel.update({
      where: {
        id: id,
      },
      data: {
        display: display, // Update the display field based on makeAvailable flag
      },
    });

    const actionMessage = display ? "Food made available" : "Food removed";
    res.json({ success: true, message: actionMessage });
    
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "Internal Server Error" });
  }
};

export { addFood, listFood, removeFood };
