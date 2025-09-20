// =========================
// BlueNest JS — Products, Cart, Planner, Mobile Menu
// =========================

// =========================
// Product Data
// =========================
const products = [
  { id: 1, name: "Cozy Mug", price: 3500, image: "assets/images/mug.svg" },
  { id: 2, name: "Smart Lamp", price: 12000, image: "assets/images/lamp.svg" },
  { id: 3, name: "BlueNest Tee", price: 8000, image: "assets/images/shirt.svg" },
  { id: 4, name: "Fast Charger", price: 5000, image: "assets/images/charger.svg" },
];

// =========================
// Render Products
// =========================
const productList = document.getElementById("product-list");

if (productList) {
  productList.innerHTML = products.map(product => {
    return `
      <div class="card product">
        <img src="${product.image}" alt="${product.name}" class="product-img">
        <h3>${product.name}</h3>
        <p class="small muted">₦${product.price.toLocaleString()}</p>
        <button class="btn add-to-cart" data-id="${product.id}">Add to Cart</button>
      </div>
    `;
  }).join("");
}

// =========================
// Cart Logic
// =========================
let cart = JSON.parse(localStorage.getItem("cart")) || [];
// Remove items that are no longer in products list
cart = cart.filter(item => products.some(p => p.id === item.id));

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCart() {
  const cartList = document.getElementById("cart-list");
  const cartTotal = document.getElementById("cart-total");
  if (!cartList || !cartTotal) return;

  if (cart.length === 0) {
    cartList.innerHTML = `<p class="small muted">Your cart is empty.</p>`;
    cartTotal.textContent = "₦0";
    saveCart();
    return;
  }

  // Build cart HTML
  cartList.innerHTML = cart.map(item => {
    return `
      <div class="row cart-item">
        <span>${item.name}</span>
        <div>
          <button class="qty-btn decrease" data-id="${item.id}">−</button>
          <span>${item.qty}</span>
          <button class="qty-btn increase" data-id="${item.id}">+</button>
          <span>₦${(item.price * item.qty).toLocaleString()}</span>
        </div>
      </div>
    `;
  }).join("");

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  cartTotal.textContent = "₦" + total.toLocaleString();

  saveCart();
}

// =========================
// Event Delegation for Cart
// =========================
document.addEventListener("click", function(e) {
  const target = e.target;

  // Add product to cart
  if (target.classList.contains("add-to-cart")) {
    const id = parseInt(target.dataset.id);
    const product = products.find(p => p.id === id);
    const existing = cart.find(c => c.id === id);

    if (existing) {
      existing.qty++;
    } else {
      cart.push({ ...product, qty: 1 });
    }
    updateCart();
  }

  // Increase quantity
  if (target.classList.contains("increase")) {
    const id = parseInt(target.dataset.id);
    const item = cart.find(c => c.id === id);
    if (item) item.qty++;
    updateCart();
  }

  // Decrease quantity
  if (target.classList.contains("decrease")) {
    const id = parseInt(target.dataset.id);
    const item = cart.find(c => c.id === id);
    if (item) {
      item.qty--;
      if (item.qty <= 0) {
        cart = cart.filter(c => c.id !== id);
      }
    }
    updateCart();
  }

  // Clear cart
  if (target.id === "clear-cart") {
    cart = [];
    updateCart();
  }
});

// Initialize cart on page load
updateCart();

// =========================
// Planner / Todo Logic
// =========================
document.addEventListener("DOMContentLoaded", () => {
  const tasks = document.querySelectorAll(".planner-list li");

  tasks.forEach(task => {
    const id = task.dataset.id;
    const checkbox = task.querySelector("input[type='checkbox']");

    // Load saved state from localStorage
    const savedState = localStorage.getItem(id);
    if (savedState === "on") checkbox.checked = true;

    // Save toggle state when changed
    checkbox.addEventListener("change", () => {
      localStorage.setItem(id, checkbox.checked ? "on" : "off");
    });
  });
});

// =========================
// Mobile menu toggle
// =========================
const menuButton = document.getElementById("menu-toggle");
const navMenu = document.getElementById("main-nav");

if (menuButton && navMenu) {
  menuButton.addEventListener("click", function() {
    if (navMenu.classList.contains("active")) {
      navMenu.classList.remove("active");
    } else {
      navMenu.classList.add("active");
    }
  });
}


