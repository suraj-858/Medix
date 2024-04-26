import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { categoryModel, subCategoryModel } from '../dataType';
import axios from '../../api/axios';

//slicer to fetch data for main category
export interface categoryType {
  isLoading: boolean,
  categoryData: categoryModel[],
  userCategory: categoryModel[],
  subCategoryData: subCategoryModel[],
  userSubCategory: subCategoryModel[];
  isError: boolean
}

const subCatInitialState: categoryType = {
  isLoading: false,
  categoryData: [],
  userCategory:[],
  subCategoryData: [],
  userSubCategory: [],
  isError: false
}

export const fetchCategory = createAsyncThunk('fetchCategory', async () => {

  try {
    const response = await axios.get('/category/get_category')
    if (response) {
      return await response?.data?.categoryResponse
    }

  } catch (error) {
    return await error
  }
})

export const fetchSubCategory = createAsyncThunk('fetchSubCategory', async (categoryId: string) => {

  try {
    const response = await axios.get(`/category/get_sub_category/${categoryId}`)
    if (response) {
      console.log(response);
      return await response?.data?.subcategoryResponse
    }

  } catch (error) {
    return await error

  }
})


export const categorySlice = createSlice({
  name: "category",
  initialState:subCatInitialState,
  reducers: {
    CategoryHolder: (state) =>{
      state.userCategory = state.categoryData
    }, 
    subCategoryHolder: (state) =>{
      state.userSubCategory = state.subCategoryData
    }
  },
  extraReducers: (builders) => {
    builders.addCase(fetchCategory.pending, (state) => {
      state.isLoading = true
    })

    builders.addCase(fetchCategory.fulfilled, (state, action) => {
      state.categoryData = action.payload
      state.isLoading = false
    })

    builders.addCase(fetchCategory.rejected, (state) => {
      state.isError = true
    })

    builders.addCase(fetchSubCategory.pending, (state) => {
      state.isLoading = true
    })

    builders.addCase(fetchSubCategory.fulfilled, (state, action) => {
      state.subCategoryData = action.payload
      state.isLoading = false
    })

    builders.addCase(fetchSubCategory.rejected, (state) => {
      state.isError = true
    })
  }

});

//slicer to remove category

export interface removeCategoryType {
  isloading: boolean,
  removeData: {
    response:{},
    message: string
  },
  isError: boolean
}

const removeCategoryState: removeCategoryType = {
  isloading: false,
  removeData: {
    response:{},
    message:""
  },
  isError: false
}


export const removeCategory = createAsyncThunk('fetchSubCategory', async (categoryId: string) => {

  try {
    const response = await axios.delete(`/category/delete_category/${categoryId}`)
    if (response) {
      console.log(response);
      return await response?.data
    }

  } catch (error) {
    return await error

  }
})

export const removeCategorySlice = createSlice({
  name: 'removeCategory',
  initialState: removeCategoryState,
  reducers: {},
  extraReducers: (builders) => {
    builders.addCase(removeCategory.pending, (state) => {
      state.isloading = true
    })

    builders.addCase(removeCategory.fulfilled, (state, action) => {
      state.removeData = action.payload
      state.isloading = false
    })

    builders.addCase(removeCategory.rejected, (state) => {
      state.isError = true
    })
  }
})


export  const {CategoryHolder, subCategoryHolder} = categorySlice.actions