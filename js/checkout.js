// ==============================
// BlueNest Checkout — Paystack Integration
// ==============================

// Helper: Get cart from localStorage
function getCart() {
  const savedCart = localStorage.getItem("cart");
  if (!savedCart) return [];
  return JSON.parse(savedCart);
}

// Helper: Calculate total cart amount
function getCartTotal() {
  const cart = getCart();
  if (cart.length === 0) return 0;

  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    total += cart[i].price * cart[i].qty;
  }
  return total;
}

// ==============================
// Checkout Button Logic
// ==============================
document.addEventListener("DOMContentLoaded", function() {
  const checkoutBtn = document.getElementById("checkout");

  if (!checkoutBtn) return; // Exit if no button found

  checkoutBtn.addEventListener("click", function(e) {
    e.preventDefault();

    const totalAmount = getCartTotal();

    if (totalAmount <= 0) {
      alert("Your cart is empty. Add items before checking out!");
      return;
    }

    // ===== Paystack Payment Setup =====
    const paystackHandler = PaystackPop.setup({
      key: "pk_test_3345810ed4ae93a710dc2acafe1e121db13910f4", // Replace with your public key
      email: "customer@example.com", // Replace or collect dynamically
      amount: totalAmount * 100,       // Convert to kobo
      currency: "NGN",
      ref: "BLNEST-" + Math.floor(Math.random() * 1000000000), // Unique reference
      callback: function(response) {
        alert("Payment successful! Reference: " + response.reference);
        // Clear cart after successful payment
        localStorage.removeItem("cart");
        // Optional: Redirect to shop or confirmation page
        window.location.href = "https://username.github.io/BlueNest/shop.html";
      },
      onClose: function() {
        alert("Payment window was closed. Transaction not completed.");
      }
    });

    // Open Paystack payment modal
    paystackHandler.openIframe();
  });
});

