import { useState } from "react";
import "./NewOrder.css";

const products = [
  "Chocolate Truffle Cake",
  "Black Forest Cake",
  "Red Velvet Cake",
  "White Forest Cake",
  "Vanilla Cake",
  "Strawberry Cake",
  "Butterscotch Cake",
  "Pineapple Cake",
  "Blueberry Cake",
  "Oreo Chocolate Cake",
  "Chocolate",
  "Sweets",
  "Cold Drinks",
  "Snacks"
];

export default function NewOrder({ onDashboard }) {
  const [form, setForm] = useState({
    customer: "",
    mobile: "",
    product: products[0],
    quantity: "1",
    weight: "1 Kg",
    customization: "",
    message: "",
    deliveryDate: "",
    total: "",
    advance: ""
  });

  const [referenceImage, setReferenceImage] = useState(null);
  const [orders, setOrders] = useState([]);
  const [saved, setSaved] = useState(false);

  const total = Number(form.total) || 0;
  const advance = Number(form.advance) || 0;
  const balance = total - advance;

  function handleChange(e) {
    const { name, value } = e.target;
    setSaved(false);

    setForm((old) => ({
      ...old,
      [name]: value
    }));
  }

  function handleImage(e) {
    const file = e.target.files?.[0];

    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Please select an image smaller than 5 MB.");
      e.target.value = "";
      return;
    }

    setReferenceImage(file);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (advance > total) {
      alert("Advance amount cannot exceed total amount.");
      return;
    }

    const order = {
      id: `ORD-${String(orders.length + 1).padStart(3, "0")}`,
      ...form,
      total,
      advance,
      balance,
      status: "Pending",
      imageName: referenceImage?.name || "No image"
    };

    setOrders((old) => [order, ...old]);
    setSaved(true);

    setForm({
      customer: "",
      mobile: "",
      product: products[0],
      quantity: "1",
      weight: "1 Kg",
      customization: "",
      message: "",
      deliveryDate: "",
      total: "",
      advance: ""
    });

    setReferenceImage(null);

    const uploadInput = document.getElementById("order-reference-image");
    if (uploadInput) uploadInput.value = "";
  }

  function resetForm() {
    setForm({
      customer: "",
      mobile: "",
      product: products[0],
      quantity: "1",
      weight: "1 Kg",
      customization: "",
      message: "",
      deliveryDate: "",
      total: "",
      advance: ""
    });

    setReferenceImage(null);
    setSaved(false);
  }

  return (
    <main className="new-order-page">
      <header className="order-topbar">
        <div className="order-brand">
          <div className="order-brand-icon">🥐</div>
          <div>
            <h1>Bakery <span>Studio</span></h1>
            <p>ORDER MANAGEMENT</p>
          </div>
        </div>

        <button
          type="button"
          className="order-back-btn"
          onClick={onDashboard}
        >
          ← Dashboard
        </button>
      </header>

      <section className="order-banner">
        <span>BAKERY MANAGEMENT SYSTEM</span>
        <h2>Create New Order</h2>
        <p>Manage customer orders and create something delicious.</p>
      </section>

      {saved && (
        <div className="order-success">
          ✓ Order saved successfully!
        </div>
      )}

      <form className="order-form" onSubmit={handleSubmit}>
        <section className="order-panel">
          <div className="order-section-title">
            <span className="order-number">01</span>
            <div>
              <h3>Customer Details</h3>
              <p>Enter customer contact information.</p>
            </div>
          </div>

          <div className="order-fields">
            <label>
              Customer Name *
              <input
                name="customer"
                value={form.customer}
                onChange={handleChange}
                placeholder="Enter full name"
                required
              />
            </label>

            <label>
              Mobile Number *
              <input
                name="mobile"
                type="tel"
                pattern="[0-9]{10}"
                maxLength={10}
                value={form.mobile}
                onChange={handleChange}
                placeholder="10-digit mobile number"
                required
              />
            </label>
          </div>
        </section>

        <section className="order-panel">
          <div className="order-section-title">
            <span className="order-number">02</span>
            <div>
              <h3>Product Details</h3>
              <p>Select the product and customise the order.</p>
            </div>
          </div>

          <div className="order-fields">
            <label>
              Select Product *
              <select
                name="product"
                value={form.product}
                onChange={handleChange}
                required
              >
                {products.map((product) => (
                  <option key={product} value={product}>
                    {product}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Quantity *
              <input
                name="quantity"
                type="number"
                min="1"
                max="100"
                value={form.quantity}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Cake Weight
              <select
                name="weight"
                value={form.weight}
                onChange={handleChange}
              >
                <option>500 g</option>
                <option>1 Kg</option>
                <option>1.5 Kg</option>
                <option>2 Kg</option>
                <option>3 Kg</option>
                <option>5 Kg</option>
                <option>Not Applicable</option>
              </select>
            </label>

            <label>
              Delivery Date *
              <input
                name="deliveryDate"
                type="date"
                min={new Date().toLocaleDateString("en-CA")}
                value={form.deliveryDate}
                onChange={handleChange}
                required
              />
            </label>

            <label className="full-field">
              Customization Notes
              <textarea
                name="customization"
                value={form.customization}
                onChange={handleChange}
                placeholder="Design, flavour, colours, decorations..."
                rows="3"
              />
            </label>

            <label className="full-field">
              Message on Cake
              <input
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Happy Birthday, Congratulations..."
              />
            </label>

            <label className="full-field">
              Upload Reference Image
              <input
                id="order-reference-image"
                type="file"
                accept="image/*"
                onChange={handleImage}
              />
              <small>Optional image · Maximum 5 MB</small>
              {referenceImage && (
                <span className="selected-file">
                  Selected: {referenceImage.name}
                </span>
              )}
            </label>
          </div>
        </section>

        <section className="order-panel">
          <div className="order-section-title">
            <span className="order-number">03</span>
            <div>
              <h3>Payment Details</h3>
              <p>Enter the total price and advance payment.</p>
            </div>
          </div>

          <div className="order-fields">
            <label>
              Total Amount (₹) *
              <input
                name="total"
                type="number"
                min="1"
                value={form.total}
                onChange={handleChange}
                placeholder="Enter total amount"
                required
              />
            </label>

            <label>
              Advance Amount (₹)
              <input
                name="advance"
                type="number"
                min="0"
                max={total}
                value={form.advance}
                onChange={handleChange}
                placeholder="Enter advance"
              />
            </label>
          </div>

          <div className="order-balance">
            <div>
              <span>Total Amount</span>
              <strong>₹{total.toLocaleString("en-IN")}</strong>
            </div>

            <div>
              <span>Advance Paid</span>
              <strong>₹{advance.toLocaleString("en-IN")}</strong>
            </div>

            <div className="balance-due">
              <span>Remaining Balance</span>
              <strong>
                ₹{balance >= 0 ? balance.toLocaleString("en-IN") : "—"}
              </strong>
            </div>
          </div>

          {balance < 0 && (
            <p className="order-error">
              Advance amount cannot exceed total amount.
            </p>
          )}
        </section>

        <div className="order-actions">
          <button
            type="button"
            className="order-cancel-btn"
            onClick={resetForm}
          >
            Clear Form
          </button>

          <button type="submit" className="order-save-btn">
            ✓ Save Order
          </button>
        </div>
      </form>

      <section className="order-panel saved-orders">
        <div className="order-section-title">
          <span className="order-number">04</span>
          <div>
            <h3>Recent Orders</h3>
            <p>Orders saved during this session.</p>
          </div>
        </div>

        {orders.length === 0 ? (
          <p className="order-empty">
            No orders yet. Fill out the form above and click Save Order.
          </p>
        ) : (
          <div className="order-table-wrap">
            <table className="order-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Product</th>
                  <th>Delivery</th>
                  <th>Total</th>
                  <th>Balance</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.customer}</td>
                    <td>{order.product}</td>
                    <td>{order.deliveryDate}</td>
                    <td>₹{order.total}</td>
                    <td>₹{order.balance}</td>
                    <td>
                      <span className="order-status">
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <footer className="order-footer">
        🥐 Bakery Studio · Order Management
      </footer>
    </main>
  );
}