import "./Products.css";

const products = [
  { id: 1, name: "Maida", stock: 25, unit: "kg", image: "https://images.unsplash.com/photo-1627485937980-221c88ac04f9?auto=format&fit=crop&w=500&q=80" },
  { id: 2, name: "Sugar", stock: 18, unit: "kg", image: "https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&w=500&q=80" },
  { id: 3, name: "Eggs", stock: 120, unit: "pieces", image: "https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?auto=format&fit=crop&w=500&q=80" },
  { id: 4, name: "Butter", stock: 8, unit: "kg", image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=500&q=80" },
  { id: 5, name: "Dark Chocolate", stock: 3, unit: "kg", image: "https://images.unsplash.com/photo-1548907040-4d42a7e8b8e5?auto=format&fit=crop&w=500&q=80" },
  { id: 6, name: "Cocoa Powder", stock: 6, unit: "kg", image: "https://images.unsplash.com/photo-1610611424854-5e070321c9d8?auto=format&fit=crop&w=500&q=80" },
  { id: 7, name: "Whipping Cream", stock: 10, unit: "litres", image: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=500&q=80" },
  { id: 8, name: "Milk", stock: 15, unit: "litres", image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=500&q=80" },
  { id: 9, name: "Baking Powder", stock: 4, unit: "kg", image: "https://images.unsplash.com/photo-1608198093002-ad4e0054843c?auto=format&fit=crop&w=500&q=80" },
  { id: 10, name: "Baking Soda", stock: 2, unit: "kg", image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=500&q=80" },
  { id: 11, name: "Icing Sugar", stock: 7, unit: "kg", image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=500&q=80" },
  { id: 12, name: "Vanilla Essence", stock: 12, unit: "bottles", image: "https://images.unsplash.com/photo-1599909533606-4a8e9f0a5f3b?auto=format&fit=crop&w=500&q=80" },
  { id: 13, name: "Strawberries", stock: 5, unit: "kg", image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=500&q=80" },
  { id: 14, name: "Mango", stock: 8, unit: "kg", image: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=500&q=80" },
  { id: 15, name: "Pineapple", stock: 6, unit: "kg", image: "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=500&q=80" },
  { id: 16, name: "Cherries", stock: 3, unit: "kg", image: "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=500&q=80" },
  { id: 17, name: "Almonds", stock: 4, unit: "kg", image: "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=500&q=80" },
  { id: 18, name: "Cashews", stock: 3, unit: "kg", image: "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=500&q=80" },
  { id: 19, name: "Pistachios", stock: 2, unit: "kg", image: "https://images.unsplash.com/photo-1505576399274-565b52d4ac71?auto=format&fit=crop&w=500&q=80" },
  { id: 20, name: "Cake Sprinkles", stock: 3, unit: "kg", image: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?auto=format&fit=crop&w=500&q=80" },
  { id: 21, name: "Fondant", stock: 5, unit: "kg", image: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&w=500&q=80" },
  { id: 22, name: "Food Colours", stock: 20, unit: "bottles", image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=500&q=80" },
  { id: 23, name: "Chocolate Chips", stock: 4, unit: "kg", image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=500&q=80" },
  { id: 24, name: "Caramel Syrup", stock: 5, unit: "bottles", image: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=500&q=80" },
  { id: 25, name: "Cream Cheese", stock: 4, unit: "kg", image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=500&q=80" },
  { id: 26, name: "Coconut Powder", stock: 3, unit: "kg", image: "https://images.unsplash.com/photo-1556761223-4c4282c73f77?auto=format&fit=crop&w=500&q=80" },
  { id: 27, name: "Raisins", stock: 3, unit: "kg", image: "https://images.unsplash.com/photo-1596591606975-97ee5cef3a1e?auto=format&fit=crop&w=500&q=80" },
  { id: 28, name: "Cake Boards", stock: 100, unit: "pieces", image: "https://images.unsplash.com/photo-1603532648955-039310d9ed75?auto=format&fit=crop&w=500&q=80" },
  { id: 29, name: "Cake Boxes", stock: 80, unit: "pieces", image: "https://images.unsplash.com/photo-1607344645866-009c320b63e0?auto=format&fit=crop&w=500&q=80" },
  { id: 30, name: "Piping Bags", stock: 50, unit: "pieces", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=500&q=80" }
];

function Product({ onDashboard }) {
  return (
    <div className="product-page">
      <div className="product-header">
        <div>
          <h1>Bakery Products</h1>
          <p>Manage cake ingredients and available stock</p>
        </div>

        {onDashboard && (
          <button
            className="product-back-btn"
            onClick={onDashboard}
          >
            Back to Dashboard
          </button>
        )}
      </div>

      <div className="product-count">
        Total Materials: <strong>{products.length}</strong>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img
              className="product-image"
              src={product.image}
              alt={product.name}
              loading="lazy"
              onError={(e) => {
                e.currentTarget.style.visibility = "hidden";
              }}
            />

            <div className="product-info">
              <h3>{product.name}</h3>

              <p className="product-stock">
                Stock: <strong>{product.stock} {product.unit}</strong>
              </p>

              <span
                className={`product-status ${
                  product.stock <= 3 ? "low-stock" : "in-stock"
                }`}
              >
                {product.stock <= 3 ? "Low Stock" : "In Stock"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Product;