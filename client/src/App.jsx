import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import Stores from './pages/Stores'
import Stocks from './pages/Stocks'

function App() {

  return (
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route>
        <Route index element={<Dashboard/>} />
        <Route path='products' element={<Products/>} />
        <Route path='stores' element={<Stores/>} />
        <Route path='stocks' element={<Stocks/>} />
      </Route>
    </Routes>
  )
}

export default App
