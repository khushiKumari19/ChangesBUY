const Car = require("../models/car");

exports.initialData = async (req,res) => {
    const cars = await Car.find({}).exec((error,cars)=>{
        if (error){
      return res.status(400).json({ message: "Cars Not Found" });
        }else{
            res.status(200).json({
                cars
            })
        }
    })
}