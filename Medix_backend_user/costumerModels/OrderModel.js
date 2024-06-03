const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({

    customerId:{
        type: mongoose.Schema.ObjectId,
        require: true
    },
    productDetails:[{
        productId:{
            type: mongoose.Schema.ObjectId,
            require: true
        },
        productName:{
            type: String,
            require: true
        },
        productQuantity:{
            type: Number,
            require: true
        }, 
        productPrice:{
            type: Number,
            require: true
        },
        productImage:{
            type: String,
            require: true
        }, 
        creatorId:{
            type: mongoose.Schema.ObjectId,
            require: true
        }
    }],
    state:{
        type: String,
        require: true
    },
    deliveryAddress:{
        type: String,
        require: true
    },
    createdAt:{
        type: Date,
        default:Date.now()
    }
})

module.exports = mongoose.model('Order', orderSchema)