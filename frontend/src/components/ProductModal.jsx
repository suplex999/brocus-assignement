import { useState, useEffect } from 'react'
import api from '../utils/api'
import toast from 'react-hot-toast'

const CATEGORIES = ['Electronics', 'Clothing', 'Footwear', 'Books', 'Home', 'Sports', 'Other']

const empty = { title: '', description: '', imageUrl: '', price: '', category: '', stock: '' }

export default function ProductModal({ product, onClose, onSaved }) {
  const isEdit = !!product
  const [form, setForm] = useState(empty)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (product) setForm({ ...product })
    else setForm(empty)
  }, [product])

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (isEdit) {
        await api.put(`/products/${product._id}`, form)
        toast.success('Product updated ✓')
      } else {
        await api.post('/products', form)
        toast.success('Product added ✓')
      }
      onSaved()
      onClose()
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.errors?.[0]?.msg || 'Error saving product'
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal wide" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <h2>{isEdit ? 'Edit Product' : 'Add New Product'}</h2>
        <p className="modal-sub">{isEdit ? 'Update product details' : 'Fill in the details below'}</p>

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Title *</label>
              <input name="title" value={form.title} onChange={change} placeholder="Product name" required />
            </div>
            <div className="form-group">
              <label>Category *</label>
              <select name="category" value={form.category} onChange={change} required>
                <option value="">Select category</option>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Description *</label>
            <textarea name="description" value={form.description} onChange={change} placeholder="Describe the product…" rows={3} required />
          </div>

          <div className="form-group">
            <label>Image URL</label>
            <input name="imageUrl" value={form.imageUrl} onChange={change} placeholder="https://example.com/image.jpg" />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Price (₹) *</label>
              <input type="number" name="price" value={form.price} onChange={change} placeholder="0" min="0" step="0.01" required />
            </div>
            <div className="form-group">
              <label>Stock *</label>
              <input type="number" name="stock" value={form.stock} onChange={change} placeholder="0" min="0" required />
            </div>
          </div>

          <button type="submit" className="btn btn-primary full" disabled={loading}>
            {loading ? 'Saving…' : isEdit ? 'Update Product' : 'Add Product'}
          </button>
        </form>
      </div>
    </div>
  )
}
