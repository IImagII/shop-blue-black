import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { BASE_URL } from '../../utils/constants'

//асинхорнный запрос чтобы принимать продукты с API
export const getProducts = createAsyncThunk(
   'products/getProducts',
   async (_, thunkAPI) => {
      try {
         const { data } = await axios.get(`${BASE_URL}/products`)

         return data
      } catch (error) {
         console.log(error)
         return thunkAPI.rejectWithValue(error)
      }
   }
)

export const productsSlice = createSlice({
   name: 'products',
   initialState: {
      list: [],
      //  filtered: [],
      //  related: [],
      isLoading: false,
      error: null,
   },
   extraReducers: builder => {
      builder.addCase(getProducts.pending, state => {
         state.isLoading = true
      })
      builder.addCase(getProducts.fulfilled, (state, action) => {
         state.list = action.payload
         state.isLoading = false
      })
      builder.addCase(getProducts.rejected, (state, action) => {
         state.error = action.payload
         state.isLoading = false
      })
   },
})

export default productsSlice.reducer