const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 30,
    },
    model: {
      type: String,
      required: true,
      min: 4,
    },
    company: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 30,
    },
    country: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 30,
    },
    color: {
      type: String,
      required: true,
      trim: true,
    },
    engine: {
      type: String,
      required: true,
    },
    noOfSeats:{
      type:String,
      required:true
    },
    noOfDoors:{
      type:String,
      required:true
    },
    description:{
      type:String,
      required:true
    },
    feulType: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: String,
      required: true,
    },
    carPictures: [
      {
        img: {
          type: String,
          required:true
        },
      },
    ],
    tokenPrice: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    //   required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cars", carSchema);
