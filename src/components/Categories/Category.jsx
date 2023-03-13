import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetProductsQuery } from '../../store/api/apiSlice'
import styles from '.././../styles/Category.module.css'
import { Products } from '../Products/Products'
import { useSelector } from 'react-redux'

export const Category = () => {
   const { id } = useParams()
   const { list } = useSelector(state => state.categories) //это нужно для отображения категории

   const [cat, setCat] = useState('') //состояние коотрое хранит название категории

   /*===========тут параметры для отображения input=========*/
   //    это для отображения штзге
   const defaultValues = {
      title: '',
      price_min: 0,
      price_max: 0,
   } //
   const [values, setValues] = useState(defaultValues) //состояние для управляющего input

   //создаем функцию для того чтобы сделать управляющие input
   const handleChange = ({ target: { value, name } }) => {
      setValues({ ...values, [name]: value })
   }

   /*===========END параметры для отображения input=========*/

   /*===========тут параметры для фильтрации=========*/
   const defaultParams = {
      // это сосотяние по дефолту для отображения для фильтрации
      categoryId: id,
      limit: 5, // это для того чтобы сделать пагинацию
      offset: 0, // тоже необходимо лдя того чтобы сделать пагинацию
      ...defaultValues,
   }

   const [items, setItems] = useState([]) //состояние в котором будет храниться состояние для пагинации

   const [isEnd, setIsEnd] = useState(false) // состояниедля того чтобы если заканчиваются товары одгрузка прекратилась

   const [params, setParams] = useState(defaultParams) // тут мы формируем состояние по коотрому у нас будет фильтрование и передаем его в запрос

   const { data, isLoading, isSuccess } = useGetProductsQuery(params) // тут фильтруем используя ту же функцию применяя разные параметры

   /*===========END параметры для фильтрации=========*/

   useEffect(() => {
      //смена категории тут у нас мы добавляем наш id который поотм попадает в соответствующюю категорию
      if (!id) return
      setItems([]) // тут происходит очищение при смене категории
      setIsEnd(false)
      setValues(defaultValues)
      setParams({ ...defaultParams, categoryId: id })
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [id])

   //фнукция для отправки данных для фильтрации
   const handleSubmit = e => {
      e.preventDefault()
      setItems([])
      setIsEnd(false)
      setParams({ ...defaultParams, ...values })
   }

   //функция для оотбражения категории
   useEffect(() => {
      if (!id || !list.length) return
      //ищем категорию
      const { name } = list.find(item => item.id === id * 1) //тут мы имено ищем ту категорию которую нам необходимо ( а * 1 мы так приводим к числу)
      setCat(name)
   }, [list, id])

   //функция для реализации пагинации
   useEffect(() => {
      if (isLoading) return
      if (!data.length) return setIsEnd(true)
      setItems(_items => [..._items, ...data])
   }, [data, isLoading])

   //функция по сбросе данных
   const handleReset = () => {
      setValues(defaultValues)
      setParams(defaultParams)
      setIsEnd(false)
   }

   return (
      <section className={styles.wrapper}>
         <h2 className={styles.title}>{cat}</h2>

         {/* это формапо кторой можно фильтровать наши продукты которые находяться в этой категории */}
         <form className={styles.filters} onSubmit={handleSubmit}>
            <div className={styles.filter}>
               <input
                  type='text'
                  name='title'
                  placeholder='Название продукта'
                  onChange={handleChange}
                  value={values.title}
               />
            </div>
            <div className={styles.filter}>
               <input
                  type='number'
                  name='price_min'
                  placeholder='0'
                  onChange={handleChange}
                  value={values.price_min}
               />
               <span>Цена от</span>
            </div>
            <div className={styles.filter}>
               <input
                  type='number'
                  name='price_max'
                  placeholder='0'
                  onChange={handleChange}
                  value={values.price_max}
               />
               <span>Цена до</span>
            </div>
            {/* именно так нужно прятать кнопку чтобы в форме работал onSubmit и форма отправлялась */}
            <button type='submit' hidden />
         </form>
         {isLoading ? (
            <div className='preloader'>Loading....</div>
         ) : !isSuccess || !items.length ? (
            <div className={styles.back}>
               <span>Ниего не найдено</span>
               <button onClick={handleReset}>Сброс</button>
            </div>
         ) : (
            <Products
               title=''
               products={items}
               style={{ padding: 0 }}
               amount={items.length}
            />
         )}
         {!isEnd && (
            <div className={styles.more}>
               <button
                  onClick={() =>
                     setParams({
                        ...params,
                        offset: params.offset + params.limit,
                     })
                  }
               >
                  Смотреть далее
               </button>
            </div>
         )}
      </section>
   )
}
