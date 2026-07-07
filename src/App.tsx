import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CheckoutPage from './pages/CheckoutPage/CheckoutPage'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CheckoutPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
