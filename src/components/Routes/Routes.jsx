import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { ROUTES } from '../../utils/routes'
import { Home } from '../../pages/Home/Home'
import { SingleProducts } from '../Products/SingleProducts'
import { Profile } from '../Profile/Profile'

export const AppRoutes = () => (
   <Routes>
      <Route index element={<Home />} />
      <Route path={ROUTES.PRODUCT} element={<SingleProducts />} />
      <Route path={ROUTES.PROFILE} element={<Profile />} />
   </Routes>
)
