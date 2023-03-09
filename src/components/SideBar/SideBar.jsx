import React from 'react'
import styles from '../../styles/Sidebar.module.css'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const SideBar = () => {
   const { list } = useSelector(state => state.categories)

   return (
      <section className={styles.sidebar}>
         <div className={styles.title}>CATEGORIES</div>
         <nav>
            <ul className={styles.menu}>
               {list.map(({ id, name }) => (
                  <li key={id}>
                     <NavLink
                        className={({ isActive }) =>
                           `${styles.link} ${isActive ? styles.active : ''}`
                        }
                        to={`/categories/${id}`}
                     >
                        {name}
                     </NavLink>
                  </li>
               ))}
            </ul>
         </nav>
         <div className={styles.footer}>
            <a href='/help' className={styles.link} target='_blank'>
               Help
            </a>

            <a
               href='/terms'
               className={styles.link}
               target='_blank'
               style={{ textDecoration: 'underline' }}
            >
               Terms & Conditions
            </a>
         </div>
      </section>
   )
}
