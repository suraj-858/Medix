import {combineReducers, configureStore} from '@reduxjs/toolkit'
import { categorySlice, removeCategorySlice} from './slice/categorySlice'
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import {  productSlice, userProductSlice } from './slice/productSlice'
import { createCartSlice } from './slice/cartSlice';

const rootReducer = combineReducers({
  category: categorySlice.reducer, 
  removeCategory: removeCategorySlice.reducer, 
  Product: productSlice.reducer,
  GetProduct: userProductSlice.reducer,
  createCart: createCartSlice.reducer


})

 const store = configureStore({ 
    reducer: rootReducer
  })

export default store

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector