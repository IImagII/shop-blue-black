import React, { useState } from 'react'
import styles from '../../styles/User.module.css'
import { useDispatch } from 'react-redux'
import { toggleForm } from '../../store/user/userSlice'

export const UserSignuoForm = () => {
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

   return (
      <div className={styles.wrapper}>
         <div className={styles.close} onClick={handleClickClose}>
            <svg className='icon'>
               <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`} />
            </svg>
         </div>

         <div className={styles.title}>Sign Up</div>
         <form className={styles.form}>
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
            <div className={styles.link}>Уже есть аккаунт?</div>
            <button type='submit' className={styles.submit}>
               Создать аккаунт
            </button>
         </form>
      </div>
   )
}
