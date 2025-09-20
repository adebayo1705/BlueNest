// js/contact.js
// Fake form submission with validation (for test/demo sites)

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const note = document.getElementById("form-note");
    note.textContent = "";

    // Collect inputs
    const name = form.querySelector('input[name="name"]');
    const email = form.querySelector('input[name="email"]');
    const message = form.querySelector('textarea[name="message"]');

    // Basic validation
    if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
      note.textContent = "⚠️ Please fill in all fields.";
      note.style.color = "red";
      return;
    }

    // Simple email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value)) {
      note.textContent = "⚠️ Please enter a valid email address.";
      note.style.color = "red";
      return;
    }

    // Simulate successful send
    note.textContent = "✅ Message sent successfully!";
    note.style.color = "green";
    form.reset();
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