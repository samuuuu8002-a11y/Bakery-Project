import { useState } from "react";

const photo = (id) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=600&q=80`;

const cakeData = [
  ["Chocolate Truffle", 599, "Chocolate", "Rich chocolate truffle cream", "photo-1578985545062-69928b1d9587"],
  ["Black Forest", 649, "Chocolate", "Chocolate, cream and cherries", "photo-1571115177098-24ec42ed204d"],
  ["Red Velvet", 799, "Red Velvet", "Red velvet with cream frosting", "photo-1586985289688-ca3cf47d3e6e"],
  ["Vanilla Bean", 549, "Vanilla", "Classic vanilla cream cake", "photo-1464349095431-e9a21285b5f3"],
  ["Butterscotch", 599, "Classic", "Caramel and butterscotch crunch", "photo-1558636508-e0db3814bd1d"],
  ["Strawberry Delight", 649, "Fruit", "Strawberry and fresh cream", "photo-1488477181946-6428a0291777"],
  ["Mango Mania", 649, "Fruit", "Sweet mango cream cake", "photo-1563729784474-d77dbb933a9e"],
  ["Pineapple Cake", 549, "Fruit", "Pineapple with whipped cream", "photo-1588195538326-c5b1e9f80a1b"],
  ["Blueberry Bliss", 699, "Fruit", "Blueberry and vanilla sponge", "photo-1565958011703-44f9829ba187"],
  ["Oreo Delight", 649, "Chocolate", "Oreo and chocolate cream", "photo-1606313564200-e75d5e30476c"],
  ["Ferrero Rocher", 899, "Chocolate", "Hazelnut chocolate indulgence", "photo-1578985545062-69928b1d9587"],
  ["KitKat Cake", 849, "Chocolate", "Chocolate with KitKat topping", "photo-1571115177098-24ec42ed204d"],
  ["Nutella Cake", 799, "Chocolate", "Rich Nutella chocolate cake", "photo-1606890737304-57a1ca8a5b62"],
  ["Dream Cake", 699, "Chocolate", "Layers of chocolate and cream", "photo-1578985545062-69928b1d9587"],
  ["Tiramisu Cake", 749, "Classic", "Coffee-flavoured Italian cake", "photo-1571877227200-a0d98ea607e9"],
  ["Carrot Cake", 649, "Classic", "Carrot with cream cheese frosting", "photo-1565958011703-44f9829ba187"],
  ["Lemon Cake", 599, "Fruit", "Tangy lemon and vanilla sponge", "photo-1464349095431-e9a21285b5f3"],
  ["Mocha Cake", 699, "Chocolate", "Coffee and chocolate blend", "photo-1606313564200-e75d5e30476c"],
  ["Coffee Cake", 649, "Classic", "Coffee cream with soft sponge", "photo-1571877227200-a0d98ea607e9"],
  ["Rasmalai Cake", 749, "Classic", "Indian rasmalai-inspired flavour", "photo-1578985545062-69928b1d9587"],
  ["Gulab Jamun Cake", 799, "Classic", "Gulab jamun fusion cake", "photo-1563729784474-d77dbb933a9e"],
  ["Malai Cake", 749, "Classic", "Rich malai flavour with nuts", "photo-1464349095431-e9a21285b5f3"],
  ["Biscoff Cake", 699, "Classic", "Caramel biscuit flavour", "photo-1571115177098-24ec42ed204d"],
  ["Raspberry Cake", 749, "Fruit", "Raspberry and fresh cream", "photo-1488477181946-6428a0291777"],
  ["Orange Cake", 649, "Fruit", "Citrus cream and soft sponge", "photo-1563729784474-d77dbb933a9e"],
  ["Chocolate Cheesecake", 699, "Chocolate", "Chocolate cheesecake layers", "photo-1606313564200-e75d5e30476c"],
  ["White Forest", 649, "Vanilla", "White chocolate and cherries", "photo-1464349095431-e9a21285b5f3"],
  ["Devils Food Cake", 699, "Chocolate", "Rich chocolate fudge", "photo-1578985545062-69928b1d9587"],
  ["Irish Cream Cake", 749, "Classic", "Creamy coffee and chocolate", "photo-1571877227200-a0d98ea607e9"],
  ["Hazelnut Cake", 799, "Chocolate", "Roasted hazelnut flavour", "photo-1606890737304-57a1ca8a5b62"],
  ["Cookies and Cream", 649, "Chocolate", "Cookies with vanilla cream", "photo-1606313564200-e75d5e30476c"],
  ["Peanut Butter Cake", 699, "Chocolate", "Peanut butter and chocolate", "photo-1571115177098-24ec42ed204d"],
  ["Honey Cake", 649, "Classic", "Honey and soft sponge", "photo-1464349095431-e9a21285b5f3"],
  ["Chocolate Mocha", 749, "Chocolate", "Chocolate with coffee cream", "photo-1606313564200-e75d5e30476c"],
  ["Almond Cake", 699, "Classic", "Almond and vanilla flavour", "photo-1563729784474-d77dbb933a9e"],
  ["Lychee Cake", 749, "Fruit", "Lychee with fresh cream", "photo-1488477181946-6428a0291777"],
  ["Passion Fruit Cake", 699, "Fruit", "Tropical passion fruit flavour", "photo-1563729784474-d77dbb933a9e"],
  ["Mixed Fruit Cake", 649, "Fruit", "Mixed fruits and cream", "photo-1488477181946-6428a0291777"],
  ["Chocolate Fudge", 699, "Chocolate", "Rich chocolate fudge layers", "photo-1578985545062-69928b1d9587"],
  ["Custom Cake", 999, "Custom", "Personalized celebration cake", "photo-1535141192574-5d4897c12636"]
];

const cakes = cakeData.map((item, index) => ({
  id: index + 1,
  name: item[0],
  price: item[1],
  category: item[2],
  description: item[3],
  image: photo(item[4])
}));

const categories = [
  "All",
  "Chocolate",
  "Vanilla",
  "Red Velvet",
  "Fruit",
  "Classic",
  "Custom"
];

export default function Cake({ onOrderNow }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("");

  const filteredCakes = cakes.filter((cake) => {
    const matchesSearch = cake.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || cake.category === category;

    return matchesSearch && matchesCategory;
  });

  function orderCake(cake) {
    const newOrder = {
      ...cake,
      orderId: `ORD-${Date.now()}`,
      quantity: 1,
      status: "Pending",
      orderDate: new Date().toLocaleDateString("en-IN")
    };

    if (onOrderNow) {
      onOrderNow(newOrder);
    } else {
      setOrders((previous) => [newOrder, ...previous]);
    }

    setMessage(`${cake.name} added to your orders!`);
  }

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div>
          <p style={styles.eyebrow}>BAKERY SHOP / CUSTOMER PORTAL</p>
          <h1 style={styles.title}>Cake Collection</h1>
          <p style={styles.subtitle}>
            Freshly baked cakes for your special moments.
          </p>
        </div>

        <span style={styles.count}>{filteredCakes.length} Cakes</span>
      </header>

      <div style={styles.toolbar}>
        <input
          style={styles.search}
          type="search"
          placeholder="Search cakes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          style={styles.select}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      {message && (
        <p style={styles.message} role="status">
          ✓ {message}
        </p>
      )}

      <p style={styles.results}>
        Showing {filteredCakes.length} of 40 cakes
      </p>

      <div style={styles.grid}>
        {filteredCakes.map((cake) => (
          <article key={cake.id} style={styles.card}>
            <img
              src={cake.image}
              alt={cake.name}
              loading="lazy"
              style={styles.image}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src =
                  "https://placehold.co/600x400/f0e2d3/542d35?text=Cake+Photo";
              }}
            />

            <div style={styles.cardBody}>
              <span style={styles.category}>{cake.category}</span>
              <h3 style={styles.cakeName}>{cake.name}</h3>
              <p style={styles.description}>{cake.description}</p>

              <div style={styles.cardBottom}>
                <strong style={styles.price}>₹{cake.price}</strong>

                <button
                  type="button"
                  style={styles.button}
                  onClick={() => orderCake(cake)}
                >
                  🛒 Order Now
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {filteredCakes.length === 0 && (
        <p style={styles.empty}>No cakes found. Try another search.</p>
      )}

      {!onOrderNow && (
        <section style={styles.ordersSection}>
          <h2 style={styles.ordersTitle}>My Orders ({orders.length})</h2>

          {orders.length === 0 ? (
            <p>Your ordered cakes will appear here.</p>
          ) : (
            orders.map((order) => (
              <div key={order.orderId} style={styles.orderRow}>
                <div>
                  <strong>{order.name}</strong>
                  <p style={styles.orderInfo}>
                    {order.orderId} · {order.orderDate}
                  </p>
                </div>
                <strong>₹{order.price}</strong>
                <span style={styles.pending}>{order.status}</span>
              </div>
            ))
          )}
        </section>
      )}
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    padding: "28px",
    background: "#faf6f0",
    color: "#432b27",
    fontFamily: "Arial, sans-serif",
    boxSizing: "border-box"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "16px",
    marginBottom: "24px"
  },
  eyebrow: {
    color: "#9a6b50",
    fontSize: "12px",
    fontWeight: "bold",
    letterSpacing: "2px"
  },
  title: {
    margin: "8px 0",
    fontSize: "32px",
    color: "#542d35"
  },
  subtitle: { color: "#806b61", margin: 0 },
  count: {
    background: "#542d35",
    color: "#fff",
    borderRadius: "9px",
    padding: "12px 18px",
    fontWeight: "bold"
  },
  toolbar: {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
    marginBottom: "18px"
  },
  search: {
    flex: "1",
    minWidth: "180px",
    padding: "13px",
    border: "1px solid #dfcec0",
    borderRadius: "8px",
    fontSize: "14px"
  },
  select: {
    minWidth: "155px",
    padding: "13px",
    border: "1px solid #dfcec0",
    borderRadius: "8px",
    background: "#fff"
  },
  message: {
    padding: "12px",
    borderRadius: "8px",
    background: "#e8f4e7",
    color: "#28643a"
  },
  results: { color: "#806b61", fontSize: "13px" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px"
  },
  card: {
    background: "#fff",
    border: "1px solid #eee1d6",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 4px 14px #542d3510"
  },
  image: {
    display: "block",
    width: "100%",
    height: "180px",
    objectFit: "cover",
    background: "#f0e2d3"
  },
  cardBody: { padding: "16px" },
  category: {
    color: "#9a6b50",
    fontSize: "11px",
    textTransform: "uppercase",
    fontWeight: "bold",
    letterSpacing: "1px"
  },
  cakeName: { margin: "9px 0", color: "#542d35", fontSize: "18px" },
  description: {
    color: "#806b61",
    fontSize: "13px",
    minHeight: "36px",
    lineHeight: 1.5
  },
  cardBottom: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "10px",
    marginTop: "14px"
  },
  price: { fontSize: "19px", color: "#542d35" },
  button: {
    border: "none",
    borderRadius: "7px",
    background: "#542d35",
    color: "white",
    padding: "10px 12px",
    cursor: "pointer",
    fontWeight: "bold"
  },
  empty: { padding: "30px", textAlign: "center" },
  ordersSection: {
    marginTop: "32px",
    padding: "20px",
    background: "#fff",
    borderRadius: "12px"
  },
  ordersTitle: { color: "#542d35" },
  orderRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "12px",
    padding: "14px 0",
    borderBottom: "1px solid #eee1d6"
  },
  orderInfo: { color: "#806b61", fontSize: "12px" },
  pending: {
    background: "#fff0d6",
    color: "#8c5a12",
    borderRadius: "6px",
    padding: "6px 10px",
    fontSize: "12px"
  }
};