const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({

    ProductName:{
        type: String,
        required: true
    }, 
    productPrice:{
        type: Number,
        required: true
    },
    sellerId:{
        type: mongoose.Schema.ObjectId,
        required: true
    },
    costumerId:{
        type: mongoose.Schema.ObjectId,
        required: true
    },
    productId:{
        type: mongoose.Schema.ObjectId,
        required: true
    },
    quantity:{
        type: Number,
        required: true
    }, 
    state:{
        type: String,
        required: true
    },
    deliveryAddress:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default:Date.now()
    }
})

module.exports = mongoose.model('Order', orderSchema)