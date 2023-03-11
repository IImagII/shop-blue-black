import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser, signup } from '../../store/user/userSlice'
import styles from '../../styles/User.module.css'

//компонент дл самой атворизации
export const UserLoginForm = ({ closeForm, toggleCurrentFormType }) => {
   const [values, setValues] = useState({
      email: '',
      password: '',
   })

   const dispatch = useDispatch()

   //функция которая меняет все состояние в объекте сразу
   const handleChange = ({ target: { value, name } }) => {
      setValues({ ...values, [name]: value })
   }

   //функция которая будет отправлять эту форму и создавать пользователя
   const handleSubmit = e => {
      e.preventDefault()

      //сначало проверим что уна заполнены все поля
      const isNotEmpty = Object.values(values).every(val => val) // тут метод every провверяет что каждое значение у нас убдет true

      if (!isNotEmpty) return

      dispatch(loginUser(values)) // передаем то чт оу нас в форме
      closeForm() // это для того чтобы формазакрылась после того как будет отослана
   }

   return (
      <div className={styles.wrapper}>
         <div className={styles.close} onClick={closeForm}>
            <svg className='icon'>
               <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`} />
            </svg>
         </div>

         <div className={styles.title}>Sign Up</div>
         <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.group}>
               <input
                  type='email'
                  name='email'
                  placeholder='Email'
                  value={values.email}
                  autoComplete='off'
                  onChange={handleChange}
                  required
               />
            </div>
            <div className={styles.group}>
               <input
                  type='password'
                  name='password'
                  placeholder='password'
                  value={values.password}
                  autoComplete='off'
                  onChange={handleChange}
                  required
               />
            </div>

            <div
               className={styles.link}
               onClick={() => toggleCurrentFormType(signup)}
            >
               Создать аккаунт?
            </div>
            <button type='submit' className={styles.submit}>
               Войти
            </button>
         </form>
      </div>
   )
}
