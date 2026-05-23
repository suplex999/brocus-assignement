import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import api from '../utils/api'
import toast from 'react-hot-toast'

const PLACEHOLDER = 'https://placehold.co/600x400/f1f5f9/94a3b8?text=No+Image'

function StockBadge({ stock }) {
  if (stock === 0) return <span className="card-stock-badge out">Out of stock</span>
  if (stock <= 10) return <span className="card-stock-badge low">Only {stock} left</span>
  return <span className="card-stock-badge in">In stock</span>
}

export default function ProductCard({ product, onAuthRequired, onEdit, onDelete }) {
  const { isLoggedIn, user } = useAuth()
  const [buying, setBuying] = useState(false)
  const [done, setDone] = useState(false)
  const isAdmin = user?.role === 'admin'

  const handleBuy = async () => {
    if (!isLoggedIn) { onAuthRequired(); return }
    setBuying(true)
    try {
      const { data } = await api.post('/purchase', { productId: product._id, quantity: 1 })
      toast.success(data.message || 'Order placed! 🎉')
      setDone(true)
      setTimeout(() => setDone(false), 4000)
    } catch (err) {
      toast.error(err.response?.data?.message || 'Purchase failed')
    } finally {
      setBuying(false)
    }
  }

  const buyLabel = () => {
    if (done) return '✓ Ordered!'
    if (buying) return 'Processing…'
    if (!isLoggedIn) return '🔒 Login to Buy'
    return 'Buy Now'
  }

  return (
    <div className="product-card">
      <div className="card-img-wrap">
        <img
          src={product.imageUrl || PLACEHOLDER}
          alt={product.title}
          loading="lazy"
          onError={(e) => { e.target.src = PLACEHOLDER }}
        />
        <span className="card-badge">{product.category}</span>
        <StockBadge stock={product.stock} />
      </div>

      <div className="card-body">
        <h3 className="card-title">{product.title}</h3>
        <p className="card-desc">{product.description}</p>

        <div className="card-footer">
          <span className="card-price">₹{product.price.toLocaleString('en-IN')}</span>
          <div className="card-actions">
            {isAdmin && (
              <>
                <button className="btn-edit" onClick={() => onEdit(product)} title="Edit">✏️</button>
                <button className="btn-del" onClick={() => onDelete(product._id)} title="Delete">🗑️</button>
              </>
            )}
            <button
              className={`btn-buy ${done ? 'success' : ''} ${!isLoggedIn ? 'login' : ''}`}
              onClick={handleBuy}
              disabled={buying || product.stock === 0}
            >
              {buyLabel()}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
