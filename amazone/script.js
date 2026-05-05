
    const products = [
      {
        id: 1,
        title: 'Wireless Noise-Canceling Headphones',
        category: 'Electronics',
        price: 89.99,
        oldPrice: 129.99,
        rating: 4.6,
        reviews: 8421,
        badge: 'Limited time deal',
        prime: true,
        deal: true,
        stock: 'In Stock',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
        delivery: 'FREE delivery tomorrow',
        description: ['Active noise canceling', '40-hour battery life', 'Comfort-fit ear cushions', 'Built-in microphone for calls']
      },
      {
        id: 2,
        title: 'Smart Watch with Fitness Tracking',
        category: 'Electronics',
        price: 59.99,
        oldPrice: 79.99,
        rating: 4.4,
        reviews: 2199,
        badge: 'Best seller',
        prime: true,
        deal: false,
        stock: 'In Stock',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
        delivery: 'FREE delivery in 2 days',
        description: ['Heart-rate monitoring', 'Sleep and step tracking', 'App notifications', 'Water-resistant design']
      },
      {
        id: 3,
        title: 'Ergonomic Office Chair',
        category: 'Home',
        price: 179.99,
        oldPrice: 239.99,
        rating: 4.5,
        reviews: 517,
        badge: 'Top rated',
        prime: false,
        deal: true,
        stock: 'In Stock',
        image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&w=800&q=80',
        delivery: 'Delivery available this week',
        description: ['Lumbar support', 'Adjustable armrests', 'Breathable mesh back', 'Smooth rolling wheels']
      },
      {
        id: 4,
        title: 'Programmable Coffee Maker',
        category: 'Home',
        price: 49.99,
        oldPrice: 69.99,
        rating: 4.3,
        reviews: 3049,
        badge: 'Deal',
        prime: true,
        deal: true,
        stock: 'In Stock',
        image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80',
        delivery: 'FREE delivery tomorrow',
        description: ['12-cup brewing', 'Programmable timer', 'Auto shut-off', 'Easy-clean filter basket']
      },
      {
        id: 5,
        title: 'Lightweight Running Shoes',
        category: 'Fashion',
        price: 64.99,
        oldPrice: 89.99,
        rating: 4.2,
        reviews: 1740,
        badge: 'Popular',
        prime: false,
        deal: false,
        stock: 'In Stock',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
        delivery: 'Delivery in 3 days',
        description: ['Lightweight cushioning', 'Breathable upper mesh', 'Flexible outsole', 'Daily running comfort']
      },
      {
        id: 6,
        title: 'Travel Laptop Backpack',
        category: 'Accessories',
        price: 39.99,
        oldPrice: 54.99,
        rating: 4.4,
        reviews: 923,
        badge: 'New arrival',
        prime: true,
        deal: false,
        stock: 'In Stock',
        image: 'https://images.unsplash.com/photo-1542291026-d29b6f7d52f1?auto=format&fit=crop&w=800&q=80',
        delivery: 'FREE delivery tomorrow',
        description: ['Laptop sleeve compartment', 'USB charging port', 'Water-resistant fabric', 'Travel-friendly design']
      },
      {
        id: 7,
        title: 'Daily Productivity Handbook',
        category: 'Books',
        price: 18.99,
        oldPrice: 24.99,
        rating: 4.7,
        reviews: 611,
        badge: 'Editor pick',
        prime: false,
        deal: false,
        stock: 'In Stock',
        image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80',
        delivery: 'Delivery available in 2 days',
        description: ['Goal-setting frameworks', 'Time management tips', 'Focus strategies', 'Printable productivity systems']
      },
      {
        id: 8,
        title: 'Portable Bluetooth Speaker',
        category: 'Electronics',
        price: 29.99,
        oldPrice: 44.99,
        rating: 4.5,
        reviews: 4050,
        badge: 'Hot pick',
        prime: true,
        deal: true,
        stock: 'In Stock',
        image: 'https://images.unsplash.com/photo-1589003077984-894e133dabab?auto=format&fit=crop&w=800&q=80',
        delivery: 'FREE delivery tomorrow',
        description: ['Strong bass output', 'Portable compact build', 'Bluetooth 5.0', 'Long battery backup']
      }
    ];

    let slideIndex = 1;
    let slideInterval;
    let cart = JSON.parse(localStorage.getItem('amazonCloneCart') || '[]');
    let currentProduct = null;
    let authMode = 'signin';
    let currentUser = JSON.parse(localStorage.getItem('amazonCloneUser') || 'null');
    let primeOnly = false;
    let dealsOnly = false;
    let quickFilter = 'All';

    function saveCart() {
      localStorage.setItem('amazonCloneCart', JSON.stringify(cart));
    }

    function saveUser() {
      localStorage.setItem('amazonCloneUser', JSON.stringify(currentUser));
    }

    function scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function formatPrice(value) {
      return `$${value.toFixed(2)}`;
    }

    function getStars(rating) {
      const full = Math.round(rating);
      return '★'.repeat(full) + '☆'.repeat(5 - full);
    }

    function renderProducts(list) {
      const container = document.getElementById('productsContainer');
      container.innerHTML = '';

      if (!list.length) {
        container.innerHTML = '<div class="empty-state" style="grid-column:1/-1">No products found. Try another search or filter.</div>';
        document.getElementById('resultsText').textContent = 'Showing 0 items';
        return;
      }

      list.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
          <img src="${product.image}" alt="${product.title}" onclick="openProductModal(${product.id})" />
          <div class="badge">${product.badge}</div>
          <div class="product-title" onclick="openProductModal(${product.id})">${product.title}</div>
          <div class="rating">${getStars(product.rating)} (${product.reviews.toLocaleString()})</div>
          <div class="prime-badge">${product.prime ? 'Prime eligible' : 'Standard delivery'}</div>
          <div class="price"><sup>$</sup>${Math.floor(product.price)}<sup>${String(product.price.toFixed(2)).split('.')[1]}</sup></div>
          <div class="old-price">List: ${formatPrice(product.oldPrice)}</div>
          <div class="delivery">${product.delivery}</div>
          <div class="stock in">${product.stock}</div>
          <div class="card-actions">
            <button class="add-cart" onclick="addToCart(${product.id})">Add to Cart</button>
            <button class="view-btn" onclick="openProductModal(${product.id})">View Details</button>
          </div>
        `;
        container.appendChild(card);
      });

      document.getElementById('resultsText').textContent = `Showing ${list.length} item${list.length !== 1 ? 's' : ''}`;
    }

    function applyFilters() {
      const search = document.getElementById('searchInput').value.toLowerCase().trim();
      const category = document.getElementById('categorySelect').value;
      const sort = document.getElementById('sortSelect').value;

      let filtered = [...products].filter(product => {
        const matchesSearch = `${product.title} ${product.category} ${product.badge}`.toLowerCase().includes(search);
        const matchesCategory = category === 'All' || product.category === category;
        const matchesQuick = quickFilter === 'All' || quickFilter === 'Deals' ? (quickFilter === 'Deals' ? product.deal : true) : product.category === quickFilter;
        const matchesPrime = !primeOnly || product.prime;
        const matchesDeals = !dealsOnly || product.deal;
        return matchesSearch && matchesCategory && matchesQuick && matchesPrime && matchesDeals;
      });

      if (sort === 'priceLow') filtered.sort((a, b) => a.price - b.price);
      if (sort === 'priceHigh') filtered.sort((a, b) => b.price - a.price);
      if (sort === 'ratingHigh') filtered.sort((a, b) => b.rating - a.rating);

      renderProducts(filtered);
    }

    function setQuickFilter(value, el) {
      quickFilter = value;
      document.querySelectorAll('.sub-nav button').forEach(btn => btn.classList.remove('active-chip'));
      el.classList.add('active-chip');
      applyFilters();
    }

    function togglePrimeFilter() {
      primeOnly = !primeOnly;
      const btn = document.getElementById('primeFilterBtn');
      if (btn) btn.classList.toggle('active-filter', primeOnly);
      applyFilters();
    }

    function toggleDealsFilter() {
      dealsOnly = !dealsOnly;
      const btn = document.getElementById('dealsFilterBtn');
      if (btn) btn.classList.toggle('active-filter', dealsOnly);
      applyFilters();
    }

    function addToCart(productId) {
      const product = products.find(item => item.id === productId);
      const existing = cart.find(item => item.id === productId);
      if (existing) {
        existing.qty += 1;
      } else {
        cart.push({ ...product, qty: 1 });
      }
      saveCart();
      updateCartUI();
      showToast(`${product.title} added to cart`);
    }

    function updateCartUI() {
      const count = cart.reduce((sum, item) => sum + item.qty, 0);
      const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
      document.getElementById('cartCount').textContent = count;
      document.getElementById('cartTotalPreview').textContent = formatPrice(total);
      document.getElementById('cartSubtotal').textContent = formatPrice(total);

      const container = document.getElementById('cartItemsContainer');
      if (!cart.length) {
        container.innerHTML = '<div class="empty-state"><h4>Your Amazon clone cart is empty</h4><p>Add some products to get started.</p></div>';
        return;
      }

      container.innerHTML = cart.map(item => `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.title}" />
          <div class="cart-meta">
            <h4>${item.title}</h4>
            <div class="stock in">${item.stock}</div>
            <div class="muted">${formatPrice(item.price)} each</div>
            <div class="qty-controls">
              <button class="qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
              <strong>${item.qty}</strong>
              <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
              <button class="secondary-btn" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
          </div>
        </div>
      `).join('');
    }

    function changeQty(productId, delta) {
      const item = cart.find(product => product.id === productId);
      if (!item) return;
      item.qty += delta;
      if (item.qty <= 0) {
        cart = cart.filter(product => product.id !== productId);
      }
      saveCart();
      updateCartUI();
    }

    function removeFromCart(productId) {
      cart = cart.filter(item => item.id !== productId);
      saveCart();
      updateCartUI();
      showToast('Item removed from cart');
    }

    function clearCart() {
      cart = [];
      saveCart();
      updateCartUI();
      showToast('Cart cleared');
    }

    function checkout() {
      if (!cart.length) {
        showToast('Your cart is empty');
        return;
      }
      if (!currentUser) {
        closeCartDrawer();
        openAuthModal();
        showToast('Sign in first to continue checkout');
        return;
      }
      showToast(`Checkout complete. Thanks, ${currentUser.name.split(' ')[0]}!`);
      clearCart();
      closeCartDrawer();
    }

    function openCartDrawer() {
      document.getElementById('cartDrawer').classList.add('open');
      document.getElementById('overlay').classList.add('show');
      document.body.classList.add('no-scroll');
    }

    function closeCartDrawer() {
      document.getElementById('cartDrawer').classList.remove('open');
      if (!document.getElementById('productModal').classList.contains('show') && !document.getElementById('authModal').classList.contains('show')) {
        document.getElementById('overlay').classList.remove('show');
        document.body.classList.remove('no-scroll');
      }
    }

    function openProductModal(productId) {
      const product = products.find(item => item.id === productId);
      currentProduct = product;
      document.getElementById('productModalBody').innerHTML = `
        <div class="product-modal-grid">
          <div>
            <img src="${product.image}" alt="${product.title}" />
          </div>
          <div>
            <div class="badge">${product.badge}</div>
            <h2 style="margin-bottom:10px">${product.title}</h2>
            <div class="rating" style="margin-bottom:8px">${getStars(product.rating)} ${product.rating} (${product.reviews.toLocaleString()} ratings)</div>
            <div class="prime-badge" style="margin-bottom:10px">${product.prime ? 'Prime eligible' : 'Standard shipping'}</div>
            <div class="price" style="margin-bottom:10px"><sup>$</sup>${Math.floor(product.price)}<sup>${String(product.price.toFixed(2)).split('.')[1]}</sup></div>
            <div class="old-price">List price: ${formatPrice(product.oldPrice)}</div>
            <div class="delivery" style="margin:10px 0">${product.delivery}</div>
            <div class="stock in">${product.stock}</div>
            <ul class="details-list">${product.description.map(item => `<li>${item}</li>`).join('')}</ul>
            <div class="card-actions">
              <button class="add-cart" onclick="addToCart(${product.id})">Add to Cart</button>
              <button class="view-btn" onclick="buyNow(${product.id})">Buy Now</button>
            </div>
          </div>
        </div>
      `;
      document.getElementById('productModal').classList.add('show');
      document.getElementById('overlay').classList.add('show');
      document.body.classList.add('no-scroll');
    }

    function closeProductModal() {
      document.getElementById('productModal').classList.remove('show');
      if (!document.getElementById('cartDrawer').classList.contains('open') && !document.getElementById('authModal').classList.contains('show')) {
        document.getElementById('overlay').classList.remove('show');
        document.body.classList.remove('no-scroll');
      }
    }

    function buyNow(productId) {
      addToCart(productId);
      closeProductModal();
      openCartDrawer();
    }

    function openAuthModal() {
      document.getElementById('authModal').classList.add('show');
      document.getElementById('overlay').classList.add('show');
      document.body.classList.add('no-scroll');
    }

    function closeAuthModal() {
      document.getElementById('authModal').classList.remove('show');
      if (!document.getElementById('cartDrawer').classList.contains('open') && !document.getElementById('productModal').classList.contains('show')) {
        document.getElementById('overlay').classList.remove('show');
        document.body.classList.remove('no-scroll');
      }
    }

    function closeAllPanels() {
      closeCartDrawer();
      closeProductModal();
      closeAuthModal();
      document.getElementById('overlay').classList.remove('show');
      document.body.classList.remove('no-scroll');
    }

    function switchAuthTab(mode) {
      authMode = mode;
      document.getElementById('signinTabBtn').classList.toggle('active', mode === 'signin');
      document.getElementById('signupTabBtn').classList.toggle('active', mode === 'signup');
      document.getElementById('authName').style.display = mode === 'signup' ? 'block' : 'none';
      document.getElementById('authSubmitBtn').textContent = mode === 'signup' ? 'Create Account' : 'Sign In';
    }

    function handleAuth(event) {
      event.preventDefault();
      const nameInput = document.getElementById('authName');
      const email = document.getElementById('authEmail').value.trim();
      const password = document.getElementById('authPassword').value.trim();
      const name = nameInput.value.trim() || email.split('@')[0];

      if (!email || !password) return;
      currentUser = { name, email };
      saveUser();
      updateUserUI();
      closeAuthModal();
      showToast(authMode === 'signup' ? 'Account created successfully' : 'Signed in successfully');
      document.getElementById('authForm').reset();
      switchAuthTab('signin');
    }

    function updateUserUI() {
      const navUserName = document.getElementById('navUserName');
      const signinText = document.getElementById('signinText');
      if (currentUser) {
        navUserName.textContent = currentUser.name.split(' ')[0];
        signinText.textContent = `Welcome back, ${currentUser.name}. Your cart and account are saved locally in this browser.`;
      } else {
        navUserName.textContent = 'sign in';
        signinText.textContent = 'Sign in to save your cart, manage your account, and view your orders.';
      }
    }

    function showToast(message) {
      const toast = document.getElementById('toast');
      toast.textContent = message;
      toast.classList.add('show');
      clearTimeout(window.toastTimer);
      window.toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
    }

    function showSlide(n) {
      const slides = document.querySelectorAll('.slide');
      const dots = document.querySelectorAll('.dot');

      if (n > slides.length) slideIndex = 1;
      else if (n < 1) slideIndex = slides.length;
      else slideIndex = n;

      slides.forEach(slide => slide.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));
      slides[slideIndex - 1].classList.add('active');
      dots[slideIndex - 1].classList.add('active');
    }

    function nextSlide() {
      slideIndex++;
      showSlide(slideIndex);
    }

    function prevSlide() {
      stopSlider();
      slideIndex--;
      showSlide(slideIndex);
      startSlider();
    }

    function nextSlideManual() {
      stopSlider();
      slideIndex++;
      showSlide(slideIndex);
      startSlider();
    }

    function currentSlide(n) {
      stopSlider();
      showSlide(n);
      startSlider();
    }

    function startSlider() {
      stopSlider();
      slideInterval = setInterval(nextSlide, 4000);
    }

    function stopSlider() {
      clearInterval(slideInterval);
    }

    document.getElementById('searchInput').addEventListener('keypress', function(event) {
      if (event.key === 'Enter') applyFilters();
    });

    function scrollMini(button, dir) {
      const section = button.closest('.mini-slider-section');
      const container = section ? section.querySelector('.mini-slider') : null;
      if (!container) return;
      container.scrollBy({ left: dir * 220, behavior: 'smooth' });
    }

    document.addEventListener('DOMContentLoaded', function() {
      applyFilters();
      updateCartUI();
      updateUserUI();
      startSlider();

      const sliderContainer = document.getElementById('sliderContainer');
      sliderContainer.addEventListener('mouseenter', stopSlider);
      sliderContainer.addEventListener('mouseleave', startSlider);
      document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowLeft') prevSlide();
        if (event.key === 'ArrowRight') nextSlideManual();
      });
    });
    function scrollProducts(direction) {
  const container = document.getElementById('productsContainer');
  const card = container.querySelector('.product-card');

  if (!card) return;

  const gap = 18;
  const scrollAmount = card.offsetWidth + gap;
  container.scrollBy({
    left: direction * scrollAmount * 2,
    behavior: 'smooth'
  });
}
  
  function toggleSubNav() {
    const menu = document.getElementById('subNavMenu');
    const toggleBtn = document.getElementById('subNavToggle');
    const isOpen = menu.classList.toggle('show');

    toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  }

  window.addEventListener('resize', () => {
    const menu = document.getElementById('subNavMenu');
    const toggleBtn = document.getElementById('subNavToggle');

    if (window.innerWidth > 768) {
      menu.classList.remove('show');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
  });
