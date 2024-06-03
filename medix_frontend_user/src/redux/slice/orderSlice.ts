import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../api/axios"
import { recentOrderTypes } from "../../Types/authType"

type initialPropType = {
    isLoading: boolean,
    orderData: recentOrderTypes[],
    orderCart: recentOrderTypes[],
    recentOrder: recentOrderTypes[],
    isError: boolean
}

const initialState: initialPropType = {
    isLoading: false,
    orderData: [],
    orderCart: [],
    recentOrder: [],
    isError: false
}

export const fetchOrder = createAsyncThunk('fetchOrder', async (costumerId: string) => {
    return await axios.get(`/order/fetch_orders/${costumerId}`)
        .then(response => response?.data)
        .catch(error => error)
})

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        fetchOrders: (state) => {
            state.orderCart = state.orderData
        },

        addRecentOrder: (state, action) => {     
            state.recentOrder.push({
                ...action.payload,       
                createdAt: new Date(action.payload.createdAt).toISOString()
            })
        },

        removeRecentProduct: (state, action) => {
            state.recentOrder = state.recentOrder.filter((order) => order._id !== action.payload)
            
        }
    },

    extraReducers: (builders) => {
        builders.addCase(fetchOrder.pending, (state) => {
            state.isLoading = true;
        })

        builders.addCase(fetchOrder.fulfilled, (state, action) => {
            state.isLoading = false;
            state.orderData = action.payload.response;
            const filteredRecentOrder = state.orderData.filter((order) => order.state === "In Process");
            state.recentOrder = filteredRecentOrder;
        })

        builders.addCase(fetchOrder.rejected, (state) => {
            state.isError = false
        })
    }

})

export const { fetchOrders, addRecentOrder, removeRecentProduct } = orderSlice.actions;