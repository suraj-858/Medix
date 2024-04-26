import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../api/axios"
import { cartInitialProps, cartItemProps } from "../../Types/authType";

const initialCartSliceStarter: cartInitialProps = {
    isLoading: false,
    cartData: [],
    userCart: [],
    totalPrice: 0,
    totalQuantity: 0,
    isError: false
}

export const getUserCart = createAsyncThunk('getUserCart', async (userId: string) => {

    return await axios.get(`/cart/get_cart/${userId}`).then(response => response?.data)
        .catch(error => error)
})

export const createCartSlice = createSlice({

    name: 'createCart',
    initialState: initialCartSliceStarter,
    reducers: {
        addToCart: (state, action) =>{
                let find = state.userCart.findIndex((item:cartItemProps) => item?.productId === action.payload.productId)
                if(find >= 0){
                    state.userCart[find].productQuantity+= 1;
                }else{
                    state.userCart.push(action.payload)
                }
        },
        
        getCartTotal: (state)=>{

            let {totalPrice, totalQuantity} = state.userCart.reduce(
                (cartTotal, cartItem) =>{
                    const {productQuantity, productPrice} = cartItem
                    const itemTotal = parseInt(productPrice) * productQuantity
                    cartTotal.totalPrice += itemTotal
                    cartTotal.totalQuantity += productQuantity
                    return cartTotal
                }
                , {
                    totalPrice: 0,
                    totalQuantity: 0
                }
            );
            state.totalPrice = parseInt(totalPrice.toFixed(2));
            state.totalQuantity = totalQuantity
        }, 

        updateQuantity: (state, action) =>{
            let find = state.userCart.findIndex(product => product?.productId === action?.payload?.productId)
            if(find >= 0){
                state.userCart[find].productQuantity = action.payload.productQuantity;
            }
            
        }, 
        removeCart: (state, action) =>{
                state.userCart = state.userCart.filter((cart) => cart._id !== action.payload._id)
        }

    },
    
    extraReducers: (builders) => {

        builders.addCase(getUserCart.pending, (state) =>{
            state.isLoading = true
            console.log(state.isLoading);
            
        })

        builders.addCase(getUserCart.fulfilled, (state, action) =>{
            state.isLoading = false
            state.userCart = action.payload?.response[0]?.productDetails
        })

        builders.addCase(getUserCart.rejected, (state) =>{
            state.isError = false
        })
    }

})


export const {addToCart, getCartTotal, updateQuantity, removeCart} = createCartSlice.actions