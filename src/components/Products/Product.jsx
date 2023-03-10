import React, { useEffect, useState } from 'react'
import styles from '../../styles/Product.module.css'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../utils/routes'
import { useDispatch } from 'react-redux'
import { addItemToCart } from '../../store/user/userSlice'

const SIZES = [4, 4.5, 5] // это просто для примера как выбирать размер

export const Product = item => {
   const { images = [], title, price, description } = item
   const [currentImage, setCurrentImage] = useState([]) // состояние для хранения и изменения картинки
   const [currentSize, setCurrentSize] = useState(SIZES[0]) // состояние для хранения и изменения размера

   const dispatch = useDispatch()

   //для изменения картинки динамически
   useEffect(() => {
      if (!images.length) return
      setCurrentImage(images[0])
   }, [images])

   //создадимфункцию добавления товара в корзину по нашему слайсу userSlice и вешаем ее на кнопку добавления в корзину
   const addToCart = () => {
      dispatch(addItemToCart(item)) //мы сюда передаем весь товар который пришел в наш компонент item
   }

   return (
      <section className={styles.product}>
         <div className={styles.images}>
            <div
               className={styles.current}
               style={{ backgroundImage: `url(${currentImage}` }}
            />
            <div className={styles['images-list']}>
               {images.map((image, index) => (
                  <div
                     key={index}
                     className={styles.image}
                     style={{ backgroundImage: `url(${image}` }}
                     onClick={() => setCurrentImage(image)}
                  />
               ))}
            </div>
         </div>
         <div className={styles.info}>
            <h1 className={styles.title}>{title}</h1>
            <div className={styles.price}>{price} $</div>
            <div className={styles.color}>
               <span>Цвет:</span>Зеленый
            </div>
            <div className={styles.sizes}>
               <span>Размер:</span>
               <div className={styles.list}>
                  {SIZES.map(size => (
                     <div
                        className={`${styles.size} ${
                           currentSize === size ? styles.active : ''
                        }`}
                        onClick={() => setCurrentSize(size)}
                        key={size}
                     >
                        {size}
                     </div>
                  ))}
               </div>
            </div>
            <p className={styles.description}>{description}</p>
            <div className={styles.actions}>
               <button className={styles.add} onClick={addToCart}>
                  Добавить в корзину
               </button>
               <button className={styles.favourite}>
                  Добавить в избранное
               </button>
            </div>
            <div className={styles.bottom}>
               <div className={styles.purchases}>19 человек</div>
               <Link to={ROUTES.HOME}>Вернуться</Link>
            </div>
         </div>
      </section>
   )
}
