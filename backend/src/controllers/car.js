const Car = require("../models/car");
const ContractHashAddress = require('../models/contractHashAddress');
const Web3 = require('web3')
const ABI = require('../../../admin/src/Containers/Metamask/solidity/artifacts/src/Containers/Metamask/solidity/contracts/ERC20Token.sol/ERC20Token.json')
 
const web3 = new Web3(new Web3.providers.HttpProvider('https://rpc-mumbai.matic.today'));


// exports.createCar = async (req, res) => {
//   const contractAddress = await ContractHashAddress.findOne({})
//   .sort({ createdAt: -1 })
//   .select("contractHashAddress")
//   .lean();
//   if (!contractAddress) {
//     return res.status(404).json({ message: "Address not found" });
//   }
//   res.status(200).json({ address: contractAddress.contractHashAddress });
//   const contract = new web3.eth.Contract(ABI, contractAddress.contractHashAddress);
//   const {
//     name,model,company,country,color,engine,feulType,totalPrice,tokenPrice,noOfSeats,noOfDoors,description,createdBy} = req.body;
//   let carPictures = [];
//   if (req.files.length > 0) {
//     carPictures = req.files.map((file) => {
//       return { img: file.filename };
//     });
//   }
//   const totalSupply = await contract.methods.totalSupply().call();
//   const contractHash = contract.options.address;
//   const car = new Car({name,model,company,country,color,engine,feulType,tokenPrice,totalPrice,carPictures,
//     noOfSeats,noOfDoors,description,totalSupply,contractHash
//     // createdBy: req.user._id,
//   });

//   car.save((error, car) => {
//     if (error) return res.status(400).json({ error });
//     if (car) {
//       res.status(201).json({ car });
//     }
//   });
// };
exports.createCar = async (req, res) => {
  try {
    const contractAddress = await ContractHashAddress.findOne({})
      .sort({ createdAt: -1 })
      .select("contractHashAddress")
      .lean();
    if (!contractAddress) {
      return res.status(404).json({ message: "Address not found" });
    }
    const contract = new web3.eth.Contract(ABI.abi, contractAddress.contractHashAddress);

    const {
      name, model, company, country, color, engine, feulType, totalPrice,
      tokenPrice, noOfSeats, noOfDoors, description, createdBy
    } = req.body;
    let carPictures = [];
    if (req.files.length > 0) {
      carPictures = req.files.map((file) => {
        return { img: file.filename };
      });
    }
    const totalSupply = await contract.methods.totalSupply().call();
    // const remainingTokens = await web3Token.methods.getRemainingTokens().call();
    const contractHash = contract.options.address;

    const car = new Car({
      name, model, company, country, color, engine, feulType, tokenPrice, totalPrice,
      carPictures, noOfSeats, noOfDoors, description, totalSupply, contractHash, createdBy
    });

    car.save((error, car) => {
      if (error) return res.status(400).json({ error });
      if (car) {
        res.status(201).json({ car });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({error});
  }
};
exports.getCarById = (req, res) => {
  const { carId } = req.params;
  if (carId) {
    Car.findOne({ _id: carId }).exec((error, car) => {
      if (error) return res.status(400).json({ error });
      if (car) {
        res.status(200).json({ car });
      }
    });
  } else {
    return res.status(400).json({ error: "Params required" });
  }
};
