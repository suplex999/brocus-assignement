const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { createPurchase, getMyPurchases } = require('../controllers/purchaseController');

router.post('/', protect, createPurchase);
router.get('/', protect, getMyPurchases);

module.exports = router;
