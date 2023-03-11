import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { BASE_URL } from '../../utils/constants'

//создаем функцию коотраябудет отвечать за регистрацию пользователя
export const createUser = createAsyncThunk(
   'user/createUser',
   async (payload, thunkAPI) => {
      try {
         const { data } = await axios.post(`${BASE_URL}/users`, payload)
         return data
      } catch (error) {
         console.log(error)
         return thunkAPI.rejectWithValue(error)
      }
   }
)

//для авторизации пользователя
const userSlice = createSlice({
   name: 'user',
   initialState: {
      currentUser: null,
      cart: [],
      isLoading: false,
      error: null,
      formType: 'signup',
      showForm: false, // для отображения или скрытия формы для авторизации
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
      //смена состояниядля показа модального окна
      toggleForm: (state, action) => {
         state.showForm = action.payload
      },
   },
   extraReducers: builder => {
      builder.addCase(createUser.pending, state => {
         state.isLoading = true
      })
      builder.addCase(createUser.fulfilled, (state, action) => {
         state.currentUser = action.payload
         state.isLoading = false
      })
      builder.addCase(createUser.rejected, (state, action) => {
         state.error = action.payload
         state.isLoading = false
      })
   },
})

export const { addItemToCart, toggleForm } = userSlice.actions

export default userSlice.reducer
