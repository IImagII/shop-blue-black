import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetProductQuery } from '../../store/api/apiSlice'
import { ROUTES } from '../../utils/routes'
import { Product } from './Product'
import { Products } from './Products'
import { useDispatch, useSelector } from 'react-redux'
import { getRelayedProducts } from '../../store/products/productsSlice'

export const SingleProducts = () => {
   const { id } = useParams()

   const navigate = useNavigate()

   const dispatch = useDispatch()

   //это получаем данные из запроса по технологии RTQ Query
   const {
      data = [],
      isLoading,
      isFetching,
      isSuccess,
   } = useGetProductQuery({ id }) // получаем из нашего хука RTK Query
   console.log('data', data)
   const { list, related } = useSelector(state => state.products) // тут будем содержаться состояние в котором храниться

   //делаем для того чтобы перекинуть пользователя на главнуб страницу если запрос не срабовал
   useEffect(() => {
      if (!isFetching && !isLoading && !isSuccess) {
         navigate(ROUTES.HOME)
      }
   }, [isLoading, isFetching, isSuccess, navigate])

   //тут мы отправляем в наш producSlice где получаем нужную нам категорию и перемешиваем ее и возвращаем
   useEffect(() => {
      if (!data || !list.length) return
      dispatch(getRelayedProducts(data?.category?.id)) // чтобы брался именно id категории
   }, [data, dispatch, list.length])

   return !data ? (
      <section сlassName='preloader'>Загрузка......</section>
   ) : (
      <>
         <Product {...data} />
         <Products products={related} amount={5} title='Популярное' />
      </>
   )
}
