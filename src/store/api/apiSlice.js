import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../../utils/constants'

//другой подход для получения APi
export const apiSlice = createApi({
   reducerPath: 'api', // название для нашего общего store
   baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }), // наш основной запрос http
   tagTypes: ['Product'],
   endpoints: builder => ({
      getProduct: builder.query({
         query: ({ id }) => `/products/${id}`,
         providesTags: ['Product'],
      }),
   }),
})

export const { useGetProductQuery } = apiSlice // в данном случае мы получили хуки
