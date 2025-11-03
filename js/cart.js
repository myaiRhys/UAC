// Shopping Cart Management
class ShoppingCart {
    constructor() {
        this.cart = this.loadCart();
        this.deliveryOption = 'collection';
        this.deliveryFee = 150;
        this.freeDeliveryThreshold = 2000;
        this.init();
    }

    init() {
        this.updateCartDisplay();
        this.attachEventListeners();
    }

    loadCart() {
        const savedCart = localStorage.getItem('uacCart');
        return savedCart ? JSON.parse(savedCart) : [];
    }

    saveCart() {
        localStorage.setItem('uacCart', JSON.stringify(this.cart));
        this.updateCartDisplay();
    }

    addToCart(product) {
        const existingItem = this.cart.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                ...product,
                quantity: 1
            });
        }

        this.saveCart();
        this.showNotification(`${product.name} added to cart!`);
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
    }

    updateQuantity(productId, newQuantity) {
        const item = this.cart.find(item => item.id === productId);

        if (item) {
            if (newQuantity <= 0) {
                this.removeFromCart(productId);
            } else {
                item.quantity = newQuantity;
                this.saveCart();
            }
        }
    }

    clearCart() {
        if (confirm('Are you sure you want to clear your cart?')) {
            this.cart = [];
            this.saveCart();
        }
    }

    getTotalSqueegeesCount() {
        return this.cart
            .filter(item => item.category === 'squeegee')
            .reduce((total, item) => total + item.quantity, 0);
    }

    calculateItemPrice(item) {
        const totalSqueeges = this.getTotalSqueegeesCount();

        // Apply bulk discount if total squeegees >= 50
        if (item.category === 'squeegee' && totalSqueeges >= 50 && item.bulkPrice) {
            return item.bulkPrice * item.quantity;
        }

        return item.price * item.quantity;
    }

    getSubtotal() {
        return this.cart.reduce((total, item) => {
            return total + this.calculateItemPrice(item);
        }, 0);
    }

    getDeliveryFee() {
        if (this.deliveryOption === 'collection') {
            return 0;
        }

        const subtotal = this.getSubtotal();
        return subtotal >= this.freeDeliveryThreshold ? 0 : this.deliveryFee;
    }

    getTotal() {
        return this.getSubtotal() + this.getDeliveryFee();
    }

    updateCartDisplay() {
        const cartCount = document.getElementById('cartCount');
        const cartItems = document.getElementById('cartItems');
        const cartFooter = document.getElementById('cartFooter');
        const cartSubtotal = document.getElementById('cartSubtotal');
        const cartTotal = document.getElementById('cartTotal');
        const cartDiscount = document.getElementById('cartDiscount');
        const deliveryFeeElement = document.getElementById('deliveryFee');
        const deliveryFeeAmount = document.getElementById('deliveryFeeAmount');

        // Update cart count
        const totalItems = this.cart.reduce((total, item) => total + item.quantity, 0);
        if (cartCount) {
            cartCount.textContent = totalItems;
        }

        // Update cart items display
        if (cartItems) {
            if (this.cart.length === 0) {
                cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
                if (cartFooter) cartFooter.style.display = 'none';
            } else {
                cartItems.innerHTML = this.cart.map(item => this.createCartItemHTML(item)).join('');
                if (cartFooter) cartFooter.style.display = 'block';
            }
        }

        // Update subtotal and total
        const subtotal = this.getSubtotal();
        const deliveryFee = this.getDeliveryFee();
        const total = this.getTotal();

        if (cartSubtotal) {
            cartSubtotal.textContent = `R${subtotal.toFixed(2)}`;
        }

        if (cartTotal) {
            cartTotal.innerHTML = `<strong>R${total.toFixed(2)}</strong>`;
        }

        // Show/hide bulk discount notice
        const totalSqueeges = this.getTotalSqueegeesCount();
        if (cartDiscount) {
            cartDiscount.style.display = totalSqueeges >= 50 ? 'block' : 'none';
        }

        // Show/hide delivery fee
        if (deliveryFeeElement && deliveryFeeAmount) {
            if (this.deliveryOption === 'delivery') {
                deliveryFeeElement.style.display = 'flex';
                if (deliveryFee === 0) {
                    deliveryFeeAmount.innerHTML = '<span style="color: var(--success); font-weight: 600;">FREE</span>';
                } else {
                    deliveryFeeAmount.textContent = `R${deliveryFee.toFixed(2)}`;
                }
            } else {
                deliveryFeeElement.style.display = 'none';
            }
        }
    }

    createCartItemHTML(item) {
        const itemPrice = this.calculateItemPrice(item);
        const unitPrice = itemPrice / item.quantity;
        const totalSqueeges = this.getTotalSqueegeesCount();
        const isDiscounted = item.category === 'squeegee' && totalSqueeges >= 50 && item.bulkPrice;

        return `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-header">
                    <span class="cart-item-name">${item.name}</span>
                    <button class="cart-item-remove" onclick="cart.removeFromCart('${item.id}')">×</button>
                </div>
                <div class="cart-item-details">
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="cart.updateQuantity('${item.id}', ${item.quantity - 1})">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="cart.updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
                    </div>
                    <span class="cart-item-price">
                        R${itemPrice.toFixed(2)}
                        ${isDiscounted ? '<br><small style="color: var(--success);">Bulk discount!</small>' : ''}
                    </span>
                </div>
            </div>
        `;
    }

    attachEventListeners() {
        // Add to cart buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', (e) => {
                const productCard = e.target.closest('.product-card');
                const productData = JSON.parse(productCard.dataset.product);
                this.addToCart(productData);
            });
        });

        // Cart toggle (mobile)
        const cartToggle = document.getElementById('cartToggle');
        const cartSidebar = document.getElementById('cartSidebar');
        const closeCart = document.getElementById('closeCart');

        if (cartToggle) {
            cartToggle.addEventListener('click', (e) => {
                e.preventDefault();
                if (cartSidebar) {
                    cartSidebar.classList.add('active');
                }
            });
        }

        if (closeCart && cartSidebar) {
            closeCart.addEventListener('click', () => {
                cartSidebar.classList.remove('active');
            });
        }

        // Delivery option change
        const deliveryOption = document.getElementById('deliveryOption');
        const collectionOption = document.getElementById('collectionOption');

        if (deliveryOption) {
            deliveryOption.addEventListener('change', () => {
                this.deliveryOption = 'delivery';
                this.updateCartDisplay();
            });
        }

        if (collectionOption) {
            collectionOption.addEventListener('change', () => {
                this.deliveryOption = 'collection';
                this.updateCartDisplay();
            });
        }

        // Clear cart button
        const clearCartBtn = document.getElementById('clearCartBtn');
        if (clearCartBtn) {
            clearCartBtn.addEventListener('click', () => {
                this.clearCart();
            });
        }

        // Checkout button
        const checkoutBtn = document.getElementById('checkoutBtn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => {
                if (this.cart.length === 0) {
                    alert('Your cart is empty!');
                    return;
                }
                this.startCheckout();
            });
        }
    }

    startCheckout() {
        // This will be handled by checkout.js
        if (typeof window.startCheckoutProcess === 'function') {
            window.startCheckoutProcess(this);
        }
    }

    showNotification(message) {
        // Simple notification (can be enhanced)
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--success, #42b72a);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 6px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }
}

// Initialize cart
const cart = new ShoppingCart();

// Make cart globally accessible
window.cart = cart;
