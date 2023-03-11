import React, { useEffect, useState } from 'react'
import styles from '../../styles/Profile.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../../store/user/userSlice'

export const Profile = () => {
   const { currentUser } = useSelector(state => state.user)

   const [values, setValues] = useState({
      name: '',
      email: '',
      password: '',
      avatar: '',
   })

   const dispatch = useDispatch()

   //функция которая меняет все состояние в объекте сразу
   const handleChange = ({ target: { value, name } }) => {
      setValues({ ...values, [name]: value })
   }

   //функция которая будет отправлять эту форму и обновлять пользователя
   const handleSubmit = e => {
      e.preventDefault()

      //сначало проверим что уна заполнены все поля
      const isNotEmpty = Object.values(values).every(val => val) // тут метод every провверяет что каждое значение у нас убдет true

      if (!isNotEmpty) return

      dispatch(updateUser(values)) // передаем то чт оу нас в форме
   }

   //функция которая отслеживает те данныекоторые у нас уже есть и обавляет их в поля то естьонадобавит в поля данные зарегестривраонного пользователя
   useEffect(() => {
      if (!currentUser) return
      setValues(currentUser)
   }, [currentUser])

   return (
      <section className={styles.profile}>
         {!currentUser ? (
            <span>У тебя нет аккаунта</span>
         ) : (
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
                     type='name'
                     name='name'
                     placeholder='name'
                     value={values.name}
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
               <div className={styles.group}>
                  <input
                     type='avatar'
                     name='avatar'
                     placeholder='avatar'
                     value={values.avatar}
                     autoComplete='off'
                     onChange={handleChange}
                     required
                  />
               </div>

               <button type='submit' className={styles.submit}>
                  Обновить аккаунт
               </button>
            </form>
         )}
      </section>
   )
}
