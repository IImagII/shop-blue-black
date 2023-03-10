import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetProductQuery } from '../../store/api/apiSlice'
import { ROUTES } from '../../utils/routes'
import { Product } from './Product'

export const SingleProducts = () => {
   const { id } = useParams()
   const navigate = useNavigate()
   const {
      data = [],
      isLoading,
      isFetching,
      isSuccess,
   } = useGetProductQuery(id) // получаем из нашего хука RTK Query

   //делаем для того чтобы перекинуть пользователя на главнуб страницу если запрос не срабовал
   useEffect(() => {
      if (!isFetching && !isLoading && !isSuccess) {
         navigate(ROUTES.HOME)
      }
   }, [isLoading, isFetching, isSuccess])

   if (!data) return <section сlassName='preloader'>Загрузка......</section>

   return (
      <>
         <Product {...data} />
      </>
   )
}
