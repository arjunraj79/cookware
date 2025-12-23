document.addEventListener("DOMContentLoaded", () => {
  const mobileNavContent = `
    <div class="mobile-nav">
      <div class="mobile-nav-header">
      </div>

      <ul class="mobile-nav-links">
        <li><a href="/index.html">Home</a></li>

        <li class="has-submenu">
          <a href="#">Products <i class="fa-solid fa-chevron-right"></i></a>
          <div class="submenu-panel">
            <ul class="submenu-grid">
              <li>
                <a href="/products.html">
                  <div class="img-placeholder"></div>
                  <span>Cookers</span>
                </a>
              </li>
              <li>
                <a href="/products.html?cat=cookware">
                  <div class="img-placeholder"></div>
                  <span>Cookware</span>
                </a>
              </li>
              <li>
                <a href="/products.html?cat=frying-pan">
                  <div class="img-placeholder"></div>
                  <span>Frying Pan</span>
                </a>
              </li>
              <li>
                <a href="/products.html?cat=tava">
                  <div class="img-placeholder"></div>
                  <span>Tava</span>
                </a>
              </li>
              <li>
                <a href="/products.html?cat=deep-fry-pan">
                  <div class="img-placeholder"></div>
                  <span>Deep Fry Pan</span>
                </a>
              </li>
              <li>
                <a href="/products.html?cat=sets">
                  <div class="img-placeholder"></div>
                  <span>Sets</span>
                </a>
              </li>
              <li>
                <a href="/products.html?cat=saucepan">
                  <div class="img-placeholder"></div>
                  <span>Saucepan</span>
                </a>
              </li>
              <li>
                <a href="/products.html?cat=handi">
                  <div class="img-placeholder"></div>
                  <span>Handi</span>
                </a>
              </li>
              <li>
                <a href="/products.html?cat=electricals">
                  <div class="img-placeholder"></div>
                  <span>Electricals</span>
                </a>
              </li>
              <li>
                <a href="/products.html?cat=accessories">
                  <div class="img-placeholder"></div>
                  <span>Parts & Accessories</span>
                </a>
              </li>
            </ul>
          </div>
        </li>

        <li><a href="/about.html">About Us</a></li>
        <li><a href="/contact-us.html">Contact Us</a></li>
        <li><a href="/benefits-of-pressure-cooking.html">Almanac of Pressure Cooking</a></li>
      </ul>
    </div>
  `;

  // Inject mobile nav just after opening body
  document.body.insertAdjacentHTML("afterbegin", mobileNavContent);
  // Bind interactions immediately so pages that initialize main.js earlier still get a working menu
  const mobileNav = document.querySelector('.mobile-nav');
  const hamburger = document.querySelector('.hamburger-menu');

  const openNav = () => {
    if(!mobileNav) return;
    mobileNav.classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  const closeNav = () => {
    if(!mobileNav) return;
    mobileNav.classList.remove('open');
    mobileNav.querySelectorAll('.submenu.open').forEach(s => s.classList.remove('open'));
    document.body.style.overflow = '';
    // sync hamburger sprite back to first image
    const hamburgerSprite = document.querySelector('.hamburger');
    const hamburgerBtn = document.querySelector('.hamburger-menu');
    if (hamburgerSprite) hamburgerSprite.classList.remove('active');
    if (hamburgerBtn) {
      hamburgerBtn.classList.remove('active');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
    }
    document.body.classList.remove('mobile-menu-open');
  };

  // Do not bind the hamburger here; header.js handles toggle behavior.
  // Expose open/close helpers so other scripts can call them.
  window.openMobileNav = openNav;
  window.closeMobileNav = closeNav;

  // Submenu handling - hover based
  if(mobileNav){
    const hasSubmenuItems = mobileNav.querySelectorAll('.has-submenu');
    
    hasSubmenuItems.forEach(item => {
      const link = item.querySelector(':scope > a');
      const submenuPanel = item.querySelector('.submenu-panel');
      
      if (link && submenuPanel) {
        let closeTimeout;
        
        // Show submenu on hover over the menu item
        item.addEventListener('mouseenter', function() {
          clearTimeout(closeTimeout);
          // Close any other open submenus
          mobileNav.querySelectorAll('.submenu-panel.open').forEach(p => {
            if (p !== submenuPanel) p.classList.remove('open');
          });
          submenuPanel.classList.add('open');
        });
        
        item.addEventListener('mouseleave', function(e) {
          // Check if mouse moved to submenu panel
          const relatedTarget = e.relatedTarget;
          if (submenuPanel.contains(relatedTarget)) {
            return; // Don't close if moving to submenu
          }
          closeTimeout = setTimeout(() => {
            submenuPanel.classList.remove('open');
          }, 100);
        });
        
        // Keep submenu open when hovering over it
        submenuPanel.addEventListener('mouseenter', function() {
          clearTimeout(closeTimeout);
          submenuPanel.classList.add('open');
        });
        
        submenuPanel.addEventListener('mouseleave', function(e) {
          // Check if mouse moved back to menu item
          const relatedTarget = e.relatedTarget;
          if (item.contains(relatedTarget)) {
            return;
          }
          closeTimeout = setTimeout(() => {
            submenuPanel.classList.remove('open');
          }, 100);
        });
        
        // Also handle click for touch devices
        link.addEventListener('click', function(e) {
          e.preventDefault();
          const isOpen = submenuPanel.classList.contains('open');
          // Close all other submenus
          mobileNav.querySelectorAll('.submenu-panel.open').forEach(p => p.classList.remove('open'));
          if (!isOpen) {
            submenuPanel.classList.add('open');
          }
        });
      }
    });

    // Close submenu when clicking outside
    document.addEventListener('click', function(e) {
      if (!mobileNav.contains(e.target)) {
        mobileNav.querySelectorAll('.submenu-panel.open').forEach(p => p.classList.remove('open'));
      }
    });
  }
});
