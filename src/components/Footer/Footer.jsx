import React from 'react'
import styles from '../../styles/Footer.module.css'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../utils/routes'
import logo from '../../images/logo.svg'

export const Footer = () => (
   <section className={styles.footer}>
      <div className={styles.logo}>
         <Link to={ROUTES.HOME}>
            <img src={logo} alt='shop' />
         </Link>
      </div>

      <div className={styles.rights}>
         ©{'  '}
         Оформление сайта
         <a
            href='https://github.com/IImagII/shop-blue-black'
            target='_blank'
            rel='noreferrer'
         >
            {' '}
            IImagII
         </a>{' '}
         2023
      </div>

      <div className={styles.socials}>
         <a href='https://instagram.com' target='_blank' rel='noreferrer'>
            <svg className='icon'>
               <use
                  xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#instagram`}
               />
            </svg>
         </a>

         <a href='https://facebook.com' target='_blank' rel='noreferrer'>
            <svg className='icon'>
               <use
                  xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#facebook`}
               />
            </svg>
         </a>

         <a href='https://youtube.com' target='_blank' rel='noreferrer'>
            <svg className='icon'>
               <use
                  xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#youtube`}
               />
            </svg>
         </a>
      </div>
   </section>
)
