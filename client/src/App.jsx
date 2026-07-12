import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import Stores from './pages/Stores'
import Stocks from './pages/Stocks'
import ProtectedRoute from './components/layout/ProtectedRoute'
import DashboardLayout from './layouts/DashboardLayout'

function App() {

  return (
    <Routes>
      <Route path="/login" element={<Login/>} />
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

export default App
