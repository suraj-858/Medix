const asyncHandler = require('express-async-handler')
const Order = require('../costumerModels/OrderModel')

const createOrder = asyncHandler(async (req, res) => {

    try {
        const { cartArrayDetails, deliveryAddress } = req.body;

        const orderDetails = {
            customerId: req.params.id,
            productDetails: cartArrayDetails,
            state: "In Process",
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
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" })
    }

})

const updateOrder = asyncHandler(async (req, res) => {

    try {
        const orderId = req.params.id;
        const { state } = req.body;

        if (state) {
            await Order.findByIdAndUpdate(orderId, { state: state }, {new: true}).then(response => {
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
        const userId = req?.params?.id;

        await Order.find({ customerId: userId})
            .then(response => {
                console.log(response);
                res.status(200).json({response, message:"Order fetched successfully"})
            }).catch(error => {
                console.log(error);
                res.status(400).json({ error, message: "Error fetching Order" })
            })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error" })

    }
})

module.exports = {
    createOrder,
    updateOrder,
    removeOrder,
    fetchOrders
}