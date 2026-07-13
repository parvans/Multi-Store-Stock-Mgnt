import ProtectedRoute from '@/components/layout/ProtectedRoute'
import PublicRoute from '@/components/layout/PublicRoute'
import DashboardLayout from '@/layouts/DashboardLayout'
import Dashboard from '@/pages/Dashboard'
import Login from '@/pages/Login'
import Products from '@/pages/Products'
import Stocks from '@/pages/Stocks'
import Stores from '@/pages/Stores'
import { Route, Routes } from 'react-router-dom'

function AppRoutes() {

  return (
    <Routes>
      <Route 
      path="/login" 
      element={
        <PublicRoute>
          <Login/>
        </PublicRoute>
      } 
      />
      <Route
      element={
        <ProtectedRoute>
          <DashboardLayout/>
        </ProtectedRoute>
      }
      >
        <Route index element={<Dashboard/>} />
        <Route path='products' element={<Products/>} />
        <Route path='stores' element={<Stores/>} />
        <Route path='stocks' element={<Stocks/>} />
      </Route>
    </Routes>
  )
}

export default AppRoutes;
