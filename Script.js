// Shrinking navbar on scroll
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");

  if (window.scrollY > 50) {
    navbar.classList.add("shrink");
  } else {
    navbar.classList.remove("shrink");
  }
});
// Select all FAQ items
const faqItems = document.querySelectorAll('.faq-item');

// Loop through each item
faqItems.forEach(item => {
  item.addEventListener('click', () => {
    // Toggle "active" class for styling
    item.classList.toggle('active');

    // Get the answer span
    const answer = item.querySelector('.answer');

    // Toggle the answer's max-height
    if (item.classList.contains('active')) {
      answer.style.maxHeight = answer.scrollHeight + 'px';
    } else {
      answer.style.maxHeight = 0;
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    item.addEventListener('click', () => {
      const answer = item.querySelector('.answer');

      if (item.classList.contains('active')) {
        answer.style.maxHeight = 0;
        item.classList.remove('active');
      } else {
        answer.style.maxHeight = answer.scrollHeight + 'px';
        item.classList.add('active');
      }
    });
  });
});


// Enquiry Form Validation
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", function(e) {
    e.preventDefault(); // prevent form from submitting automatically

    const fname = document.getElementById("fname").value.trim();
    const lname = document.getElementById("lname").value.trim();
    const email = document.getElementById("email").value.trim();
    const contact = document.getElementById("contact").value.trim();
    const requestType = document.getElementById("requestType").value;
    
    let errors = [];

    // Basic Validation
    if(fname === "") errors.push("First Name is required.");
    if(lname === "") errors.push("Surname is required.");
    if(email === "") errors.push("Email is required.");
    if(contact === "") errors.push("Contact number is required.");
    if(requestType === "") errors.push("Please select a request type.");

    if(errors.length > 0){
      alert(errors.join("\n"));
      return false;
    } else {
      // Optional: Show confirmation message
      alert("Thank you for your enquiry, " + fname + "!\nWe will get back to you shortly.");
      form.reset(); // clear the form
    }
  });
});


// Contact Form Validation
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.querySelector('.contact-form form');
  const contactInput = document.getElementById('contact');

  contactForm.addEventListener('submit', function(e) {
    const contactValue = contactInput.value.trim();
    const digitsOnly = contactValue.replace(/\D/g, ''); // remove non-digit chars

    if (digitsOnly.length !== 10) {
      e.preventDefault(); // stop form submission
      alert("Please enter a 10-digit contact number.");
      contactInput.focus();
    }
  });
});


// Select all product dropdowns
const productSelects = document.querySelectorAll('.product-table select');

productSelects.forEach(select => {
  select.addEventListener('change', () => {
    const productName = select.closest('tr').querySelector('td').innerText.split('\n')[0];
    const selectedFlavor = select.value;
    alert(`You selected "${selectedFlavor}" for ${productName}`);
  });
});

// Cart array
let cart = [];

// Add to Cart buttons
document.querySelectorAll('.add-cart-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const row = btn.closest('tr');
    const product = row.querySelector('td:first-child').innerText.trim();
    const flavor = row.querySelector('select').value;

    // Check if already in cart
    const existing = cart.find(item => item.product === product && item.flavor === flavor);
    if(existing){
      existing.quantity += 1;
    } else {
      cart.push({product, flavor, quantity: 1});
    }

    renderCart();
  });
});

// Render cart table
function renderCart(){
  const table = document.getElementById('cart-table');
  // Remove old rows
  table.querySelectorAll('tr.cart-item').forEach(row => row.remove());

  cart.forEach((item, index) => {
    const tr = document.createElement('tr');
    tr.classList.add('cart-item');
    tr.innerHTML = `
      <td>${item.product}</td>
      <td>${item.flavor}</td>
      <td>${item.quantity}</td>
      <td><button class="remove-btn" data-index="${index}">Remove</button></td>
    `;
    table.appendChild(tr);
  });

  // Remove button functionality
  document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const idx = e.target.dataset.index;
      cart.splice(idx, 1);
      renderCart();
    });
  });
}



document.addEventListener('DOMContentLoaded', () => {

  // ===== Cursor Floating Emojis =====
  const emojis = ['🍪','🎂','🥐','🍩','🧁'];
  const iconContainer = document.getElementById('icon-container');

  document.addEventListener('mousemove', e => {
    const icon = document.createElement('div');
    icon.className = 'cursor-icon';
    icon.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    icon.style.left = e.clientX + 'px';
    icon.style.top = e.clientY + 'px';
    iconContainer.appendChild(icon);
    setTimeout(() => icon.remove(), 500);
  });

  // ===== Live Background Particles =====
  const canvas = document.getElementById('live-bg');
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 3 + 1;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.speedY = (Math.random() - 0.5) * 0.5;
      this.color = `hsl(${Math.random()*360},70%,70%)`;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if(this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if(this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  const particles = [];
  for(let i=0;i<120;i++) particles.push(new Particle());

  function animate() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }
  animate();

});



// Select all gallery images
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const caption = document.getElementById('caption');
const closeBtn = document.querySelector('.close');

galleryItems.forEach(img => {
  img.addEventListener('click', () => {
    lightbox.style.display = 'block';
    lightboxImg.src = img.src;
    caption.innerText = img.alt;
  });
});

// Close lightbox
closeBtn.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

// Also close when clicking outside the image
lightbox.addEventListener('click', e => {
  if(e.target === lightbox) {
    lightbox.style.display = 'none';
  }
});


const searchInput = document.getElementById("product-search");
const productRows = document.querySelectorAll(".product-table tr:not(:first-child)");

searchInput.addEventListener("keyup", () => {
  const query = searchInput.value.toLowerCase();
  let firstMatch = null;

  productRows.forEach((row) => {
    const name = row.children[0].innerText.toLowerCase();

    if (name.includes(query)) {
      row.style.display = "";
      if (!firstMatch) firstMatch = row;
    } else {
      row.style.display = "none";
    }
  });

  if (firstMatch) {
    setTimeout(() => {
      firstMatch.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }, 50);
  }
});
// Remove 'const' if the variable already exists
searchInput.addEventListener('input', () => {
  const filter = searchInput.value.toLowerCase();
  const rows = document.querySelectorAll('.product-table tr');

  let firstMatch = null;

  rows.forEach((row, index) => {
    if (index === 0) return; // skip header
    const productName = row.cells[0].textContent.toLowerCase();
    if (productName.includes(filter)) {
      row.style.display = '';
      if (!firstMatch) firstMatch = row;
    } else {
      row.style.display = 'none';
    }
  });

  if (firstMatch) {
    firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
});
