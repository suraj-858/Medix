const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({

    customerId: {
        type: mongoose.Schema.ObjectId,
        require: true
    },
    productDetails: [{
            productId: {
                type: mongoose.Schema.ObjectId,
                require: true
            },
            productName: {
                type: String,
                require: true
            },
            productPrice: {
                type: String,
                require: true
            },
            productQuantity: {
                type: Number,
                require: true
            },
            productImage: {
                type: String,
                require: true
            },
            createdAt: {
                type: Date,
                default: Date.now()
            }
        }]
})

module.exports = mongoose.model('Cart', cartSchema)