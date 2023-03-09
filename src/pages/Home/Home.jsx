import React from 'react'
import styles from '../../styles/Home.module.css'
import { Poster } from '../../components/Poster/Poster'
import { Products } from '../../components/Products/Products'
import { useSelector } from 'react-redux'
import { Categories } from '../../components/Categories/Categories'
import { Banner } from '../../components/Banner/Banner'

export const Home = () => {
   const { products, categories } = useSelector(state => state) // тут мы беорем именно названия со самого стейта а потом конкретно берем то что надо так как у нас одинаковые названия
   return (
      <>
         <Poster />
         <Products products={products.list} amount={5} title='Популярное' />
         <Categories
            categories={categories.list}
            amount={5}
            title='Стоит увидеть'
         />
         <Banner />
      </>
   )
}
