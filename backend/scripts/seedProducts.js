const mongoose = require('mongoose')
const dotenv = require('dotenv')
const Product = require('../models/Product')

dotenv.config()

const products = [
  {
    title: 'Apple iPhone 15 Pro',
    description: 'Latest iPhone with A17 Pro chip, titanium design, 48MP camera system, and USB-C connectivity. Available in Natural Titanium.',
    imageUrl: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop',
    price: 134900,
    category: 'Electronics',
    stock: 25,
  },
  {
    title: 'Sony WH-1000XM5 Headphones',
    description: 'Industry-leading noise cancelling headphones with 30-hour battery life, multipoint connection, and crystal clear hands-free calling.',
    imageUrl: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600&auto=format&fit=crop',
    price: 29990,
    category: 'Electronics',
    stock: 40,
  },
  {
    title: 'Nike Air Max 270',
    description: "Nike's first lifestyle Air Max shoe with a large heel Air unit for all-day comfort. Breathable mesh upper with foam midsole.",
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop',
    price: 12995,
    category: 'Footwear',
    stock: 60,
  },
  {
    title: 'MacBook Air M3',
    description: '13-inch MacBook Air with the powerful M3 chip, 18-hour battery life, 8GB RAM, 256GB SSD. Thin, light, fanless design.',
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop',
    price: 114900,
    category: 'Electronics',
    stock: 15,
  },
  {
    title: 'Levi\'s 501 Original Jeans',
    description: "The original straight fit jean that started it all. Made with 100% cotton denim, featuring the iconic button fly and relaxed through the hip and thigh.",
    imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&auto=format&fit=crop',
    price: 4999,
    category: 'Clothing',
    stock: 100,
  },
  {
    title: 'Atomic Habits — James Clear',
    description: 'The #1 New York Times bestseller. A proven framework for improving every day with tiny changes that deliver remarkable results.',
    imageUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&auto=format&fit=crop',
    price: 599,
    category: 'Books',
    stock: 200,
  },
  {
    title: 'Samsung 4K QLED Smart TV 55"',
    description: '55-inch QLED display with Quantum HDR, 120Hz refresh rate, Alexa built-in, and Gaming Hub. Crystal clear picture quality.',
    imageUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&auto=format&fit=crop',
    price: 79990,
    category: 'Electronics',
    stock: 10,
  },
  {
    title: 'Yoga Mat Premium Anti-Slip',
    description: 'Extra thick 6mm eco-friendly TPE yoga mat with alignment lines. Non-slip surface, moisture-resistant, includes carry strap.',
    imageUrl: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&auto=format&fit=crop',
    price: 1299,
    category: 'Sports',
    stock: 80,
  },
  {
    title: 'Philips Air Fryer HD9252',
    description: 'Rapid Air technology fries, bakes, grills and roasts with little to no oil. 4.1L capacity. Up to 75% less fat. Digital touchscreen.',
    imageUrl: 'https://images.unsplash.com/photo-1648170578698-8b7c3af51f6e?w=600&auto=format&fit=crop',
    price: 8995,
    category: 'Home',
    stock: 35,
  },
  {
    title: 'boAt Rockerz 255 Pro+',
    description: 'Wireless neckband earphones with 60-hour battery, ASAP Charge, ENx noise cancellation, and IPX5 water resistance. Indian brand, global quality.',
    imageUrl: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=600&auto=format&fit=crop',
    price: 1499,
    category: 'Electronics',
    stock: 150,
  },
]

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('✅ Connected to MongoDB')

    await Product.deleteMany({})
    console.log('🗑️  Cleared existing products')

    const inserted = await Product.insertMany(products)
    console.log(`🌱 Seeded ${inserted.length} products successfully!`)
    console.log('\nProducts added:')
    inserted.forEach((p, i) => console.log(`  ${i + 1}. ${p.title} — ₹${p.price}`))

    process.exit(0)
  } catch (err) {
    console.error('❌ Seed failed:', err.message)
    process.exit(1)
  }
}

seed()
