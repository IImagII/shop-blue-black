import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

//асинхорнный запрос чтобы принимать категории с API
export const getCategories = createAsyncThunk(
   'categories/getCategories',
   async (_, thunkAPI) => {
      try {
         const { data } = await axios.get(
            `https://api.escuelajs.co/api/v1/categories`
         )
         return data
      } catch (error) {
         console.log(error)
         return thunkAPI.rejectWithValue(error)
      }
   }
)

export const categoriesSlice = createSlice({
   name: 'categories',
   initialState: {
      list: [],
      isLoading: false,
      error: null,
   },
   extraReducers: builder => {
      builder.addCase(getCategories.pending, state => {
         state.isLoading = true
      })
      builder.addCase(getCategories.fulfilled, (state, action) => {
         state.list = action.payload
         state.isLoading = false
      })
      builder.addCase(getCategories.rejected, (state, action) => {
         state.error = action.payload
         state.isLoading = false
      })
   },
})

export default categoriesSlice.reducer
