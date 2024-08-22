const Product = require('../costumerModels/ProductModel');
const asyncHandler = require('express-async-handler')
const dotenv = require('dotenv');
const cloudinary = require('cloudinary').v2
const fs = require('fs');

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const createProduct = asyncHandler( async(req, res) =>{

    try {
        const {
            productName, 
            price, 
            discount, 
            category, 
            subCategory, 
            composition, 
            shipping, 
            description } = req.body;

        const productImage = req.file;

        const photoUrl = await cloudinary.uploader.upload(productImage.path, {secure: true});

        if( photoUrl && photoUrl?.api_key === process.env.CLOUDINARY_API_KEY){
            fs.unlink(productImage.path, (err) =>{
                if(err) throw err
                console.log(productImage.path, "was deleted")
            })
        }

        const productDetails = {
            userId: req.params.id, 
            productName: productName, 
            Price: price, 
            Discount: discount,  
            Category: category, 
            Sub_Category: subCategory,
            Composition: composition, 
            Shipping: shipping, 
            Description: description,
            productImageDetails:{
                ImageURL: photoUrl.secure_url,
                publicId:photoUrl.public_id

            },
        }
        

        await Product.create(productDetails).then(response =>{

            res.status(200).json({response, message:"Product created successfully"})
        }).catch(err =>{
            res.status(401).json({err, message:"Error creating product"})
        })

        
    } catch (error) {
        res.status(500).json({message:"Internal server error"});
        console.log(error);
        throw error;
        
    }
})

const updateProduct = asyncHandler(async(req, res) =>{

    try {
        const {productName,
               price,
               discount,
               category,
               subCategory, 
               composition, 
               shipping, 
               description } = req.body;


        const productId = req.params.id;
        const productImage = req.file;
        var isImageUpdated = false;

        const response = await Product.findById(productId)

        if(response){

            if(productImage){

                const publicId = response?.productImageDetails?.publicId;

                const photoUrl = await cloudinary.uploader.upload(productImage.path,
                    {public_id: publicId, secure: true, overwrite: true}, (error, result) =>{
                        
                        if(error){
                            res.status(400).json({error, message:"Error updating Image"})
                            throw error
                        }
                        if(result){
                            isImageUpdated = true;
                        }
                    });
    
                    console.log(photoUrl);
                if( photoUrl && photoUrl?.api_key === process.env.CLOUDINARY_API_KEY){
    
                    fs.unlink(productImage.path, (err) =>{
                        if(err) throw err
                        console.log(productImage.path, "was deleted")
                    })
                }
            }
           
            const productDetails = {
                productName: productName, 
                Price: price, 
                Discount: discount,  
                Category: category, 
                Sub_Category: subCategory,
                Composition: composition, 
                Shipping: shipping, 
                Description: description,

            }
            await Product.findByIdAndUpdate(productId, productDetails ).then(response =>{

                res.status(200).json({response, isImageUpdated, message:"Product updated successfully"})
            })
            .catch(err =>{  
                res.status(401).json({err, message:"Error Updating Products"})
            })
            
        }
        
    } catch (error) {
        res.status(500).json({error, message:"Internal Server Error"})
        throw error;
        
    }
})

const getCreatorsProducts = asyncHandler(async(req, res) =>{

    try {
        const userId = req.params.id;

        await Product.find({userId: userId}).sort({createdAt: -1}).then(response =>{
            res.status(200).json({response})
        }).catch(error =>{
            res.status(401).json({error, message:"Error fetching products"})
        })
        
    } catch (error) {
        res.status(500).json({error, message:"Internal Server Error"});
    }
})

const getAllProducts = asyncHandler(async(req, res) =>{

    try {
        await Product.find({}).sort({createdAt: -1}).then(response =>{
            res.status(200).json({response, messsage:"All product fetched successfully"})

        }).catch(error =>{
            res.status(400).json({error, message:"Error fetching products"})
        })
        
    } catch (error) {
        res.status(500).json({error, message: "Internal Server Error"})
        
    }
})

const getLatestProducts = asyncHandler(async(req, res) =>{

    try {
        const lastIndex = req.query.lastIndex ? parseInt(req.query.lastIndex) : 0;
        const totalIndexLength = (await Product.find({})).length
        if(lastIndex < totalIndexLength){
            const products = await Product.find({})
            .sort({ createdAt: -1 })
            .skip(lastIndex)
            .limit(8);

        if(products){
            const nextIndex = lastIndex + products.length;
            res.status(200).json({ products, nextIndex });
        }

        }else{
            res.status(204).json({indexFull: true, message:"No Products to show"})
        }

    } catch (error) {

        console.error('Error fetching latest products:', error);
        res.status(500).json({ error: 'Internal server error' });
        
    }
})

const searchProducts = asyncHandler(async(req, res) =>{
    try {
        const query = req.query.value;
        console.log(query);

        if(query){
            const regex = new RegExp(query, 'i');
            await Product.find({
                $or: [
                    { productName: regex },
                    { Price: regex },
                    { Discount: regex },
                    { Category: regex },
                    { Sub_Category: regex },
                    { Composition: regex },
                    { Shipping: regex },
                    { Description: regex }
                ]
            }).then(response =>{
                res.status(200).json({response, message:"Search Item Found"})
            })
            .catch(error =>{
                res.status(204).json({error, messge:"No product available"})
            })
        }
        
    } catch (error) {
        res.status(500).json({error, message:"Invalid Server Error"})
        
    }
})

const removeProducts = asyncHandler(async(req, res) =>{
    try {
        const productId = req.params.id;
        
        if(productId){
            await Product.findByIdAndDelete({_id: productId})
            .then(response =>{
                res.status(200).json({response, message: "Product removed successfully"})
            }).catch(error =>{
                res.status(400).json({error, message: "Cannot remove error message"})
            })
        }
        
    } catch (error) {
        res.status(500).json({error, message:"Invalid Server Error"})
    }
})
module.exports = {
    createProduct, 
    updateProduct,
    getCreatorsProducts, 
    getAllProducts, 
    getLatestProducts, 
    searchProducts,
    removeProducts
}