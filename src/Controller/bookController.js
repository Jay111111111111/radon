const {isValidRequest, isValidName, isValid} = require('../Validator/userValidation')
const {} = require('../Validator/bookValidation')
const bookModel = require('../Models/bookModel')

const createBook = async function(req, res){
    try{
        if(!isValidRequest(req.body)){
            return res
            .status(400)
            .send({status:false, message: "Enter a valid Input"})
        }
        let {title, excerpt, userId, ISBN, category,subcategory, releasedAt} = req.body
        let book ={}

        if(title){
            title = title.trim()
            if(!isValidName(title)){
                return res
                        .status(400)
                        .send({status:false, message:"Enter valid title"})
            }
        }else{ return res
                .status(400)
                .send({status:false, message:"Title is required"})
        }

        if(excerpt){
            if(!isValid(excerpt)){
                return res
                        .status(400)
                        .send({status:false, message:"Enter valid excerpt"})
            }else book.excerpt = excerpt.trim()
        }else{ return res
                .status(400)
                .send({status:false, message:"excerpt is required"})
        }

        if(userId){
            book.userId = req.user._id
        }

        if(ISBN == undefined ){
            ISBN = Math.floor(Math.random() * 10000000000000) + 1  
        }
        const isDuplicate = await bookModel.findOne({$or:[{title:title},{ISBN:ISBN}]})
        if(isDuplicate){
            return res
            .status(400)
            .send({status:false, message:"title is already in use"})
        }else if(isDuplicate.ISBN == ISBN){
            book.title = title
            ISBN = Math.floor(Math.random() * 10000000000087) + 1
            book.ISBN = ISBN
        }

        if(category){
            if(!isValid(category)){
                return res
                .status(400)
                .send({status:false, message:"enter a valid category"})
            }else book.category = category.trim()
        }else{
            return res
            .status(400)
            .send({status:false, message:"category is required"})
        }

        if(subcategory){
            subcategoryNew = convertToArray(subcategory)
            if(!subcategoryNew){
                return res
                .status(400)
                .send({status:false, message:"Enter a valid subcategory"})
            }else{
                book.subcategory = subcategoryNew.trim()
            }
        }else{
            return res
            .status(400)
            .send({status:false, message:"subcategory is required"})
        }

        let date = Date.now()
        book.releasedAt = date.getFullYear()+ '-' +( date.getMonth+1) + '-' + date.getDay()

        const newBook = await bookModel.create(book)
        return  res
                .status(201)
                .send({status:false, message:"Success", data: newBook})
    }
    catch(error){
        return res
                .status(500)
                .send({status:false, message: error.message})
    }
}


module.exports = {createBook}