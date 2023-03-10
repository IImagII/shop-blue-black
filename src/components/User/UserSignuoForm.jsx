import React, { useState } from 'react'
import styles from '../../styles/User.module.css'
import { useDispatch } from 'react-redux'
import { createUser, login, toggleForm } from '../../store/user/userSlice'

//компонент для отправки данных для регитсрации
export const UserSignuoForm = ({ closeForm, toggleCurrentFormType }) => {
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

   //функция закртия окна
   const handleClickClose = () => {
      dispatch(toggleForm(false))
   }

   //функция которая будет отправлять эту форму и создавать пользователя
   const handleSubmit = e => {
      e.preventDefault()

      //сначало проверим что уна заполнены все поля
      const isNotEmpty = Object.values(values).every(val => val) // тут метод every провверяет что каждое значение у нас убдет true

      if (!isNotEmpty) return

      dispatch(createUser(values)) // передаем то чт оу нас в форме
      closeForm() // это для того чтобы формазакрылась после того как будет отослана
   }

   return (
      <div className={styles.wrapper}>
         <div className={styles.close} onClick={handleClickClose}>
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
            <div
               className={styles.link}
               onClick={() => toggleCurrentFormType(login)}
            >
               Уже есть аккаунт?
            </div>
            <button type='submit' className={styles.submit}>
               Создать аккаунт
            </button>
         </form>
      </div>
   )
}
