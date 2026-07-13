import './App.css'
import { Toaster } from './components/ui/sonner'
import AppRoutes from './routes/AppRoutes'

function App() {

  return (
    <>
      <Toaster richColors position={"top-center"} />
      <AppRoutes/>
    </>
  )
}

export default App
