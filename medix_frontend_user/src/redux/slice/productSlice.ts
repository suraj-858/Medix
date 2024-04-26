import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { productModel } from "../dataType"
import { AxiosInstance } from "axios"
import axios from "../../api/axios"

export interface productType {
    isloading : boolean,
    productData: productModel[],
    stableProduct: productModel[],
    isError: boolean,
}

const ProductInitialState: productType ={
    isloading: false, 
    stableProduct: [],
    productData:[],
    isError: false
}
type reduxAllProductProps = {
    userId: string, 
    AxiosPrivate: AxiosInstance
}

export const fetchAllUserProduct = createAsyncThunk('FetchProduct', async ({userId, AxiosPrivate}:reduxAllProductProps) =>{
    
    try {
        const response = await AxiosPrivate.get(`/product/userProducts/${userId}`)
        if(response){
            console.log(response);
            return await response?.data?.response
        }
        
    } catch (error) {
        console.log(error);
        return await error
    }
})

export const productSlice = createSlice({

    name:'Product', 
    initialState: ProductInitialState,
    reducers: {
        allUserProduct: (state) =>{
            state.stableProduct = state.productData
        }
    },
    extraReducers: (builders) =>{
        builders.addCase(fetchAllUserProduct.pending,  (state) =>{
            state.isloading = true
        })

        builders.addCase(fetchAllUserProduct.fulfilled, (state, action) =>{
            state.isloading = false,
            state.productData = action.payload
        })

        builders.addCase(fetchAllUserProduct.rejected, (state) =>{
            state.isError = true
        })
    }
})

//slice for get all products
export const fetchAllProduct = createAsyncThunk('FetchAllProduct', async() =>{

    try {
        const response = await axios.get('/product/get_all_products')
        if(response) return await response?.data?.response
        
    } catch (error) {
        return await error
        
    }
})

export const userProductSlice = createSlice({

    name:'GetProduct',
    initialState: ProductInitialState,
    reducers:{
        allProduct: (state) =>{
            state.stableProduct = state.productData
        }
    },
    extraReducers: (builders) =>{
        builders.addCase(fetchAllProduct.pending, (state) =>{
            state.isloading = true
        })

        builders.addCase(fetchAllProduct.fulfilled, (state, action) =>{
            state.isloading = false
            state.productData = action.payload
        })

        builders.addCase(fetchAllProduct.rejected, (state) =>{
            state.isError = true
        })
    }
})

export const {allUserProduct} = productSlice.actions
export const {allProduct} = userProductSlice.actions
