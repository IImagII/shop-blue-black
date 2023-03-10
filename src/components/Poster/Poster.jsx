import React from 'react'
import styles from '../../styles/Home.module.css'
import bg from '../../images/computer.png'

export const Poster = () => (
   <section className={styles.home}>
      <div className={styles.title}> BIG SALE 20%</div>
      <div className={styles.product}>
         <div className={styles.text}>
            <div className={styles.subtitle}>Это бесцеллер 2023</div>
            <h1 className={styles.head}>LENNON r2d2 with NVIDIA 5090 TI</h1>
            <button className={styles.button}>Купить сейчас!</button>
         </div>
         <div className={styles.image}>
            <img src={bg} alt='' />
         </div>
      </div>
   </section>
)
