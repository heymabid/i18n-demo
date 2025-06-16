import Link from 'next/link'

// Simulated product data (would normally come from an API/database)
const products = [
  {
    id: 1,
    name: "MacBook Pro 16-inch",
    description: "The most powerful MacBook Pro ever is here. With the blazing-fast M3 Max chip, up to 22 hours of battery life, and a stunning Liquid Retina XDR display.",
    price: 2399.99,
    originalPrice: 2599.99,
    category: "Laptops",
    brand: "Apple",
    inStock: true,
    rating: 4.8,
    reviews: 1247,
    features: ["M3 Max chip", "16GB RAM", "512GB SSD", "16-inch Liquid Retina XDR display"]
  },
  {
    id: 2,
    name: "iPhone 15 Pro Max",
    description: "The ultimate iPhone experience with titanium design, powerful A17 Pro chip, and the most advanced Pro camera system ever.",
    price: 1199.99,
    originalPrice: null,
    category: "Smartphones",
    brand: "Apple",
    inStock: true,
    rating: 4.7,
    reviews: 2156,
    features: ["A17 Pro chip", "256GB storage", "Pro camera system", "Titanium design"]
  },
  {
    id: 3,
    name: "AirPods Pro (3rd Gen)",
    description: "Immersive audio experience with Active Noise Cancellation, Transparency mode, and Spatial Audio with dynamic head tracking.",
    price: 249.99,
    originalPrice: 279.99,
    category: "Audio",
    brand: "Apple",
    inStock: true,
    rating: 4.6,
    reviews: 892,
    features: ["Active Noise Cancellation", "Spatial Audio", "Up to 6 hours listening time", "MagSafe charging case"]
  },
  {
    id: 4,
    name: "Dell XPS 13 Plus",
    description: "Precision-crafted premium laptop with stunning 13.4-inch InfinityEdge display and latest Intel processors for exceptional performance.",
    price: 1299.99,
    originalPrice: 1399.99,
    category: "Laptops",
    brand: "Dell",
    inStock: false,
    rating: 4.4,
    reviews: 543,
    features: ["Intel Core i7", "16GB RAM", "512GB SSD", "13.4-inch InfinityEdge display"]
  },
  {
    id: 5,
    name: "Samsung Galaxy S24 Ultra",
    description: "The most advanced Galaxy smartphone with built-in S Pen, 200MP camera, and Galaxy AI for enhanced productivity and creativity.",
    price: 1199.99,
    originalPrice: null,
    category: "Smartphones",
    brand: "Samsung",
    inStock: true,
    rating: 4.5,
    reviews: 1698,
    features: ["S Pen included", "200MP camera", "Galaxy AI", "6.8-inch Dynamic AMOLED display"]
  },
  {
    id: 6,
    name: "Sony WH-1000XM5",
    description: "Industry-leading noise canceling headphones with exceptional sound quality, 30-hour battery life, and multipoint connection.",
    price: 399.99,
    originalPrice: 449.99,
    category: "Audio",
    brand: "Sony",
    inStock: true,
    rating: 4.7,
    reviews: 1034,
    features: ["Industry-leading noise canceling", "30-hour battery life", "Multipoint connection", "Hi-Res Audio"]
  }
]

const categories = ["All", "Laptops", "Smartphones", "Audio"]

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Our Products</h1>
              <p className="text-gray-600 mt-2">Discover our curated selection of premium technology products</p>
            </div>
            <Link 
              href="/" 
              className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  category === "All" 
                    ? "bg-blue-600 text-white" 
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
              {/* Product Image Placeholder */}
              <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500 text-lg">{product.name}</span>
              </div>

              {/* Product Info */}
              <div className="p-6">
                {/* Brand & Category */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-blue-600">{product.brand}</span>
                  <span className="text-sm text-gray-500">{product.category}</span>
                </div>

                {/* Product Name */}
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>

                {/* Description */}
                <p className="text-gray-600 mb-4 text-sm line-clamp-3">{product.description}</p>

                {/* Features */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Key Features:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {product.features.slice(0, 2).map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Rating */}
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <span 
                        key={i} 
                        className={`text-sm ${i < Math.floor(product.rating) ? 'text-yellow-500' : 'text-gray-300'}`}
                      >
                        ★
                      </span>
                    ))}
                    <span className="text-sm text-gray-600 ml-2">
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-lg text-gray-500 line-through ml-2">${product.originalPrice}</span>
                    )}
                  </div>
                  {product.originalPrice && (
                    <span className="text-sm bg-red-100 text-red-800 px-2 py-1 rounded-full">
                      Save ${(product.originalPrice - product.price).toFixed(2)}
                    </span>
                  )}
                </div>

                {/* Stock Status */}
                <div className="mb-4">
                  <span className={`text-sm font-medium ${
                    product.inStock ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {product.inStock ? '✓ In Stock' : '✗ Out of Stock'}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button 
                    className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                      product.inStock 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    disabled={!product.inStock}
                  >
                    {product.inStock ? 'Add to Cart' : 'Notify Me'}
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    ♡
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
            Load More Products
          </button>
        </div>

        {/* Product Statistics */}
        <div className="mt-16 bg-white rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Shop With Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">1000+</div>
              <div className="text-gray-600">Products Available</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">50+</div>
              <div className="text-gray-600">Trusted Brands</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
              <div className="text-gray-600">Customer Support</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">Free</div>
              <div className="text-gray-600">Shipping Worldwide</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 
