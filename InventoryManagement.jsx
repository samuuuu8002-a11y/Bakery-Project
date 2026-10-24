
import { useState } from "react";
import "./InventoryManagement.css";

const initialInventory = [
  {
    id: "INV-001",
    name: "Chocolate Truffle Cake",
    category: "Cakes",
    stock: 18,
    price: 599,
  },
  {
    id: "INV-002",
    name: "Black Forest Cake",
    category: "Cakes",
    stock: 12,
    price: 649,
  },
  {
    id: "INV-003",
    name: "Red Velvet Cake",
    category: "Cakes",
    stock: 4,
    price: 799,
  },
  {
    id: "INV-004",
    name: "Vanilla Cake",
    category: "Cakes",
    stock: 0,
    price: 499,
  },
];

function InventoryManagement({ onDashboard }) {
  const [inventory, setInventory] = useState(initialInventory);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [newItem, setNewItem] = useState({
    name: "",
    category: "Cakes",
    stock: "",
    price: "",
  });

  const totalProducts = inventory.length;
  const inStock = inventory.filter((item) => item.stock > 5).length;
  const lowStock = inventory.filter(
    (item) => item.stock > 0 && item.stock <= 5
  ).length;
  const outOfStock = inventory.filter((item) => item.stock === 0).length;

  const filteredInventory = inventory.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.id.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase())
  );

  const getStatus = (stock) => {
    if (stock === 0) return "Out of Stock";
    if (stock <= 5) return "Low Stock";
    return "In Stock";
  };

  const updateStock = (id, change) => {
    setInventory((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, stock: Math.max(0, item.stock + change) }
          : item
      )
    );
  };

  const handleAddItem = (e) => {
    e.preventDefault();

    if (!newItem.name.trim() || newItem.stock === "" || newItem.price === "") {
      alert("Please fill in all fields.");
      return;
    }

    const stock = Number(newItem.stock);
    const price = Number(newItem.price);

    if (
      !Number.isFinite(stock) ||
      !Number.isInteger(stock) ||
      stock < 0 ||
      !Number.isFinite(price) ||
      price < 0
    ) {
      alert("Enter a valid stock quantity and price.");
      return;
    }

    const item = {
      id: `INV-${String(Date.now()).slice(-6)}`,
      name: newItem.name.trim(),
      category: newItem.category,
      stock,
      price,
    };

    setInventory((items) => [...items, item]);
    setNewItem({
      name: "",
      category: "Cakes",
      stock: "",
      price: "",
    });
    setShowForm(false);
  };

  return (
    <div className="inventory-page">
      <div className="inventory-header">
        <div>
          <span className="inventory-eyebrow">BAKERY ADMINISTRATION</span>
          <h1>Inventory Management</h1>
          <p>Manage your bakery products and stock levels.</p>
        </div>

        <button
          className="inventory-back-btn"
          onClick={onDashboard}
          type="button"
        >
          ← Back to Dashboard
        </button>
      </div>

      <div className="inventory-stats">
        <div className="inventory-stat-card">
          <span className="inventory-stat-icon">📦</span>
          <p>Total Products</p>
          <h2>{totalProducts}</h2>
          <span>Products in inventory</span>
        </div>

        <div className="inventory-stat-card">
          <span className="inventory-stat-icon">✅</span>
          <p>In Stock</p>
          <h2>{inStock}</h2>
          <span>Stock above 5 units</span>
        </div>

        <div className="inventory-stat-card">
          <span className="inventory-stat-icon">⚠️</span>
          <p>Low Stock</p>
          <h2>{lowStock}</h2>
          <span>Needs restocking</span>
        </div>

        <div className="inventory-stat-card">
          <span className="inventory-stat-icon">🚫</span>
          <p>Out of Stock</p>
          <h2>{outOfStock}</h2>
          <span>Currently unavailable</span>
        </div>
      </div>

      {lowStock + outOfStock > 0 && (
        <div className="inventory-alert">
          <span>⚠️</span>
          <div>
            <strong>Stock Alert</strong>
            <p>
              {lowStock + outOfStock} product(s) need your attention.
              Please review stock levels below.
            </p>
          </div>
        </div>
      )}

      <section className="inventory-panel">
        <div className="inventory-panel-header">
          <div>
            <h2>Product Inventory</h2>
            <p>View and update the available stock of your products.</p>
          </div>

          <button
            className="inventory-add-btn"
            onClick={() => setShowForm(!showForm)}
            type="button"
          >
            {showForm ? "Cancel" : "+ Add Inventory"}
          </button>
        </div>

        {showForm && (
          <form className="inventory-form" onSubmit={handleAddItem}>
            <h3>Add New Inventory Item</h3>

            <div className="inventory-form-grid">
              <label>
                Product Name
                <input
                  type="text"
                  placeholder="Enter product name"
                  value={newItem.name}
                  onChange={(e) =>
                    setNewItem({ ...newItem, name: e.target.value })
                  }
                  required
                />
              </label>

              <label>
                Category
                <select
                  value={newItem.category}
                  onChange={(e) =>
                    setNewItem({ ...newItem, category: e.target.value })
                  }
                >
                  <option value="Cakes">Cakes</option>
                  <option value="Pastries">Pastries</option>
                  <option value="Bread">Bread</option>
                  <option value="Ingredients">Ingredients</option>
                  <option value="Other">Other</option>
                </select>
              </label>

              <label>
                Stock Quantity
                <input
                  type="number"
                  min="0"
                  step="1"
                  placeholder="Enter quantity"
                  value={newItem.stock}
                  onChange={(e) =>
                    setNewItem({ ...newItem, stock: e.target.value })
                  }
                  required
                />
              </label>

              <label>
                Price (₹)
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="Enter price"
                  value={newItem.price}
                  onChange={(e) =>
                    setNewItem({ ...newItem, price: e.target.value })
                  }
                  required
                />
              </label>
            </div>

            <button className="inventory-save-btn" type="submit">
              Save Inventory
            </button>
          </form>
        )}

        <div className="inventory-toolbar">
          <input
            type="search"
            placeholder="Search product, category or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search inventory"
          />
          <span>{filteredInventory.length} products found</span>
        </div>

        <div className="inventory-table-wrapper">
          <table className="inventory-table">
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Product Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Available Stock</th>
                <th>Status</th>
                <th>Update Stock</th>
              </tr>
            </thead>

            <tbody>
              {filteredInventory.map((item) => (
                <tr key={item.id}>
                  <td className="inventory-id">{item.id}</td>
                  <td>
                    <strong>{item.name}</strong>
                  </td>
                  <td>{item.category}</td>
                  <td>₹{item.price.toLocaleString("en-IN")}</td>
                  <td>
                    <strong>{item.stock}</strong> units
                  </td>
                  <td>
                    <span
                      className={`inventory-status ${
                        item.stock === 0
                          ? "status-out"
                          : item.stock <= 5
                          ? "status-low"
                          : "status-in"
                      }`}
                    >
                      {getStatus(item.stock)}
                    </span>
                  </td>
                  <td>
                    <div className="inventory-stock-controls">
                      <button
                        type="button"
                        onClick={() => updateStock(item.id, -1)}
                        disabled={item.stock === 0}
                        aria-label={`Decrease ${item.name} stock`}
                      >
                        −
                      </button>
                      <button
                        type="button"
                        onClick={() => updateStock(item.id, 1)}
                        aria-label={`Increase ${item.name} stock`}
                      >
                        +
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredInventory.length === 0 && (
                <tr>
                  <td colSpan="7" className="inventory-empty">
                    No inventory products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <p className="inventory-note">
          Note: This page currently uses demo data. Changes are kept in React
          state and will reset when the page is refreshed.
        </p>
      </section>
    </div>
  );
}

export default InventoryManagement;
