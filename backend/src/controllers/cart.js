const Cart = require('../models/cart')

function runUpdate(condition,updateData){
    return new Promise((resolve,reject)=>{
        Cart.findOneAndUpdate(condition,updateData)
        .then((result)=>resolve())
        .catch((err)=>reject(err))
    })
}

exports.addItemToCart = (req,res) => {
    Cart.findOne({user: req.user._id}).exec((error,cart)=>{
        if (error) return res.status(400).json({ error });
        if (cart){
            let promiseArray = [];
            req.body.cartItems.forEach((cartItem)=>{
                const car = cartItem.car;
                const item = cart.cartItems.find((c)=>c.car == car);
                let condition,update;
                if(item){
                    condition = {user:req.user._id,"cartItems.product":car};
                    update={
                        "$set":{
                            "cartItems.$":cartItem,
                        }
                    }
                }else{
                    condition = { user: req.user._id };
                    update = {
                    "$push": {
                        "cartItems": cartItem,
                    },
                    };
                }
                promiseArray.push(runUpdate(condition,update))
            })
            Promise.all(promiseArray)
            .then((response)=>res.status(201).json({response}))
            .catch((error)=>res.status(400).json({error}))
        }else{
            const cart = new Cart({
                user: req.user._id,
                cartItems:req.body.cartItems,
            })
            cart.save((error,cart)=>{
                if(error) return res.status(400).json({error})
                if (cart){
                    return res.status(201).json({cart})
                }
            })
        }
    })
}

exports.getCartItems = (req,res) => {
    Cart.findOne({user:req.user._id})
    .populate("cartItems.car","_id name totalPrice tokenPrice carPictures")
    .exec((error,cart)=>{
        if (error) return res.status(400).json({ error: error.message});
        if (cart){
            let cartItems={};
            cart.cartItems.forEach((item,index)=>{
                cartItems[item.car._id.toString()] = {
                    _id: item.car._id.toString(),
                    name: item.car.name,
                    totalPrice: item.car.totalPrice,
                    tokenPrice: item.car.tokenPrice,
                    qty: item.quantity,
                    img: item.car.carPictures[0].img,
                }
            })
            res.status(200).json({cartItems})
        }
    })
}


exports.removeCartItems = (req, res) => {
    const { carId } = req.body.payload;
    if (carId) {
      Cart.update(
        { user: req.user._id },
        {
          $pull: {
            cartItems: {
              car: carId,
            },
          },
        }
      ).exec((error, result) => {
        if (error) return res.status(400).json({ error });
        if (result) {
          res.status(202).json({ result });
        }
      });
    }
  };