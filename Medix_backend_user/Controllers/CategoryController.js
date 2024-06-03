const asyncHandler = require('express-async-handler')
const Category = require('../costumerModels/CategoryModel')
const SubCategory = require('../costumerModels/SubCatModel')


const createCategory = asyncHandler(async (req, res) => {

    try {
        const { catName, creatorId } = req.body;

        const isCatExists = await Category.findOne({ categoryName: catName })
        if (!isCatExists) {
            const categoryDetails = {
                creator: creatorId,
                categoryName: catName
            }

            await Category.create(categoryDetails).then(response => {
                if (response) {
                    res.status(200).json({ response, message: "Category created successfully! now please add Sub-Category" })
                }

            }).catch(error => {
                res.status(400).json({ error, message: "An error Occured :(" })

            })

        } else {
            res.status(409).json({message:"Category already exists."})
        }


    } catch (error) {
        res.status(500).json({ error, message: "Internal Server Error" })

    }

})

const updateCategory = asyncHandler(async (req, res) => {

    try {
        const { updatedName } = req.body;
        const categoryId = req.params.id;

        await Category.findByIdAndUpdate(categoryId, { categoryName: updatedName }).exec().then(response => {
            if (response) {
                res.status(200).json({ response, message: "Category name updated successfully" });
            }
        }).catch(error => {
            res.status(400).json({ error, message: "Error updating category name" })
        })

    } catch (error) {
        res.status(500).json({ error, message: "Internal Server Error" })

    }

})

const removeCategory = asyncHandler(async (req, res) => {

    try {
        const categoryId = req.params.id;

        await Category.findByIdAndDelete({ _id: categoryId }).then(response => {
            if (response) {
                res.status(200).json({ response, message: "Category removed successfully" })
            }
        }).catch(error => {
            res.status(400).json({ error, message: "Error occured while removing" })
        })


    } catch (error) {
        res.status(500).json({ error, message: "Internal Server Error" })

    }
})


//sub category section

const createSubCategory = asyncHandler(async (req, res) => {

    try {
        const { subCatName } = req.body
        const categoryId = req.params.id;

        const isExists = await SubCategory.findOne({ name: subCatName })
        if (!isExists) {

            const subCategoryDetails = {
                category: categoryId,
                name: subCatName
            }
            const subCatResponse = await SubCategory.create(subCategoryDetails)
            if (subCatResponse) {
                console.log(subCatResponse._id)
                const updateSubCat = {
                        subCategoryName: subCatName,
                        subCategoryId: subCatResponse?._id
                }

                await Category.findByIdAndUpdate(categoryId, {$push:{subCategory: updateSubCat}}, {new: true}).then(response => {
                    if (response) {
                        res.status(201).json({ subCatResponse, message: "Sub category added successfully" })
                    }
                }).catch(error => {
                    res.status(400).json({ error, message: "Error occured creating sub category" })
                })
            }
            else {
                res.status(401).json({ response, message: "unknown error" })
            }
        } else {
            res.status(409).json({message:"Category already exists"})
        }
    } catch (error) {
        res.status(500).json({ error, message: "Internal Server Error" })

    }
})

const updateSubCategory = asyncHandler(async (req, res) => {

    try {
        const {categoryId, updatedName} = req.body;
        const subCategoryId = req.params.id;

        const isUpdatedSubCatName = await SubCategory.findByIdAndUpdate(subCategoryId, {name: updatedName}).exec();

        if(isUpdatedSubCatName){
 
            await Category.updateOne({_id: categoryId, 'subCategory.subCategoryId': subCategoryId}, {"$set":{'subCategory.$.subCategoryName':updatedName}}, {new: true})
            .then(response =>{
                if(response){
                    res.status(200).json({response, message:"Sub category updated"})
                }
            }).catch(error =>{
                res.status(400).json({error, message:"Error occured while updating"})
            })
        }
        else{
            res.status(400).send("Unknown error occured")
        }

    } catch (error) {
        res.status(500).json({ error, message: "Internal Server Error" })

    }


})

const addProduct = asyncHandler(async () => {

    try {

    } catch (error) {
        res.status(500).json({ error, message: "Internal Server Error" })

    }

})

const removeProduct = asyncHandler(async () => {

    try {

    } catch (error) {
        res.status(500).json({ error, message: "Internal Server Error"})

    }

})

const removeSubCategory = asyncHandler(async (req, res) => {

    try {
        const subCatId = req.params.id;
        const subCatDeletedResponse = await SubCategory.findByIdAndDelete({_id: subCatId})
        console.log(subCatDeletedResponse);
        if(subCatDeletedResponse){
            await Category.findOneAndUpdate(
                { "subCategory.subCategoryId": subCatId },
                { "$pull": { "subCategory": { "subCategoryId": subCatId } } },
                { new: true })
            .then(response =>{
                console.log(response);
                res.status(200).send(response)
            })
            .catch(error =>{
                res.status(400).send(error)
                console.log(error);
            })
        }else{
            res.status(404).send("Sub category doesn't exists")
        }

    } catch (error) {
        res.status(500).json({ error, message: "Internal Server Error" })

    }

})

const getAllCategory = asyncHandler(async(req, res) =>{

    try {
        const categoryResponse = await Category.find();

        if(categoryResponse){
            res.status(200).json({categoryResponse, message:"Categories fetched successfully"})
        }else{
            res.status(400).send("Cannot find category")
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error, message:"Internal Server Error"})
        
    }
})

const getAllSubCategory = asyncHandler(async(req, res) =>{

    try {
        const categoryId = req.params.id;
        
        const subcategoryResponse = await SubCategory.find({category:categoryId});
        if(subcategoryResponse){
            res.status(200).json({subcategoryResponse, message:"subcategories fetched successfully"})
        }else{
            res.status(400).send("Cannot find category")
        }
        
    } catch (error) {
        res.status(500).json({error, message:"Internal Server Error"})
        
    }
})

module.exports = {

    createCategory,
    updateCategory,
    addProduct,
    removeProduct,
    removeCategory,
    removeSubCategory,
    updateCategory,
    updateSubCategory,
    createSubCategory,
    getAllCategory,
    getAllSubCategory
}


