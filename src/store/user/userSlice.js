import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { BASE_URL } from '../../utils/constants'

//для авторизации пользователя
const userSlice = createSlice({
   name: 'user',
   initialState: {
      currentUser: [],
      cart: [],
      isLoading: false,
      error: null,
   },
   reducers: {
      //для того чтобы если человек добавляем товар который уже есть в корзине мы должны менять ему только количество
      addItemToCart: (state, { payload }) => {
         //проверяем состояние корзины
         let newCart = [...state.cart]
         //находим в нашей корзине по id товар то есть есть он у нас в корзине или нет
         const found = state.cart.find(({ id }) => id === payload.id)
         //если чтото найдено в корзине то делаем следующее
         if (found) {
            //мы проходимся по корзине и если находим совпадение то добавляем количество или просто количество или + 1
            newCart = newCart.map(item => {
               return item.id === payload.id
                  ? { ...item, quantity: payload.quantity || item.quantity + 1 }
                  : item
            })
         } else newCart.push({ ...payload, quantity: 1 })
         state.cart = newCart
      },
   },
})

export const { addItemToCart } = userSlice.actions

export default userSlice.reducer
