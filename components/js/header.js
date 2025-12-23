document.addEventListener("DOMContentLoaded", () => {
  const headerContent = `
    <header class="sticky-header">
      <nav class="navbar">

        <!-- LEFT -->
        <div class="navbar-left">
            <button class="hamburger-menu" aria-label="Open menu">
                <div class="hamburger" role="img" aria-label="Menu"></div>
            </button>
        </div>

        <!-- CENTER -->
        <div class="navbar-center">
            <div class="mobile-search">
                <input type="search" placeholder="Search products..." aria-label="Search">
            </div>

            <!-- DESKTOP LOGO -->
            <div class="logo logo-desktop">
                <a href="/index.html">
                    <img src="/assets/img/ONS-cooker.svg" alt="ONS Cookers" class="site-logo">
                </a>
            </div>
        </div>

        <!-- RIGHT -->
        <div class="navbar-right">

            <!-- MOBILE LOGO -->
            <div class="logo logo-mobile">
                <a href="/index.html">
                    <img src="/assets/img/ONS-cooker.svg" alt="ONS Cookers" class="site-logo">
                </a>
            </div>

            <!-- ICONS (Desktop only) -->
            <div class="header-icons">
                <a href="#" id="search-icon"><i class="fa-solid fa-magnifying-glass"></i></a>
                <a href="/cart.html" class="cart-icon-container">
                    <i class="fa-solid fa-cart-shopping"></i>
                    <span class="cart-count">0</span>
                </a>
                <a href="/login.html"><i class="fa-solid fa-user"></i></a>
            </div>

        </div>
      </nav>

      <!-- OPTIONAL EXPAND SEARCH BAR -->
      <div id="search-bar" class="search-bar">
        <input type="text" placeholder="Search for products..." id="search-input">
        <button id="close-search"><i class="fa-solid fa-times"></i></button>
      </div>
    </header>
  `;

  // Inject header at the beginning of <body>
  document.body.insertAdjacentHTML('afterbegin', headerContent);
    // wire up hamburger sprite toggle and mobile nav trigger
    const menuBtn = document.querySelector('.hamburger-menu');
    const hamburger = document.querySelector('.hamburger');

    function closeMenu() {
        const sideNav = document.querySelector('.mobile-nav');
        if (hamburger) hamburger.classList.remove('active');
        if (menuBtn) {
            menuBtn.classList.remove('active');
            menuBtn.setAttribute('aria-expanded', 'false');
        }
        if (sideNav) sideNav.classList.remove('open');
        document.body.classList.remove('mobile-menu-open');
        document.body.style.overflow = '';
    }

    function openMenu() {
        const sideNav = document.querySelector('.mobile-nav');
        if (hamburger) hamburger.classList.add('active');
        if (menuBtn) {
            menuBtn.classList.add('active');
            menuBtn.setAttribute('aria-expanded', 'true');
        }
        if (sideNav) sideNav.classList.add('open');
        document.body.classList.add('mobile-menu-open');
        document.body.style.overflow = 'hidden';
    }

    let _lastToggle = 0;
    if (menuBtn && hamburger) {
        // ensure button has aria-expanded
        if (!menuBtn.hasAttribute('aria-expanded')) menuBtn.setAttribute('aria-expanded', 'false');

        menuBtn.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            // toggle based on hamburger sprite's own state (source of truth)
            const isOpen = hamburger.classList.contains('active');
            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }
            _lastToggle = Date.now();
        });

        // close on ESC
        document.addEventListener('keydown', (ev) => {
            if (ev.key === 'Escape' && hamburger.classList.contains('active')) {
                closeMenu();
            }
        });

        // close when clicking outside the sideNav; ignore clicks that happen
        // immediately after toggling to avoid the same event closing it.
        document.addEventListener('click', (ev) => {
            const sideNav = document.querySelector('.mobile-nav');
            if (!sideNav) return;
            // ignore immediate clicks (within 150ms) after toggle
            if (Date.now() - _lastToggle < 150) return;
            const isClickInside = sideNav.contains(ev.target) || menuBtn.contains(ev.target);
            if (!isClickInside && hamburger.classList.contains('active')) {
                closeMenu();
            }
        });
    }
});
