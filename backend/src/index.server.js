const express = require("express");
const app = express();
const env = require("dotenv");
const mongoose = require("mongoose");
const path = require('path');
const cors = require('cors')
const Web3 = require('web3')
const authRoutes = require('./routes/auth')
const adminRoutes = require('../src/routes/admin/auth')
const carRoutes = require('./routes/car')
const initialData = require('./routes/initialData')
const cartRoutes = require('./routes/cart')
const hashRoute = require('./routes/contractHashAddress')
const ABI = require('../../admin/src/Components/ERC20/ERC20Token')


env.config();
app.use(express.json());

mongoose.connect(
  `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.pwstiyg.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`
).then(()=>{
    console.log('Database in Connected')
}).catch(()=>{
    console.log('Error occured in Database');
});
app.use(cors())
app.use('/public',express.static(path.join(__dirname,'uploads')))
app.use('/api',authRoutes)
app.use('/api',adminRoutes)
app.use('/api',carRoutes)
app.use('/api',initialData)
app.use('/api',cartRoutes)
app.use('/api',hashRoute)

app.listen(process.env.PORT, () => {
  console.log(`Server is Running on Port = ${process.env.PORT}`);
});


