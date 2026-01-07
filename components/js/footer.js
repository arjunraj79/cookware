document.addEventListener("DOMContentLoaded", () => {
  const footerContent = `
    <footer class="site-footer">
      <div class="footer-container">
        <div class="footer-main">
          <!-- Left Side: Link Columns -->
          <div class="footer-links-area">
            <ul class="footer-col">
              <li><h6>Company</h6></li>
              <li><a href="/about.html">About Us</a></li>
              <li><a href="/products.html">Our Products</a></li>
              <li><a href="/benefits-of-pressure-cooking.html">Almanac of Pressure Cooker</a></li>
              <li><a href="/blog.html">Blog</a></li>
              <li><a href="/store-locator.html">Store Locator</a></li>
            </ul>
            <ul class="footer-col">
              <li><h6>Our Policies</h6></li>
              <li><a href="/privacy-policy.html">Privacy Policy</a></li>
              <li><a href="/terms-of-use.html">Terms of Use</a></li>
              <li><a href="/legal.html">Legal</a></li>
              <li><a href="/contact-us.html">Contact Us</a></li>
            </ul>
            <ul class="footer-col">
              <li><h6>Product Categories</h6></li>
              <li><a href="/products.html">Pressure Cookers</a></li>
              <li><a href="/products.html">Cookware</a></li>
              <li><a href="/products.html">Accessories</a></li>
            </ul>
          </div>

          <!-- Right Side: Contact & Social -->
          <div class="footer-contact-area">
            <div class="footer-help">
              <span class="help-label">Need help?</span>
              <a href="tel:1800123456" class="help-phone">1800 123 456</a>
            </div>
            <div class="footer-feedback">
              <div class="feedback-text">
                <span class="feedback-title">Always Looking To Improve</span>
                <p>Tell us what you love or what we need to fix.</p>
              </div>
              <a href="/contact-us.html" class="feedback-btn">Leave Feedback</a>
            </div>
            <div class="footer-address">
              <span class="address-title">Customer Care</span>
              <p>
                <strong>ONS Cookers Pvt. Ltd.</strong><br>
                123 Kitchen Street, New Delhi (INDIA) - 110001<br>
                Email - support@onscookers.com<br>
                Toll Free No - 1800 123 456
              </p>
            </div>
            <ul class="footer-social">
              <li><a href="#" target="_blank" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a></li>
              <li><a href="#" target="_blank" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a></li>
              <li><a href="#" target="_blank" aria-label="Twitter"><i class="fa-brands fa-twitter"></i></a></li>
              <li><a href="#" target="_blank" aria-label="YouTube"><i class="fa-brands fa-youtube"></i></a></li>
            </ul>
          </div>
        </div>

        <!-- Bottom Bar -->
        <div class="footer-bottom-bar">
          <div class="footer-bottom-links">
            <a href="/privacy-policy.html">Privacy Policy</a>
            <span class="divider"></span>
            <a href="/terms-of-use.html">Terms &amp; Conditions</a>
          </div>
          <div class="footer-copyright">
            © 2025 ONS Cookers. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  `;

  // Inject footer at the end of <body>
  document.body.insertAdjacentHTML('beforeend', footerContent);
});
