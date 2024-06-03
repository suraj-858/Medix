import { Dispatch, SetStateAction } from "react";
export type Auth = {
    email: string, 
    password: string,
    roles: number, 
    accessToken: string
  }

export type isProducType = {
  state: boolean, 
  message: string
} 

export type selectedCatIdType = string
export type cartLoading = boolean;
export type selectSubCategoryName = string;
export type isOrderPlacedType = boolean;
  
  export interface UserContextInterface  {
    isOrderPlaced: isOrderPlacedType,
    setIsOrderPlaced: Dispatch<SetStateAction<isOrderPlacedType>>,
    auth: Auth;
    setAuth: Dispatch<SetStateAction<Auth>>
    isProduct: isProducType;
    setIsProduct: Dispatch<SetStateAction<isProducType>>
    selectedCatId: selectedCatIdType,
    setSeletedCatId: Dispatch<SetStateAction<selectedCatIdType>>
    selectSubCategoryName: selectSubCategoryName
    setSelectSubCategoryName: Dispatch<SetStateAction<selectedCatIdType>>
    cartLoading: cartLoading
    setCartLoading: Dispatch<SetStateAction<cartLoading>>
  }

  export type ProductPropsType = {

    orderId:string,
    saleDiscount: string,
    productName: string,
    productCurrentPrice: number,
    productOriginalPrice: number,
    pricePerProduct: string,
    supplierCompany: string,
    stockLeft: number

  }[]
  export interface productArrayPropsType {
    productArray: ProductPropsType
  }
  export type singleProductsType = {
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
    createdAt: Date;
  }

  export type productsType = {
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
    createdAt: Date;
  }[]
 
  export type categoryType = {
    _id: string, 
    creator: string, 
    categoryName: string,
    subCategory:[{
      subCategoryId: string,
      subCategoryName: string
    }],
    createdAt:Date

  }[]

  export type subCategoryType = {
    _id: string, 
    category: string,
    name: string,
    products:[{
      productId: string,
      productName: string
    }],
    createdAt: Date

  }[]

  export type subCategoryItemHolder = {
    subCategoryId: string,
     subCategoryName: string
   }[]

  export type cartItemProps ={
    _id: string,
    productId: string,
    productImage: string,
    productName: string,
    productPrice: string,
    productQuantity: number,
    createdAt: Date
  }

  export type userCartProps = {
    _id: string,
    customerId: string,
    productDetails:[{
      _id: string,
      productId: string,
      productName: string,
      productPrice: string,
      productQuantity: number,
      createdAt: Date
    }]
  }

  export interface cartInitialProps {
    isLoading: boolean,
    cartData: [],
    userCart: cartItemProps[]
    totalQuantity: number;
    totalPrice: number;
    isError: boolean
}

  export type createCartProps = {
    customerId: string,
    state: cartInitialProps

}

//type for recent orders
export type recentOrderTypes = {
  _id: string,
  customerId: string,
  productDetails: [{
      productId: string,
      productName: string,
      productQuantity: number,
      productPrice: number,
      productImage: string
      creatorId: string
  }],
  state: string,
  deliveryAddress: string,
  createdAt: string
}



  