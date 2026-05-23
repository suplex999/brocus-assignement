import { useState, useEffect, useCallback } from 'react'
import api from '../utils/api'
import ProductCard from '../components/ProductCard.jsx'
import ProductModal from '../components/ProductModal.jsx'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

const CATEGORIES = ['Electronics', 'Clothing', 'Footwear', 'Books', 'Home', 'Sports', 'Other']
const PER_PAGE = 9

export default function ProductsPage({ onAuthRequired }) {
  const { user } = useAuth()
  const isAdmin = user?.role === 'admin'

  const [products, setProducts] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [page, setPage] = useState(1)
  const [showModal, setShowModal] = useState(false)
  const [editProduct, setEditProduct] = useState(null)

  const totalPages = Math.ceil(total / PER_PAGE)

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    try {
      const params = { page, limit: PER_PAGE }
      if (search.trim()) params.search = search.trim()
      if (category) params.category = category
      const { data } = await api.get('/products', { params })
      setProducts(data.products)
      setTotal(data.total)
    } catch {
      toast.error('Could not load products')
    } finally {
      setLoading(false)
    }
  }, [page, search, category])

  useEffect(() => { fetchProducts() }, [fetchProducts])

  // Reset page on filter change
  useEffect(() => { setPage(1) }, [search, category])

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return
    try {
      await api.delete(`/products/${id}`)
      toast.success('Product deleted')
      fetchProducts()
    } catch {
      toast.error('Failed to delete')
    }
  }

  const openAdd = () => { setEditProduct(null); setShowModal(true) }
  const openEdit = (p) => { setEditProduct(p); setShowModal(true) }

  return (
    <div className="main-content">
      <div className="page-header">
        <div>
          <h1>Our Products</h1>
          <p className="page-sub">Browse {total} items — discover something great today</p>
        </div>
        {isAdmin && (
          <button className="btn btn-primary" onClick={openAdd}>+ Add Product</button>
        )}
      </div>

      {/* Stats */}
      {!loading && (
        <div className="stats-bar">
          <div className="stat-chip"><strong>{total}</strong> total products</div>
          {category && <div className="stat-chip">Category: <strong>{category}</strong></div>}
          {search && <div className="stat-chip">Search: <strong>"{search}"</strong></div>}
          {totalPages > 1 && <div className="stat-chip">Page <strong>{page}</strong> of <strong>{totalPages}</strong></div>}
        </div>
      )}

      {/* Filters */}
      <div className="filters">
        <div className="search-wrap">
          <span className="search-icon">🔍</span>
          <input
            className="search-input"
            placeholder="Search products…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="filter-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        {(search || category) && (
          <button
            className="btn btn-ghost"
            onClick={() => { setSearch(''); setCategory('') }}
          >
            Clear ✕
          </button>
        )}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="skeleton-grid">
          {Array.from({ length: 6 }).map((_, i) => <div key={i} className="skeleton-card" />)}
        </div>
      ) : products.length === 0 ? (
        <div className="empty">
          <span className="empty-icon">📦</span>
          <h3>No products found</h3>
          <p>{search || category ? 'Try different search terms or clear filters.' : 'Products will appear here once added.'}</p>
        </div>
      ) : (
        <div className="products-grid">
          {products.map((p) => (
            <ProductCard
              key={p._id}
              product={p}
              onAuthRequired={onAuthRequired}
              onEdit={openEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="btn btn-outline"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >← Prev</button>
          <span className="page-info">Page {page} of {totalPages}</span>
          <button
            className="btn btn-outline"
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >Next →</button>
        </div>
      )}

      {showModal && (
        <ProductModal
          product={editProduct}
          onClose={() => setShowModal(false)}
          onSaved={fetchProducts}
        />
      )}
    </div>
  )
}
