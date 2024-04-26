const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({

    userId:{
        type: mongoose.Schema.ObjectId,
        require: true
        
    },
    productName:{
        type: String, 
        required: true

    },
    Price:{
        type: String, 
        required: true


    }, 
    Discount:{
        type: String, 
        required: true

    },
    Category:{
        type: String, 
        required: true

    }, 
    Sub_Category:{
        type: String,
        required: true

    }, 

    Composition:{
        type: String, 
        required: true

    },
    Shipping:{
        type: String, 
        required: true

    }, 
    Description:{
        type: String, 
        required: true

    }, 
    productImageDetails:{
        
        ImageURL:{
            type: String,
            required: true
    
        }, 
        publicId:{
            type: String, 
            required: true
        }

    }, 
    createdAt:{
        type: Date,
        default: Date.now()
    }
})
module.exports = mongoose.model("Product", productSchema);