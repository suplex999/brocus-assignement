import { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext.jsx'
import Navbar from './components/Navbar.jsx'
import AuthModal from './components/AuthModal.jsx'
import ProductsPage from './pages/ProductsPage.jsx'
import OrdersPage from './pages/OrdersPage.jsx'

function Shell() {
  const [showAuth, setShowAuth] = useState(false)
  const [page, setPage] = useState('products')

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: { borderRadius: '10px', fontSize: '0.9rem' },
        }}
      />
      <Navbar
        onAuthClick={() => setShowAuth(true)}
        activePage={page}
        setActivePage={setPage}
      />

      {page === 'products' && <ProductsPage onAuthRequired={() => setShowAuth(true)} />}
      {page === 'orders' && <OrdersPage />}

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <Shell />
    </AuthProvider>
  )
}
