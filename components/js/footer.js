document.addEventListener("DOMContentLoaded", () => {
  const footerContent = `
    <footer>
      <div class="footer-content">
        <div class="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="#">Products</a></li>
            <li><a href="about.html">About Us</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="benefits-of-pressure-cooking.html">Benefits of Pressure Cooking</a></li>
            <li><a href="legal.html">Legal</a></li>
            <li><a href="privacy-policy.html">Privacy Policy</a></li>
            <li><a href="terms-of-use.html">Terms of Use</a></li>
          </ul>
        </div>
        <div class="footer-section">
          <h3>Follow Us</h3>
          <div class="social-icons">
            <a href="#"><i class="fa-brands fa-facebook"></i></a>
            <a href="#"><i class="fa-brands fa-instagram"></i></a>
            <a href="#"><i class="fa-brands fa-twitter"></i></a>
          </div>
        </div>
        <div class="footer-section">
          <h3>Contact</h3>
          <p>Email: info@onscookers.com</p>
          <p>Phone: +1 234 567 890</p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2025 ONS Cookers. All Rights Reserved.</p>
      </div>
    </footer>
  `;

  // Inject footer at the end of <body>
  document.body.insertAdjacentHTML('beforeend', footerContent);
});
