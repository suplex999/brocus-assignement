import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

export default function Navbar({ onAuthClick, activePage, setActivePage }) {
  const { user, logout, isLoggedIn } = useAuth()

  const handleLogout = () => {
    logout()
    toast.success('Logged out successfully')
    setActivePage('products')
  }

  return (
    <nav className="navbar">
      <div className="nav-brand" onClick={() => setActivePage('products')}>
        <span className="nav-logo">🛍️</span>
        <span className="nav-title">ShopBrocus</span>
      </div>

      <div className="nav-links">
        <button
          className={`nav-link ${activePage === 'products' ? 'active' : ''}`}
          onClick={() => setActivePage('products')}
        >
          Products
        </button>
        {isLoggedIn && (
          <button
            className={`nav-link ${activePage === 'orders' ? 'active' : ''}`}
            onClick={() => setActivePage('orders')}
          >
            My Orders
          </button>
        )}
      </div>

      <div className="nav-actions">
        {isLoggedIn ? (
          <>
            <span className="nav-user">Hi, {user.name.split(' ')[0]} 👋</span>
            <button className="btn btn-outline" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <button className="btn btn-primary" onClick={onAuthClick}>Sign In</button>
        )}
      </div>
    </nav>
  )
}
