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

//создаем функцию для отправки данных для авторизации
export const loginUser = createAsyncThunk(
   'user/loginUser',
   async (payload, thunkAPI) => {
      try {
         //тут мы отправляем данные для сверки и назад должны получить токен
         const res = await axios.post(`${BASE_URL}/auth/login`, payload)

         // тут мы отправляем данные уже с полученным токеном
         const { data } = await axios.get(
            (`${BASE_URL}/auth/profile`,
            {
               headers: { Authorization: `Bearer {${res.access_token}}` },
            })
         )
         return data
      } catch (error) {
         console.log(error)
         return thunkAPI.rejectWithValue(error)
      }
   }
)

export const signup = 'signup' // это для состояния которая будет видна форма регистрации
export const login = 'login' // это для состояния которая будет видна форма авторизации
//для авторизации пользователя
const userSlice = createSlice({
   name: 'user',
   initialState: {
      currentUser: null, // данный пользователя который ввошел(уже авторизирован)
      cart: [],
      isLoading: false,
      error: null,
      formType: signup, //состояние с помощью которого мы меняет нашу форму с регистрацуии на авторизацию
      showForm: false, // для отображения или скрытия формы для
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
      // смена вводимой формы или регистрация или авторизация
      toggleFormType: (state, action) => {
         state.formType = action.payload
      },
   },
   extraReducers: builder => {
      //для созданияпользователя
      builder.addCase(createUser.fulfilled, (state, action) => {
         state.currentUser = action.payload
         state.isLoading = false
      })

      //для авторизации пользователя
      builder.addCase(loginUser.fulfilled, (state, action) => {
         state.currentUser = action.payload
         state.isLoading = false
      })
   },
})

export const { addItemToCart, toggleForm, toggleFormType } = userSlice.actions

export default userSlice.reducer
