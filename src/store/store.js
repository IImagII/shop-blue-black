import { configureStore } from '@reduxjs/toolkit'
import categories from '../store/categories/categoriesSlice.js'
import products from '../store/products/productsSlice.js'

export const store = configureStore({
   reducer: {
      categories,
      products,
   },
})
