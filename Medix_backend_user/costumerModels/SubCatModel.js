const mongoose = require('mongoose')

const subCatSchema = new mongoose.Schema({

    category:{
        type: mongoose.Schema.ObjectId,
        require: true,
    }, 
    name:{
        type: String, 
        require: true
    }, 
    products:[{
        productId:{
            type: mongoose.Schema.ObjectId,
            require:true
        },
        productName:{
            type: String,
            require: true
        }
    }],
    createdAt:{
        type: Date, 
        default: Date.now()
    }

})
module.exports = mongoose.model('SubCategory', subCatSchema)