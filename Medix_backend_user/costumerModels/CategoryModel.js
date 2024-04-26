const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    
    creator:{
        type: mongoose.Schema.ObjectId,
        require: true
    },
    categoryName:{
        type: String,
        require: true
    },
    subCategory:[{
        subCategoryId:{
            type: mongoose.Schema.ObjectId,
            require: true
        }, 
        subCategoryName:{
            type: String,
            require: true
        }
    }],
    createdAt:{
        type: Date,
        default: Date.now()
    }

})

module.exports = mongoose.model('Category', categorySchema)