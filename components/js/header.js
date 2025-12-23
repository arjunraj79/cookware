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
    // wire up hamburger sprite toggle and mobile panel trigger
    const menuBtn = document.querySelector('.hamburger-menu');
    const hamburger = document.querySelector('.hamburger');
    if (menuBtn && hamburger) {
        menuBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            hamburger.classList.toggle('active');
            menuBtn.classList.toggle('active');
            document.body.classList.toggle('mobile-menu-open');
        });

        // close on ESC
        document.addEventListener('keydown', (ev) => {
            if (ev.key === 'Escape' && document.body.classList.contains('mobile-menu-open')) {
                hamburger.classList.remove('active');
                menuBtn.classList.remove('active');
                document.body.classList.remove('mobile-menu-open');
            }
        });
    }
});
