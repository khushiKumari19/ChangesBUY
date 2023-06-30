const ContractHashAddress = require('../models/contractHashAddress');

exports.createContractHashAddress = (req,res) =>{
    const {contractHashAddress} = req.body;
    const Address = new ContractHashAddress({
        contractHashAddress
    });
    Address.save((error,address)=>{
        if(error) return res.status(400).json({error})
        if(address){
            res.status(201).json({address})
        }
    })
}

// exports.getAddress = async (req,res)=>{
//     const contractAddress = await ContractHashAddress.find({}).sort({createdAt: -1}).limit(1).exec((error,address)=>{
//         if (error){
//           return res.status(400).json({ message: "Address Not Found" });
//             }else{
//                 res.status(200).json({
//                     address:contractAddress.contractHashAddress
//                 })
//             }
//       })
//       console.log(contractAddress)
// }

exports.getAddress = async (req, res) => {
    try {
      const addressData = await ContractHashAddress.findOne({})
        .sort({ createdAt: -1 })
        .select("contractHashAddress")
        .lean();
      if (!addressData) {
        return res.status(404).json({ message: "Address not found" });
      }
      res.status(200).json({ address: addressData.contractHashAddress });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };