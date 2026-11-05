const cart = [];
const drawer = document.querySelector('.cart-drawer');
const overlay = document.querySelector('.overlay');
const cartItems = document.querySelector('.cart-items');
const cartCount = document.querySelector('.cart-count');
const drawerCount = document.querySelector('.drawer-count');
const cartTotal = document.querySelector('.cart-total');

function openCart() {
    drawer.classList.add('open');
    overlay.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
}

function closeCart() {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
}

function renderCart() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartCount.textContent = count;
    drawerCount.textContent = `(${count})`;
    cartTotal.textContent = `$${total.toFixed(2)}`;

    if (!cart.length) {
        cartItems.innerHTML = '<p class="empty-cart">Your bag is empty.</p>';
        return;
    }
    cartItems.innerHTML = cart.map((item, index) => `
        <div class="cart-row">
            <div class="thumb">${String(index + 1).padStart(2, '0')}</div>
            <div><h3>${item.name}</h3><span>$${item.price.toFixed(2)} × ${item.quantity}</span></div>
            <button class="remove-item" data-index="${index}" aria-label="Remove ${item.name}">×</button>
        </div>
    `).join('');
}

document.querySelectorAll('.quick-add').forEach(button => {
    button.addEventListener('click', () => {
        const name = button.dataset.name;
        const price = Number(button.dataset.price);
        const existing = cart.find(item => item.name === name);
        if (existing) existing.quantity += 1;
        else cart.push({ name, price, quantity: 1 });
        renderCart();
        openCart();
    });
});

cartItems.addEventListener('click', event => {
    const button = event.target.closest('.remove-item');
    if (!button) return;
    cart.splice(Number(button.dataset.index), 1);
    renderCart();
});

document.querySelector('.cart-button').addEventListener('click', openCart);
document.querySelector('.cart-close').addEventListener('click', closeCart);
overlay.addEventListener('click', closeCart);

document.querySelectorAll('.wishlist').forEach(button => {
    button.addEventListener('click', () => {
        button.classList.toggle('selected');
        button.textContent = button.classList.contains('selected') ? '♥' : '♡';
    });
});

document.querySelectorAll('.filter').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.filter').forEach(item => item.classList.remove('active'));
        button.classList.add('active');
        document.querySelectorAll('.product-card').forEach(card => {
            card.classList.toggle('hidden', button.dataset.filter !== 'All' && card.dataset.category !== button.dataset.filter);
        });
    });
});

const searchToggle = document.querySelector('.search-toggle');
const searchBar = document.querySelector('.search-bar');
searchToggle.addEventListener('click', () => {
    searchBar.classList.toggle('open');
    searchBar.setAttribute('aria-hidden', String(!searchBar.classList.contains('open')));
    if (searchBar.classList.contains('open')) document.querySelector('#search-input').focus();
});

document.querySelector('#search-input').addEventListener('input', event => {
    const term = event.target.value.toLowerCase();
    document.querySelectorAll('.product-card').forEach(card => {
        card.classList.toggle('hidden', !card.dataset.name.toLowerCase().includes(term));
    });
});

const menuButton = document.querySelector('.menu-button');
if (menuButton) {
    menuButton.addEventListener('click', () => {
        const links = document.querySelector('.nav-links');
        links.classList.toggle('open');
        menuButton.setAttribute('aria-expanded', String(links.classList.contains('open')));
    });
}

document.querySelector('.newsletter')?.addEventListener('submit', event => {
    event.preventDefault();
});
