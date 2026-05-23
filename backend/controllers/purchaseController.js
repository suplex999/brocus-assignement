const Purchase = require('../models/Purchase');
const Product = require('../models/Product');

// @route POST /api/purchase  (protected)
const createPurchase = async (req, res) => {
  const { productId, quantity = 1 } = req.body;

  if (!productId) {
    return res.status(400).json({ success: false, message: 'Product ID is required' });
  }

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ success: false, message: 'Insufficient stock' });
    }

    const totalPrice = product.price * quantity;

    const purchase = await Purchase.create({
      userId: req.user._id,
      productId,
      quantity,
      totalPrice,
    });

    // Decrement stock
    product.stock -= quantity;
    await product.save();

    await purchase.populate('productId', 'title imageUrl price');

    res.status(201).json({
      success: true,
      message: 'Purchase successful! Order confirmed.',
      purchase,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route GET /api/purchase  (protected) - user's order history
const getMyPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.find({ userId: req.user._id })
      .populate('productId', 'title imageUrl price category')
      .sort({ createdAt: -1 });

    res.json({ success: true, purchases });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createPurchase, getMyPurchases };
