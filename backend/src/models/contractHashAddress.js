const mongoose = require("mongoose");

const contractSchema = new mongoose.Schema({
  contractHashAddress: {
    type: String,
  },
},{ timestamps: true });

module.exports = mongoose.model("ContractHashAddress", contractSchema);
