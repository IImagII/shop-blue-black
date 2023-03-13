import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Product } from './Product'
import { Products } from './Products'
import { useDispatch, useSelector } from 'react-redux'
import { getRelayedProducts } from '../../store/products/productsSlice'
import axios from 'axios'
import { BASE_URL } from '../../utils/constants'

export const SingleProducts = () => {
   const { id } = useParams()

   const [cuttentProduct, setCurrentProduct] = useState('')

   const dispatch = useDispatch()

   useEffect(() => {
      const getProductId = async id => {
         const { data } = await axios.get(`${BASE_URL}/products/${id}`)
         setCurrentProduct(data)
      }
      getProductId(id)
   }, [id])

   const { list, related } = useSelector(state => state.products) // тут будем содержаться состояние в котором храниться

   //тут мы отправляем в наш producSlice где получаем нужную нам категорию и перемешиваем ее и возвращаем
   useEffect(() => {
      if (!cuttentProduct) return
      dispatch(getRelayedProducts(cuttentProduct?.category?.id)) // чтобы брался именно id категории
   }, [cuttentProduct, dispatch, list.length])

   return (
      <>
         <Product {...cuttentProduct} />
         <Products products={related} amount={10} title='Популярные продукты' />
      </>
   )
}
