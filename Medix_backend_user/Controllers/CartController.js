const asyncHandler = require('express-async-handler')
const Cart = require('../costumerModels/CartModel');
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId


const createCart = asyncHandler(async(req, res) =>{

    try {
        const customerId = req.params.id;
        const {productId, productName, productPrice,  productQuantity, productImage } = req.body;

        const response = await Cart.find({customerId: customerId})

        const productDetails = {
            productId: productId,
            productName: productName,
            productPrice: productPrice,
            productQuantity: productQuantity,
            productImage: productImage

        } 

        if(response.length === 0){
            await Cart.create({customerId: customerId, productDetails: [productDetails]}, {new: true})
            .then(response =>{
                console.log(response);
                res.status(201).json({response, message:"Added to Cart"})
            }).catch(error =>{
                res.status(400).json({error, message:"Error updating cart"})
            })
        }else{
            const index = response[0]?.productDetails.findIndex(product => product?.productId.toString() === productId)
            console.log(index);
            if(index !== -1){
                await Cart.updateOne({customerId: customerId, 'productDetails.productId': productId}, {$inc:{'productDetails.$.productQuantity': 1}})
                .then(response =>{
                    console.log(response);
                    if(response) res.status(200).json({ message:"Cart Quantity updated successfully"})
                }) 
                .catch(error =>{
                    res.status(400).json({error, message:"Error updating cart"})
                })

            }else{
                await Cart.findOneAndUpdate({customerId: customerId}, {$push:{productDetails: productDetails}}, {new: true})
                .then(response =>{
                    res.status(200).json({response, message:"Cart updated successfully"})
                })
                .catch(error =>{
                    res.status(400).json({error, message:"Error updating cart"})
                })
            }
        }
       
       
    } catch (error) { 
        console.log(error);
        res.status(500).json({message: "Internal Server Error"})
        
    }
})

const updateCartQuantity = asyncHandler(async(req, res) =>{

    try {
        const customerId = req.params.id;
        const {productId, productQuantity} = req.body;
        console.log(customerId, productId, productQuantity);
        const response = await Cart.find({customerId: customerId})

        if(response.length >= 1){
            const find = response[0]?.productDetails.findIndex(product => product.productId.toString() === productId)
            console.log(find);
            if(find !== -1){
                await Cart.updateOne({customerId: customerId, 'productDetails.productId': productId}, {$set:{'productDetails.$.productQuantity': productQuantity}}, {new: true})
                .then(async(response) =>{
                   response && await Cart.find({customerId}).then(response =>{
                        if(response) res.status(200).json({response,  message:"Cart Quantity updated successfully"})
                    }).catch(error => res.status(400).json({error, message:"Cannot update cart Quantity"}))
                }) 
                .catch(error =>{
                    res.status(400).json({error, message:"Error updating cart"})
                })
            }else{
                res.status(400).json({message:"Cart Item not found"})
            }
        }
        
    } catch (error) {
        res.status(500).json({error, message: "Internal Server Error"})
    }
})

const removeCart = asyncHandler(async(req, res) =>{

    try {
        const cartId = req.params.id;
        const {cartItemId} = req.body;

        if(cartId && cartItemId){
            await Cart.findOneAndUpdate({customerId: cartId}, {$pull:{productDetails:{_id: cartItemId}}}, {new: true})
            .then(response =>{
                res.status(200).json({response, message:"Cart Item removed Successfully"})
            }).catch(error =>{
                res.status(401).json({error, message:"Error removing Cart Item"})
            })
        }else{
            res.status(400).json({message:"Invalid cart Item"})
        }
       

    } catch (error) {
        console.log(error);
        res.status(500).json({error, message: "Internal Server Error"})

    }
})

const fetchUserCart = asyncHandler(async(req, res) =>{

    try {
        const cartId = req.params.id;

        await Cart.find({customerId: cartId})
        .then(response =>{
            res.status(200).json({response, message:"Fetched cart successfully"})
        }).catch(error =>{
            res.status(400).json({error, message:"Error fetching cart"})
        })
        
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"})
    }
})

module.exports = {
    createCart,
    removeCart,
    fetchUserCart, 
    updateCartQuantity
}