import { Footer } from '../Footer/Footer'
import { Header } from '../Header.jsx/Header'
import { SideBar } from '../SideBar/SideBar'
import { AppRoutes } from '../Routes/Routes'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getCategories } from '../../store/categories/categoriesSlice'
import { getProducts } from '../../store/products/productsSlice'

function App() {
   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(getCategories())
      dispatch(getProducts())
   }, [dispatch])

   return (
      <div className='app'>
         <Header />

         <div className='container'>
            <SideBar />
            <AppRoutes />
         </div>

         <Footer />
      </div>
   )
}

export default App
