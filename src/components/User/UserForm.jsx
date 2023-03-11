import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UserSignuoForm } from './UserSignuoForm'
import styles from '../../styles/User.module.css'
import { toggleForm, toggleFormType } from '../../store/user/userSlice'
import { UserLoginForm } from './UserLoginForm'

export const UserForm = () => {
   const { showForm, formType } = useSelector(state => state.user) // вытягиваем из сосотяния чтобы понять есть у нас user чтобы показывать модальное окно

   const dispatch = useDispatch()

   // функциядля крестика модального окна по закрытиюего
   const closeForm = () => {
      dispatch(toggleForm(false))
   }

   //это функция которая будет менять глобальное состояние и через него мы будем менять ти п формы или регсирация или авторизация
   const toggleCurrentFormType = type => {
      dispatch(toggleFormType(type))
   }

   return showForm ? (
      <>
         {/* так добавляем затенение всего контента */}
         <div className={styles.overlay} onClick={closeForm} />
         {formType === 'signup' ? (
            <UserSignuoForm
               closeForm={closeForm}
               toggleCurrentFormType={toggleCurrentFormType}
            />
         ) : (
            <UserLoginForm
               closeForm={closeForm}
               toggleCurrentFormType={toggleCurrentFormType}
            />
         )}
      </>
   ) : (
      <></>
   )
}
