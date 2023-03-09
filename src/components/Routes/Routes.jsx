import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { ROUTES } from '../../utils/routes'
import { Home } from '../../pages/Home/Home'

export const AppRoutes = () => (
   <Routes>
      <Route index element={<Home />} />
   </Routes>
)
