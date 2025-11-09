import React, { useState, useMemo } from "react";

const SAMPLE_PRODUCTS = [
  { id: "gift-001", title: "Lavender Bath Salts - 500g", price: 129.0, image: "https://picsum.photos/seed/bath1/800/600", desc: "Hand-blended lavender bath salts in a glass jar." },
  { id: "gift-002", title: "Goat's Milk Soap Trio", price: 89.0, image: "https://picsum.photos/seed/soap1/800/600", desc: "Three artisanal goat's milk soaps—unscented, honey, and rosemary." },
  { id: "gift-003", title: "Gift Hamper - Local Treats", price: 499.0, image: "https://picsum.photos/seed/hamper1/800/600", desc: "A curated hamper of local delights—perfect for birthdays." },
  { id: "gift-004", title: "Soy Candle - Bergamot", price: 159.0, image: "https://picsum.photos/seed/candle1/800/600", desc: "Hand-poured soy candle with long burn time." },
];

export default function App() {
  const [products] = useState(SAMPLE_PRODUCTS);
  const [cart, setCart] = useState({});
  const [page, setPage] = useState("home"); // home | store | checkout | thanks
  const [customer, setCustomer] = useState({ name: "", email: "bikiplaasklerksdorp@gmail.com", phone: "", address: "" });
  const [loadingCheckout, setLoadingCheckout] = useState(false);

  const addToCart = (product, qty = 1) => {
    setCart((c) => {
      const next = { ...c };
      next[product.id] = (next[product.id] || 0) + qty;
      return next;
    });
  };

  const updateQty = (productId, qty) => {
    setCart((c) => {
      const next = { ...c };
      if (qty <= 0) delete next[productId];
      else next[productId] = qty;
      return next;
    });
  };

  const cartItems = useMemo(() => {
    return Object.entries(cart).map(([id, qty]) => {
      const prod = products.find((p) => p.id === id);
      return { ...prod, qty };
    });
  }, [cart, products]);

  const subtotal = useMemo(() => cartItems.reduce((s, it) => s + it.price * it.qty, 0), [cartItems]);
  const shipping = subtotal > 499 ? 0 : subtotal === 0 ? 0 : 49;
  const total = subtotal + shipping;

  async function handlePayNow(e) {
    e.preventDefault();
    setLoadingCheckout(true);
    try {
      // Demo: simulate checkout success (PayFast sandbox should be added later via server endpoint)
      await new Promise((r) => setTimeout(r, 900));
      setPage("thanks");
      setCart({});
    } catch (err) {
      alert("Checkout failed: " + err.message);
    } finally {
      setLoadingCheckout(false);
    }
  }

  return (
    <div className="app">
      <header className="header">
        <div className="brand">
          <div className="logo">BP</div>
          <div>
            <h1>Biki Plaas Gifts and Decor</h1>
            <div className="slogan">&#8216;n Biki Plaas is goed vir die siel</div>
            <div className="small">www.bikiplaas.co.za</div>
          </div>
        </div>
        <nav className="nav">
          <button onClick={() => setPage("home")}>Home</button>
          <button onClick={() => setPage("store")}>Shop</button>
          <button onClick={() => setPage("checkout")}>Checkout</button>
          <button onClick={() => setPage("checkout")}>Cart ({cartItems.reduce((s, it) => s + it.qty, 0)})</button>
        </nav>
      </header>

      {page === "home" && (
        <section className="hero">
          <div className="hero-inner">
            <div className="hero-text">
              <h2>Biki Plaas Gifts and Decor</h2>
              <p className="hero-slogan">&#8216;n Biki Plaas is goed vir die siel</p>
              <button className="cta" onClick={() => setPage("store")}>Shop Now</button>
            </div>
            <div className="hero-image" aria-hidden="true"></div>
          </div>
        </section>
      )}

      <main className="container">
        {page === "store" && (
          <section>
            <h2>Gift shop</h2>
            <div className="grid">
              {products.map((p) => (
                <article key={p.id} className="card">
                  <img src={p.image} alt={p.title} />
                  <h3>{p.title}</h3>
                  <p className="desc">{p.desc}</p>
                  <div className="row">
                    <div className="price">R{p.price.toFixed(2)}</div>
                    <button onClick={() => addToCart(p, 1)} className="add">Add</button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {page === "checkout" && (
          <section className="checkout">
            <h2>Checkout</h2>
            <div className="cols">
              <form onSubmit={handlePayNow} className="card">
                <h3>Customer details</h3>
                <input required placeholder="Full name" value={customer.name} onChange={(e) => setCustomer({...customer, name: e.target.value})} />
                <input required type="email" placeholder="Email" value={customer.email} onChange={(e) => setCustomer({...customer, email: e.target.value})} />
                <input required placeholder="Phone" value={customer.phone} onChange={(e) => setCustomer({...customer, phone: e.target.value})} />
                <input required placeholder="Shipping address" value={customer.address} onChange={(e) => setCustomer({...customer, address: e.target.value})} />
                <h4>Order summary</h4>
                <div className="summary">
                  {cartItems.length === 0 && <div className="muted">Your cart is empty.</div>}
                  {cartItems.map((it) => (
                    <div key={it.id} className="line">
                      <div>
                        <div className="muted">{it.title} x {it.qty}</div>
                      </div>
                      <div>R{(it.price * it.qty).toFixed(2)}</div>
                    </div>
                  ))}
                  <div className="line"><span>Subtotal</span><span>R{subtotal.toFixed(2)}</span></div>
                  <div className="line"><span>Shipping</span><span>{shipping === 0 ? 'Free' : `R${shipping.toFixed(2)}`}</span></div>
                  <div className="line total"><span>Total</span><span>R{total.toFixed(2)}</span></div>
                </div>
                <div className="actions">
                  <button type="button" onClick={() => setPage('store')}>Continue shopping</button>
                  <button type="submit" disabled={cartItems.length===0 || loadingCheckout}>{loadingCheckout ? 'Processing...' : `Pay R${total.toFixed(2)}`}</button>
                </div>
                <div className="muted small">Demo checkout only — real payments via PayFast require server-side setup.</div>
              </form>

              <aside className="card aside">
                <h4>Cart</h4>
                {cartItems.length === 0 && <div className="muted">No items</div>}
                {cartItems.map((it) => (
                  <div key={it.id} className="cart-line">
                    <img src={it.image} alt={it.title} />
                    <div className="cart-info">
                      <div className="muted">{it.title}</div>
                      <div>R{it.price.toFixed(2)}</div>
                    </div>
                    <div className="qty-controls">
                      <button onClick={() => updateQty(it.id, it.qty-1)}>-</button>
                      <div>{it.qty}</div>
                      <button onClick={() => updateQty(it.id, it.qty+1)}>+</button>
                    </div>
                  </div>
                ))}
                <div className="muted small">Local delivery in South Africa only for now. Contact: bikiplaasklerksdorp@gmail.com</div>
              </aside>
            </div>
          </section>
        )}

        {page === "thanks" && (
          <section className="card">
            <h2>Thank you — order placed</h2>
            <p>We received your order and sent a confirmation to your email.</p>
            <button onClick={() => setPage('store')}>Back to shop</button>
          </section>
        )}

        {page === "home" && (
          <section className="intro">
            <h3>Our cozy collection</h3>
            <p className="muted">Handmade gifts and home décor inspired by farm life.</p>
          </section>
        )}
      </main>

      <footer className="footer">
        <div className="footer-inner">
          <div>© {new Date().getFullYear()} Biki Plaas Gifts and Decor</div>
          <div className="muted small">Email: bikiplaasklerksdorp@gmail.com • <a href="https://www.facebook.com/share/1AovqGKJ5z/" target="_blank" rel="noreferrer">Facebook</a></div>
        </div>
      </footer>
    </div>
  );
}
