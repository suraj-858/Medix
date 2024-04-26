const asyncHandler = require('express-async-handler')
const Order = require('../costumerModels/OrderModel')
const Customer = require('../costumerModels/UserModel');

const createOrder = asyncHandler(async (req, res) => {

    try {
        const customerId = req.params.id;
        const { productName, productPrice, productId, quantity, state, deliveryAddress, sellerId } = req.body;

        const orderDetails = {
            ProductName: productName,
            productPrice: productPrice,
            sellerId: sellerId,
            costumerId: customerId,
            productId: productId,
            quantity: quantity,
            state: state,
            deliveryAddress: deliveryAddress
        }
        if (orderDetails) {
            await Order.create(orderDetails).then(response => {
                if (response) {
                    res.status(201).json({ response, message: "Order Placed Successfully" })
                }
            }).catch(error => {
                res.status(400).json({ error, message: "Error Placing order" })
            })
        }

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" })
    }

})

const editOrder = asyncHandler(async (req, res) => {

    try {
        const orderId = req.params.id;
        const { quantity } = req.body;

        if (quantity) {
            await Order.findByIdAndUpdate(orderId, { quantity: quantity }).then(response => {
                if (response) {
                    res.status(200).json({ response, message: "Quantity updated successfully" })
                }
            })
                .catch(error => {
                    res.status(400).json({ error, message: "Error updating quantity" })
                })
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" })
    }

})

const removeOrder = asyncHandler(async (req, res) => {

    try {
        const orderId = req.params.id;

        if (orderId) {
            await Order.findByIdAndDelete({ _id: orderId }).then(response => {
                if (response) res.status(200).json({ response, message: "Order Removed Successfully" })
            }).catch(error => {
                res.status(400).json({ error, message: "Error Removing Order" })
            })
        }

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" })
    }
})

const fetchOrders = asyncHandler(async (req, res) => {

    try {
        const userId = req.params.id;

        const response = await Customer.findById({ _id: userId })
        if (response) {
            await Order.find({ costumerId: userId }).then(response => {
                if (response) {
                    res.status(200).json({ response, message: "Order Successfully Fetched" })
                }
            }).catch(error => {
                res.status(400).json({ error, message: "Error fetching orders" })
            })
        } else {

            await Order.find({ sellerId: userId }).then(response => {
                if (response) {
                    res.status(200).json({ response, message: "Order Successfully Fetched" })
                }
            }).catch(error => {
                res.status(400).json({ error, message: "Error fetching orders" })
            })
        }

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" })

    }
})

module.exports = {
    createOrder,
    editOrder,
    removeOrder,
    fetchOrders
}