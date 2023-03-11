import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { BASE_URL } from '../../utils/constants'

/*========================Thunks==========================*/
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
         const { data } = await axios(`${BASE_URL}/auth/profile`, {
            headers: {
               Authorization: `Bearer ${res.data.access_token}`,
            },
         })

         return data
      } catch (err) {
         console.log(err)
         return thunkAPI.rejectWithValue(err)
      }
   }
)

//создаем функцию для обновления данных профиля пользователя
export const updateUser = createAsyncThunk(
   'user/updateUser',
   async (payload, thunkAPI) => {
      try {
         const { data } = await axios.put(
            `${BASE_URL}/users/${payload.id}`,
            payload
         )
         return data
      } catch (error) {
         console.log(error)
         return thunkAPI.rejectWithValue(error)
      }
   }
)
/*========================END-Thunks==========================*/

//для смены формы
export const signup = 'signup' // это для состояния которая будет видна форма регистрации
export const login = 'login' // это для состояния которая будет видна форма авторизации

//обна функция для регистрации и авторизации
const addCurrentUser = (state, { payload }) => {
   state.currentUser = payload
}

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
      builder.addCase(createUser.fulfilled, addCurrentUser)

      //для авторизации пользователя
      builder.addCase(loginUser.fulfilled, addCurrentUser)

      //для обновления профиля пользователя
      builder.addCase(updateUser.fulfilled, addCurrentUser)
   },
})

export const { addItemToCart, toggleForm, toggleFormType } = userSlice.actions

export default userSlice.reducer
