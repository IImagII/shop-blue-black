import React from 'react'
import styles from '../../styles/Header.module.css'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../utils/routes'
import logo from '../../images/logo.svg'
import avatar from '../../images/avatar.jpg'

export const Header = () => {
   return (
      <div className={styles.header}>
         <div className={styles.logo}>
            <Link to={ROUTES.HOME}>
               <img src={logo} alt='shop' />
            </Link>
         </div>

         <div className={styles.info}>
            <div className={styles.user}>
               <div
                  className={styles.avatar}
                  style={{ backgroundImage: `url(${avatar})` }}
               />
               <div className={styles.username}>GUEST</div>
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
                     onChange={() => {}}
                     value=''
                  />
               </div>
               {false && <div className={styles.box}></div>}
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
                  <span className={styles.count}>2</span>
               </Link>
            </div>
         </div>
      </div>
   )
}
