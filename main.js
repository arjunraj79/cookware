document.addEventListener('DOMContentLoaded', function() {
    // Search Bar
    const searchIcon = document.getElementById('search-icon');
    const searchBar = document.getElementById('search-bar');
    const closeSearch = document.getElementById('close-search');
    const searchInput = document.getElementById('search-input');

    if (searchIcon) {
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
    }

    // Search handling: desktop (#search-input) and mobile (.mobile-search input)
    let productsCache = null;

    function loadProductsOnce(){
        if(productsCache) return Promise.resolve(productsCache);
        return fetch('categories/products.json').then(r=>r.json()).then(data => { productsCache = data; return data; });
    }

    function buildSuggestionItems(list, q){
        // return top 6 matches
        const ql = (q||'').toLowerCase();
        const matches = (list||[]).filter(p => {
            if(!p) return false;
            if((p.id||'').toLowerCase().includes(ql)) return true;
            if((p.title||'').toLowerCase().includes(ql)) return true;
            if((p.subtitle||'').toLowerCase().includes(ql)) return true;
            if((p.descriptionHtml||'').toLowerCase().replace(/<[^>]*>/g,'').includes(ql)) return true;
            if(Array.isArray(p.features) && p.features.join(' ').toLowerCase().includes(ql)) return true;
            if(p.specs && Object.values(p.specs).join(' ').toLowerCase().includes(ql)) return true;
            return false;
        });
        return matches.slice(0,6);
    }

    function performSearch(query){
        if(!query) return;
        query = query.trim();
        if(!query) return;
        loadProductsOnce().then(products => {
            const matches = buildSuggestionItems(products, query);
            if(matches.length === 1){
                location.href = 'categories/product-template.html?id=' + encodeURIComponent(matches[0].id);
            } else {
                location.href = 'products.html?q=' + encodeURIComponent(query);
            }
        }).catch(err => { console.error('Search failed', err); location.href = 'products.html?q=' + encodeURIComponent(query); });
    }

    // desktop input
    if(searchInput){
        searchInput.addEventListener('keydown', function(e){
            if(e.key === 'Enter'){
                performSearch(this.value);
            }
        });
    }

    // mobile inputs (there may be many on different pages)
    document.querySelectorAll('.mobile-search input').forEach(inp => {
        inp.addEventListener('keydown', function(e){ if(e.key === 'Enter'){ performSearch(this.value); } });
    });

    /* --- Live suggestions UI --- */
    let suggestionBox = null;
    let suggestionItems = [];
    let activeIndex = -1;

    function ensureSuggestionBox(){
        if(suggestionBox) return suggestionBox;
        suggestionBox = document.createElement('div');
        suggestionBox.className = 'search-suggestions';
        suggestionBox.style.display = 'none';
        document.body.appendChild(suggestionBox);
        return suggestionBox;
    }

    function showSuggestionsFor(inputEl, q){
        const box = ensureSuggestionBox();
        loadProductsOnce().then(list => {
            const items = buildSuggestionItems(list, q);
            suggestionItems = items;
            activeIndex = -1;
            if(!items.length){ box.style.display = 'none'; return; }
            box.innerHTML = '';
            items.forEach((p, idx) => {
                const row = document.createElement('div');
                row.className = 'item';
                row.dataset.index = idx;
                row.innerHTML = `<div class="title">${escapeHtml(p.title||p.id||'Untitled')}</div><div class="meta">${escapeHtml(p.id||'')}</div><div class="price">${p.price?('₹'+p.price):''}</div>`;
                row.addEventListener('click', () => {
                    // navigate
                    location.href = 'categories/product-template.html?id=' + encodeURIComponent(p.id);
                });
                box.appendChild(row);
            });
            positionSuggestionBox(inputEl, box);
            box.style.display = 'block';
        }).catch(err => { console.error('suggestions failed', err); });
    }

    function positionSuggestionBox(inputEl, box){
        const r = inputEl.getBoundingClientRect();
        const left = Math.max(8, r.left + window.scrollX);
        const top = r.bottom + window.scrollY + 8;
        box.style.left = left + 'px';
        box.style.top = top + 'px';
        box.style.width = Math.min(560, r.width) + 'px';
    }

    function hideSuggestions(){ if(suggestionBox) suggestionBox.style.display = 'none'; suggestionItems = []; activeIndex = -1; }

    function escapeHtml(s){ return (s||'').replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]); }

    // bind suggestions to desktop input and mobile inputs
    function bindTypeahead(inputEl){
        let debounce = null;
        inputEl.addEventListener('input', function(){
            const q = this.value.trim();
            clearTimeout(debounce);
            if(!q){ hideSuggestions(); return; }
            debounce = setTimeout(()=> showSuggestionsFor(this, q), 180);
        });

        inputEl.addEventListener('keydown', function(e){
            if(!suggestionBox || suggestionBox.style.display==='none') return;
            const items = Array.from(document.querySelectorAll('.search-suggestions .item'));
            if(!items.length) return;
            if(e.key === 'ArrowDown'){
                e.preventDefault(); activeIndex = Math.min(items.length-1, activeIndex+1); updateActive(items);
            } else if(e.key === 'ArrowUp'){
                e.preventDefault(); activeIndex = Math.max(0, activeIndex-1); updateActive(items);
            } else if(e.key === 'Enter'){
                if(activeIndex >= 0 && items[activeIndex]){
                    items[activeIndex].click();
                    e.preventDefault();
                }
            } else if(e.key === 'Escape'){
                hideSuggestions();
            }
        });

        // hide when clicking outside
        document.addEventListener('click', function(e){ if(!e.target.closest('.search-suggestions') && e.target !== inputEl) hideSuggestions(); });
        window.addEventListener('resize', ()=> { if(suggestionBox && suggestionBox.style.display !== 'none') positionSuggestionBox(inputEl, suggestionBox); });
    }

    function updateActive(items){ items.forEach((el,i)=> el.classList.toggle('active', i===activeIndex)); if(activeIndex>=0 && items[activeIndex]) items[activeIndex].scrollIntoView({block:'nearest'}); }

    if(searchInput) bindTypeahead(searchInput);
    document.querySelectorAll('.mobile-search input').forEach(inp => bindTypeahead(inp));


    // Cart functionality
    const cartCount = document.querySelector('.cart-count');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function updateCartCount() {
        cartCount.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
    }

    function addToCart(product) {
        const existingItem = cart.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    }

    const addToCartButtons = document.querySelectorAll('.btn-secondary');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const card = e.target.closest('.product-card');
            const product = {
                id: card.dataset.id,
                name: card.dataset.name,
                price: parseFloat(card.dataset.price),
                image: card.dataset.image
            };
            addToCart(product);
        });
    });

    updateCartCount();


    // Cart Page Specific Logic
    if (window.location.pathname.endsWith('cart.html')) {
        const cartItemsContainer = document.querySelector('.cart-items');
        const subtotalEl = document.getElementById('cart-subtotal');
        const totalEl = document.getElementById('cart-total');

        function renderCart() {
            cartItemsContainer.innerHTML = '';
            let subtotal = 0;
            if (cart.length === 0) {
                cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
            } else {
                 cart.forEach(item => {
                    const cartItem = document.createElement('div');
                    cartItem.classList.add('cart-item');
                    cartItem.innerHTML = `
                        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                        <div class="cart-item-details">
                            <h3>${item.name}</h3>
                            <p>₹${item.price.toFixed(2)}</p>
                            <div class="cart-item-quantity">
                                <button class="quantity-btn" data-id="${item.id}" data-action="decrease">-</button>
                                <input type="number" value="${item.quantity}" min="1" data-id="${item.id}">
                                <button class="quantity-btn" data-id="${item.id}" data-action="increase">+</button>
                            </div>
                        </div>
                        <button class="remove-item-btn" data-id="${item.id}">&times;</button>
                    `;
                    cartItemsContainer.appendChild(cartItem);
                    subtotal += item.price * item.quantity;
                });
            }

            subtotalEl.textContent = `₹${subtotal.toFixed(2)}`;
            totalEl.textContent = `₹${subtotal.toFixed(2)}`; // Assuming no shipping for now
        }
        
        cartItemsContainer.addEventListener('click', (e) => {
            if(e.target.classList.contains('quantity-btn')) {
                const id = e.target.dataset.id;
                const action = e.target.dataset.action;
                const item = cart.find(i => i.id === id);
                if (action === 'increase') {
                    item.quantity++;
                } else if (action === 'decrease' && item.quantity > 1) {
                    item.quantity--;
                }
                localStorage.setItem('cart', JSON.stringify(cart));
                renderCart();
                updateCartCount();
            } else if (e.target.classList.contains('remove-item-btn')) {
                const id = e.target.dataset.id;
                cart = cart.filter(i => i.id !== id);
                localStorage.setItem('cart', JSON.stringify(cart));
                renderCart();
                updateCartCount();
            }
        });
        
        cartItemsContainer.addEventListener('change', (e) => {
             if(e.target.matches('input[type="number"]')) {
                 const id = e.target.dataset.id;
                 const newQuantity = parseInt(e.target.value);
                 const item = cart.find(i => i.id === id);
                 if(newQuantity > 0) {
                    item.quantity = newQuantity;
                    localStorage.setItem('cart', JSON.stringify(cart));
                    renderCart();
                    updateCartCount();
                 }
             }
        });

        renderCart();
    }


    // Mobile Navigation
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileNav = document.querySelector('.mobile-nav');
    const closeBtn = document.querySelector('.close-btn');
    const submenuLinks = document.querySelectorAll('.mobile-nav .has-submenu > a');
    const backButtons = document.querySelectorAll('.mobile-nav .submenu-back a');

    const openNav = () => {
        mobileNav.classList.add('open');
        document.body.style.overflow = 'hidden';
    };

    const closeNav = () => {
        mobileNav.classList.remove('open');
        document.querySelectorAll('.mobile-nav .submenu.open').forEach(submenu => {
            submenu.classList.remove('open');
        });
        document.body.style.overflow = '';
    };

    hamburgerMenu.addEventListener('click', openNav);
    closeBtn.addEventListener('click', closeNav);

    // open mobile nav when bottom menu button is tapped
    document.querySelectorAll('.mobile-menu').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openNav();
        });
    });

    submenuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const submenu = this.nextElementSibling;
            submenu.classList.add('open');
        });
    });

    backButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const parentSubmenu = this.closest('.submenu');
            parentSubmenu.classList.remove('open');
        });
    });

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
