import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UserSignuoForm } from './UserSignuoForm'
import styles from '../../styles/User.module.css'
import { toggleForm } from '../../store/user/userSlice'

export const UserForm = () => {
   const { showForm } = useSelector(state => state.user) // вытягиваем из сосотяния чтобы понять есть у нас user чтобы показывать модальное окно

   const dispatch = useDispatch()

   return showForm ? (
      <>
         {/* так добавляем затенение всего контента */}
         <div
            className={styles.overlay}
            onClick={() => dispatch(toggleForm(false))}
         />
         <UserSignuoForm />
      </>
   ) : (
      <></>
   )
}
