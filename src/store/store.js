import { configureStore } from '@reduxjs/toolkit'
import categories from '../store/categories/categoriesSlice.js'

export const store = configureStore({
   reducer: { categories },
})
