const mongoose = require('mongoose')

//function for id verification
const isValidId = function(id){
   if(!mongoose.Types.ObjectId.isValid(id)){
    return false
   }return true
}

// function for array value verification
const checkValue = function (value) {
    let arrValue = [];
    value.map((x) => { 
      x= x.trim();
      if (x.length) arrValue.push(x);
    });
    return arrValue.length ? arrValue : false;
  };
  
  //function for converting string into array
  const convertToArray = function (value) {      //[   "   "     ",","","  ]
    if (typeof value == "string") {
      if(value.trim()){
      let newValue = value.trim()
      return [newValue];
      }
    } else if (value?.length > 0) return checkValue(value);
    return false;
  };

  //function for ISBN verification
  const isValidISBN = function(isbn){
    return /^(?=(?:\d\-*){10}(?:(?:\D*\d){3})?$)[\d-]+$/.test(isbn)
  }
  
  //function for book name verification
  const isValidBookTitle = function(name){
    return /^([A-Za-z0-9 .!?\:'()$]{2,70})+$/.test(name)
}

  module.exports = {convertToArray, checkValue, isValidId, isValidISBN, isValidBookTitle}