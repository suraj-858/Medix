export interface categoryModel {
    _id: string,
    creator:string,
    categoryName:string, 
    subCategory:[{
        subCategoryId:string,
        subCategoryName:string
        
    }],
    createdAt:Date
}[]

export interface subCategoryModel {
    _id: string,
    category: string,
    name: string,
    products:[{
        productId: string,
        productName: string
    }],
    createdAt: Date
}[]

export interface productModel {
    _id: string,
    userId: string, 
    productName: string,
    Price: string,
    Discount: string,
    Category: string,
    Sub_Category: string,
    Composition: string,
    Shipping: string,
    Description: string,
    productImageDetails:{
      ImageURL: string,
      publicId: string
    },
    createdAt:  Date
}[]