import React, { useEffect, useState } from 'react'
import styles from '../../styles/Header.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { ROUTES } from '../../utils/routes'
import logo from '../../images/logo.svg'
import avatar from '../../images/avatar.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { toggleForm } from '../../store/user/userSlice'
import { useGetProductsQuery } from '../../store/api/apiSlice'

export const Header = () => {
   const { currentUser, cart } = useSelector(state => state.user) // вытягиваем из сосотяния чтобы понять есть у нас user чтобы показывать модальное окно

   const [values, setValues] = useState({
      // создаем состояние чтобы менять его поторм когда мы будет авторизированы
      name: 'Guest',
      avatar: avatar,
   })

   const [searchValue, setSearchValue] = useState('') //состояние для поиска товаров

   // достаем из apiSlice.js наш запрос с фильтрацией
   const { data, isLoading } = useGetProductsQuery({ title: searchValue })

   const dispatch = useDispatch()
   const navigate = useNavigate()

   //функция для отображения модального окна
   const handleClick = () => {
      //делаем проверку что если у нас нет пользователя то должно поменяться состояние коотре есть в slice (showForm)
      if (!currentUser) {
         //тут берем reducer для смены на другое состояние для показа модального окна
         dispatch(toggleForm(true))
      } else navigate(ROUTES.PROFILE) // делаем перенаправление на профильпользователя если он уже зарегестрирован
   }

   //пишем функцию которая будет менять нам аватарку и имя на то которое мы зарегестрировалисьесли мы зарегестрировалиь
   useEffect(() => {
      if (!currentUser) return
      setValues(currentUser)
   }, [currentUser])

   //функция для реализации поиска товаров
   const handleSearch = ({ target: { value } }) => {
      setSearchValue(value)
   }

   return (
      <div className={styles.header}>
         <div className={styles.logo}>
            <Link to={ROUTES.HOME}>
               <img src={logo} alt='shop' />
            </Link>
         </div>

         <div className={styles.info}>
            <div className={styles.user} onClick={handleClick}>
               <div
                  className={styles.avatar}
                  style={{ backgroundImage: `url(${values.avatar})` }}
               />
               <div className={styles.username}>{values.name}</div>
            </div>
            <form className={styles.form}>
               <div className={styles.icon}>
                  {/* это нужно чтобы использовать svg спрайт */}
                  <svg className='icon'>
                     <use
                        xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#search`}
                     />
                  </svg>
               </div>
               <div className={styles.input}>
                  <input
                     type='search'
                     name='search'
                     placeholder='Поиск по сайту.....'
                     autoComplete='off'
                     onChange={handleSearch}
                     value={searchValue}
                  />
               </div>
               {/* тут показана форма которая выводит то что мы ищем в поиске */}
               {searchValue && (
                  <div className={styles.box}>
                     {isLoading
                        ? 'Loading'
                        : !data.length
                        ? 'Ничего не найдено'
                        : data.map(({ title, images, id }) => {
                             return (
                                <Link
                                   to={`/products/${id}`}
                                   key={id}
                                   className={styles.item}
                                   onClick={() => setSearchValue('')} //для очистки поля "Поиска"
                                >
                                   <div
                                      className={styles.image}
                                      style={{
                                         backgroundImage: `url(${images[0]})`,
                                      }}
                                   />
                                   <div className={styles.title}>{title}</div>
                                </Link>
                             )
                          })}
                  </div>
               )}
            </form>
            <div className={styles.account}>
               {/* иконка своего аккаунта */}
               <Link to={ROUTES.HOME} className={styles.favourites}>
                  <svg className={styles['icon-fav']}>
                     <use
                        xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#heart`}
                     />
                  </svg>
               </Link>

               {/* иконка самой корзины */}
               <Link to={ROUTES.CART} className={styles.cart}>
                  <svg className={styles['icon-cart']}>
                     <use
                        xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#bag`}
                     />
                  </svg>
                  {/* оотбражение количества которое положили в корзину */}
                  {cart.length && (
                     <span className={styles.count}>{cart.length}</span>
                  )}
               </Link>
            </div>
         </div>
      </div>
   )
}
