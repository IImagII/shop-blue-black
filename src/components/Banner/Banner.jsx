import React from 'react'
import styles from '../../styles/Home.module.css'
import bannerImg from '../../images/banner.png'

export const Banner = () => (
   <section className={styles.banner}>
      <div className={styles.left}>
         <p className={styles.content}>
            КОЛЛЕКЦИЯ <span>РАСПРОДАЖА</span>
         </p>
         <button className={styles.more}>Увидеть больше...</button>
      </div>
      <div
         className={styles.right}
         style={{ backgroundImage: `url(${bannerImg})` }}
      >
         <p className={styles.discount}>
            сэкономить до <span>50%</span>
         </p>
      </div>
   </section>
)
