import React from 'react'
import styles from '../../styles/Home.module.css'
import { Poster } from '../../components/Poster/Poster'
import { Products } from '../../components/Products/Products'
import { useSelector } from 'react-redux'

export const Home = () => {
   const { list } = useSelector(state => state.products)

   return (
      <>
         <Poster />
         <Products products={list} amount={5} title='Популярное' />
      </>
   )
}
