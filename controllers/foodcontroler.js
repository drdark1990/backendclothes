import { response } from "express";
import foodModel from "../models/foodModel.js";
import fs from 'fs'


// add food item

const addFood = async (req, res) => {

    let image_filename = `${req.file.filename}`

    const food = new foodModel({
       name:req.body.name,
       description:req.body.description,
       price:req.body.price,
       category:req.body.category,
       image:image_filename
    })
    try {
        await food.save();
        res.json({sucess:true, message:"Food Added"})
    } catch (error) {
        console.log(error)
        res.json({sucess:false, message:"Error"})

    }
}

const listFood =async(req, res) =>{
    try {
        const foods = await foodModel.find({});
        res.json({sucess:true,data:foods})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}


///after testing array of food list in thnder client
//remove food item

const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    if (!food) {
      return res.status(404).json({ success: false, message: "Food not found" });
    }

    fs.unlink(`uploads/${food.image}`, () => {});

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food Removed" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};



export {addFood, listFood, removeFood} 