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

  // Create a separate submenu overlay container that lives outside the sidebar
  // This fixes the CSS transform issue where fixed positioning doesn't work inside transformed elements
  const submenuOverlay = document.createElement('div');
  submenuOverlay.className = 'submenu-overlay';
  submenuOverlay.innerHTML = `
    <div class="submenu-panel-desktop">
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
  `;
  document.body.appendChild(submenuOverlay);

  // Bind interactions immediately so pages that initialize main.js earlier still get a working menu
  const mobileNav = document.querySelector('.mobile-nav');
  const hamburger = document.querySelector('.hamburger-menu');
  const submenuPanelDesktop = document.querySelector('.submenu-panel-desktop');

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
  if(mobileNav && submenuPanelDesktop){
    const hasSubmenuItems = mobileNav.querySelectorAll('.has-submenu');
    let closeTimeout;
    
    hasSubmenuItems.forEach(item => {
      const link = item.querySelector(':scope > a');
      
      if (link) {
        // Show submenu on hover over the menu item
        item.addEventListener('mouseenter', function() {
          clearTimeout(closeTimeout);
          submenuPanelDesktop.classList.add('open');
        });
        
        item.addEventListener('mouseleave', function(e) {
          // Check if mouse moved to submenu panel
          const relatedTarget = e.relatedTarget;
          if (submenuPanelDesktop.contains(relatedTarget)) {
            return; // Don't close if moving to submenu
          }
          closeTimeout = setTimeout(() => {
            submenuPanelDesktop.classList.remove('open');
          }, 100);
        });
        
        // Also handle click for touch devices
        link.addEventListener('click', function(e) {
          e.preventDefault();
          const isOpen = submenuPanelDesktop.classList.contains('open');
          if (!isOpen) {
            submenuPanelDesktop.classList.add('open');
          } else {
            submenuPanelDesktop.classList.remove('open');
          }
        });
      }
    });

    // Desktop submenu panel hover handling
    submenuPanelDesktop.addEventListener('mouseenter', function() {
      clearTimeout(closeTimeout);
      submenuPanelDesktop.classList.add('open');
    });
    
    submenuPanelDesktop.addEventListener('mouseleave', function(e) {
      const relatedTarget = e.relatedTarget;
      // Don't close if moving back to sidebar
      if (mobileNav.contains(relatedTarget)) {
        return;
      }
      closeTimeout = setTimeout(() => {
        submenuPanelDesktop.classList.remove('open');
      }, 100);
    });

    // Close submenu when clicking outside
    document.addEventListener('click', function(e) {
      if (!mobileNav.contains(e.target) && !submenuPanelDesktop.contains(e.target)) {
        submenuPanelDesktop.classList.remove('open');
      }
    });
  }
});
