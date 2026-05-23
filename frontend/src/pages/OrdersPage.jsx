import { useState, useEffect } from 'react'
import api from '../utils/api'
import toast from 'react-hot-toast'

const PLACEHOLDER = 'https://placehold.co/80x80/f1f5f9/94a3b8?text=?'

export default function OrdersPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/purchase')
      .then(({ data }) => setOrders(data.purchases))
      .catch(() => toast.error('Failed to load orders'))
      .finally(() => setLoading(false))
  }, [])

  const totalSpent = orders.reduce((sum, o) => sum + o.totalPrice, 0)

  if (loading) {
    return (
      <div className="main-content">
        <div className="empty"><span className="empty-icon">⏳</span><h3>Loading orders…</h3></div>
      </div>
    )
  }

  return (
    <div className="main-content">
      <div className="page-header">
        <div>
          <h1>My Orders</h1>
          <p className="page-sub">{orders.length} order{orders.length !== 1 ? 's' : ''} placed</p>
        </div>
      </div>

      {orders.length > 0 && (
        <div className="stats-bar">
          <div className="stat-chip"><strong>{orders.length}</strong> orders</div>
          <div className="stat-chip">Total spent: <strong>₹{totalSpent.toLocaleString('en-IN')}</strong></div>
        </div>
      )}

      {orders.length === 0 ? (
        <div className="empty">
          <span className="empty-icon">🛒</span>
          <h3>No orders yet</h3>
          <p>Browse products and make your first purchase!</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <img
                className="order-thumb"
                src={order.productId?.imageUrl || PLACEHOLDER}
                alt={order.productId?.title || 'Product'}
                onError={(e) => { e.target.src = PLACEHOLDER }}
              />
              <div className="order-info">
                <h3>{order.productId?.title || 'Product no longer available'}</h3>
                <p>Qty: {order.quantity} &nbsp;·&nbsp; ₹{order.totalPrice.toLocaleString('en-IN')}</p>
                <p className="order-date">
                  {new Date(order.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric', month: 'long', year: 'numeric',
                    hour: '2-digit', minute: '2-digit',
                  })}
                </p>
              </div>
              <span className={`status-pill ${order.status}`}>{order.status}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
