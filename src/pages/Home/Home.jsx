import React, { useEffect } from 'react'
import styles from '../../styles/Home.module.css'
import { Poster } from '../../components/Poster/Poster'
import { Products } from '../../components/Products/Products'
import { useDispatch, useSelector } from 'react-redux'
import { Categories } from '../../components/Categories/Categories'
import { Banner } from '../../components/Banner/Banner'
import { filterByPrice } from '../../store/products/productsSlice'

export const Home = () => {
   const dispatch = useDispatch() //для того тчобы сделать один и тот же компонент но с разными данными

   const {
      products: { list, filtered },
      categories,
   } = useSelector(state => state) // тут мы беорем именно названия со самого стейта а потом конкретно берем то что надо так как у нас одинаковые названия

   //тут получаем новые данные
   useEffect(() => {
      if (!list.length) return
      dispatch(filterByPrice(100)) //тут 100 попадет как action.payload(тоесть это цена) и соотвественно понему будет фильроваться
   }, [dispatch, list.length])

   return (
      <>
         <Poster />
         <Products products={list} amount={5} title='Популярное' />
         <Categories
            categories={categories.list}
            amount={5}
            title='Стоит увидеть'
         />
         <Banner />
         <Products products={filtered} amount={5} title='Менее 100$' />
      </>
   )
}
