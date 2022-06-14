const mongoose = require('mongoose');
const ObjectId=mongoose.Schema.Types.ObjectId
const productSchema = new mongoose.Schema( {
   productName:{
    type: ObjectId,
   },
    name: String,
   catagory: String,
   price: Number
   
}, { timestamps: true });

module.exports = mongoose.module('ptoduct', productSchema)