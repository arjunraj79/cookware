document.addEventListener("DOMContentLoaded", () => {
  const mobileNavContent = `
    <div class="mobile-nav">
      <div class="mobile-nav-header">
        <div class="close-btn">
          <i class="fa-solid fa-times"></i>
        </div>
      </div>

      <ul class="mobile-nav-links">
        <li><a href="index.html">Home</a></li>

        <li class="has-submenu">
          <a href="#">Products <i class="fa-solid fa-chevron-right"></i></a>
          <ul class="submenu">
            <li class="submenu-back"><a href="#"><i class="fa-solid fa-chevron-left"></i> Back</a></li>
            <li><a href="#">Cooker</a></li>

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

        <li><a href="about.html">About Us</a></li>
        <li><a href="#">Contact Us</a></li>
        <li><a href="benefits-of-pressure-cooking.html">Benefits of Pressure Cooking</a></li>
        <li><a href="#">Blog</a></li>
        <li><a href="#">Store Locator</a></li>
        <li><a href="legal.html">Legal</a></li>
        <li><a href="privacy-policy.html">Privacy Policy</a></li>
        <li><a href="terms-of-use.html">Terms of Use</a></li>
      </ul>
    </div>
  `;

  // Inject mobile nav just after opening body
  document.body.insertAdjacentHTML("afterbegin", mobileNavContent);
});
