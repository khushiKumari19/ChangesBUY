const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,ref: "User",required:true,
        cartItems:[{
            car:{
                type:mongoose.Schema.Types.ObjectId, ref: "Cars",required:true
            },
            quantity:{
                type: Number,
                default:1
            }
        }]
    }
},{timestamps:true})

module.exports = mongoose.model('Cart',cartSchema);