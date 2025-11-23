document.addEventListener('DOMContentLoaded', function() {
    // Search Bar
    const searchIcon = document.getElementById('search-icon');
    const searchBar = document.getElementById('search-bar');
    const closeSearch = document.getElementById('close-search');
    const searchInput = document.getElementById('search-input');

    searchIcon.addEventListener('click', (e) => {
        e.preventDefault();
        searchBar.classList.toggle('open');
        if (searchBar.classList.contains('open')) {
            searchInput.focus();
        }
    });

    closeSearch.addEventListener('click', () => {
        searchBar.classList.remove('open');
    });

    // Add to Cart
    const addToCartButtons = document.querySelectorAll('.btn-secondary');
    const cartCount = document.querySelector('.cart-count');
    let itemCount = 0;

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            itemCount++;
            cartCount.textContent = itemCount;
        });
    });


    // Mobile Navigation
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileNav = document.querySelector('.mobile-nav');
    const closeBtn = document.querySelector('.close-btn');
    const submenuLinks = document.querySelectorAll('.mobile-nav .has-submenu > a');
    const backButtons = document.querySelectorAll('.mobile-nav .submenu-back a');

    // Function to open the main menu
    const openNav = () => {
        mobileNav.classList.add('open');
        document.body.style.overflow = 'hidden';
    };

    // Function to close the entire menu
    const closeNav = () => {
        mobileNav.classList.remove('open');
        // Close all submenus when closing the main nav
        document.querySelectorAll('.mobile-nav .submenu.open').forEach(submenu => {
            submenu.classList.remove('open');
        });
    };

    hamburgerMenu.addEventListener('click', openNav);
    closeBtn.addEventListener('click', closeNav);

    // Open submenus
    submenuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const submenu = this.nextElementSibling;
            submenu.classList.add('open');
        });
    });

    // Go back from submenus
    backButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const parentSubmenu = this.closest('.submenu');
            parentSubmenu.classList.remove('open');
        });
    });

    // Close menu when clicking outside of it
    document.addEventListener('click', (e) => {
        if (mobileNav.classList.contains('open') && !mobileNav.contains(e.target) && !hamburgerMenu.contains(e.target)) {
            closeNav();
        }
    });

    // Scroll to Top
    const scrollToTopBtn = document.getElementById('scroll-to-top');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
