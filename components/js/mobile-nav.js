document.addEventListener("DOMContentLoaded", () => {
  const mobileNavContent = `
    <div class="mobile-nav">
      <div class="mobile-nav-header">
      </div>

      <ul class="mobile-nav-links">
        <li><a href="/index.html">Home</a></li>

        <li class="has-submenu">
          <a href="#">Products <i class="fa-solid fa-chevron-right"></i></a>
            <ul class="submenu">
            <li class="submenu-back"><a href="#"><i class="fa-solid fa-chevron-left"></i> Back</a></li>
            <li><a href="/products.html">Cookers</a></li>

            <li class="has-submenu">
              <a href="#">Cookware <i class="fa-solid fa-chevron-right"></i></a>
              <ul class="submenu">
                <li class="submenu-back"><a href="#"><i class="fa-solid fa-chevron-left"></i> Back</a></li>
                <li><a href="#">Frying Pan</a></li>
                <li><a href="#">Tava</a></li>
                <li><a href="#">Deep Fry Pan</a></li>
                <li><a href="#">Sets</a></li>
                <li><a href="#">Saucepan</a></li>
                <li><a href="#">Handi</a></li>
              </ul>
            </li>

            <li><a href="#">Electricals</a></li>
            <li><a href="#">Parts & Accessories</a></li>
          </ul>
        </li>

        <li><a href="/products.html">All Products</a></li>
        <li><a href="/about.html">About Us</a></li>
        <li><a href="/contact-us.html">Contact Us</a></li>
        <li><a href="/benefits-of-pressure-cooking.html">Benefits of Pressure Cooking</a></li>
        <li><a href="/blog.html">Blog</a></li>
        <li><a href="/store-locator.html">Store Locator</a></li>
        <li><a href="/legal.html">Legal</a></li>
        <li><a href="/privacy-policy.html">Privacy Policy</a></li>
        <li><a href="/terms-of-use.html">Terms of Use</a></li>
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

  // Submenu handling
  if(mobileNav){
    const submenuLinks = mobileNav.querySelectorAll('.has-submenu > a');
    const backButtons = mobileNav.querySelectorAll('.submenu-back a');
    submenuLinks.forEach(link => {
      link.addEventListener('click', function(e){
        e.preventDefault();
        const submenu = this.nextElementSibling;
        if(submenu) submenu.classList.add('open');
      });
    });
    backButtons.forEach(btn => {
      btn.addEventListener('click', function(e){ e.preventDefault(); const parent = this.closest('.submenu'); if(parent) parent.classList.remove('open'); });
    });

    // Outside click is handled by header.js - do not add duplicate handler here
  }
});
