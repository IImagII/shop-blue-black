import { configureStore } from '@reduxjs/toolkit'
import categories from '../store/categories/categoriesSlice.js'
import products from '../store/products/productsSlice.js'
import { apiSlice } from './api/apiSlice.js'
import user from './user/userSlice.js'

export const store = configureStore({
   reducer: {
      categories,
      products,
      user,
      [apiSlice.reducerPath]: apiSlice.reducer, // это второй способ как можно экспортировать Slice можно как выше а можно и так более динамически получается
   },
   middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(apiSlice.middleware),
})
