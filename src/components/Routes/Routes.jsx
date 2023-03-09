import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { ROUTES } from '../../utils/routes'
import { Home } from '../../pages/Home/Home'
import { SingleProducts } from '../Products/SingleProducts'

export const AppRoutes = () => (
   <Routes>
      <Route index element={<Home />} />
      <Route path={ROUTES.PRODUCT} element={<SingleProducts />} />
   </Routes>
)
