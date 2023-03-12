import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../../utils/constants'
import { buildUrl } from '../../utils/common'

//другой подход для получения APi
export const apiSlice = createApi({
   reducerPath: 'api', // название для нашего общего store
   baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }), // наш основной запрос http
   tagTypes: ['Product'],
   endpoints: builder => ({
      //это дляполувения каждого продукта по id для последующего его отображения
      getProduct: builder.query({
         query: ({ id }) => `/products/${id}`,
         providesTags: ['Product'],
      }),
      //для реализации поиска
      getProducts: builder.query({
         query: params => buildUrl('/products', params), // тут используется фкастомнаяфункция которая формирует url из common.js
         providesTags: ['Products'],
      }),
   }),
})

export const { useGetProductQuery, useGetProductsQuery } = apiSlice // в данном случае мы получили хуки
