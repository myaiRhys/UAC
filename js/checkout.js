// Checkout Process Management
class CheckoutManager {
    constructor() {
        this.currentStep = 1;
        this.orderData = {
            orderId: '',
            customer: {},
            items: [],
            subtotal: 0,
            deliveryFee: 0,
            total: 0,
            deliveryOption: 'collection',
            proofOfPayment: null
        };
    }

    generateOrderId() {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const random = Math.floor(1000 + Math.random() * 9000);
        return `ORD-${year}${month}${day}-${random}`;
    }

    startCheckout(cartInstance) {
        if (!cartInstance || cartInstance.cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }

        // Prepare order data
        this.orderData.orderId = this.generateOrderId();
        this.orderData.items = cartInstance.cart.map(item => ({
            ...item,
            unitPrice: cartInstance.calculateItemPrice(item) / item.quantity,
            totalPrice: cartInstance.calculateItemPrice(item)
        }));
        this.orderData.subtotal = cartInstance.getSubtotal();
        this.orderData.deliveryFee = cartInstance.getDeliveryFee();
        this.orderData.total = cartInstance.getTotal();
        this.orderData.deliveryOption = cartInstance.deliveryOption;

        // Show modal
        const modal = document.getElementById('checkoutModal');
        if (modal) {
            modal.classList.add('active');
            this.renderStep1();
        }
    }

    closeCheckout() {
        const modal = document.getElementById('checkoutModal');
        if (modal) {
            modal.classList.remove('active');
        }
        this.currentStep = 1;
    }

    renderStep1() {
        const content = document.getElementById('checkoutContent');
        if (!content) return;

        const needsAddress = this.orderData.deliveryOption === 'delivery';

        content.innerHTML = `
            <div class="checkout-step">
                <h3>Step 1: Customer Information</h3>
                <form id="customerForm">
                    <div class="form-group">
                        <label for="customerCompany">Company Name *</label>
                        <input type="text" id="customerCompany" required>
                    </div>

                    <div class="form-group">
                        <label for="customerName">Contact Person *</label>
                        <input type="text" id="customerName" required>
                    </div>

                    <div class="form-group">
                        <label for="customerPhone">Phone Number *</label>
                        <input type="tel" id="customerPhone" required>
                    </div>

                    <div class="form-group">
                        <label for="customerEmail">Email Address *</label>
                        <input type="email" id="customerEmail" required>
                    </div>

                    ${needsAddress ? `
                        <div class="form-group">
                            <label for="customerAddress">Delivery Address *</label>
                            <textarea id="customerAddress" rows="3" required></textarea>
                        </div>
                    ` : `
                        <div style="background: #e7f3ff; padding: 1rem; border-radius: 6px; margin: 1rem 0;">
                            <p><strong>Collection Address:</strong></p>
                            <p>10 Celie Industrial Park<br>Celie Road, Retreat<br>Cape Town</p>
                        </div>
                    `}

                    <button type="submit" class="btn btn-primary btn-block">Continue to Review</button>
                </form>
            </div>
        `;

        // Attach form handler
        const form = document.getElementById('customerForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleStep1Submit();
            });
        }
    }

    handleStep1Submit() {
        // Gather customer data
        this.orderData.customer = {
            company: document.getElementById('customerCompany').value,
            name: document.getElementById('customerName').value,
            phone: document.getElementById('customerPhone').value,
            email: document.getElementById('customerEmail').value,
            address: this.orderData.deliveryOption === 'delivery'
                ? document.getElementById('customerAddress').value
                : 'Collection at 10 Celie Industrial Park, Celie Road, Retreat, Cape Town'
        };

        this.renderStep2();
    }

    renderStep2() {
        const content = document.getElementById('checkoutContent');
        if (!content) return;

        const totalSqueeges = this.orderData.items
            .filter(item => item.category === 'squeegee')
            .reduce((total, item) => total + item.quantity, 0);

        const hasBulkDiscount = totalSqueeges >= 50;

        content.innerHTML = `
            <div class="checkout-step">
                <h3>Step 2: Review Your Order</h3>

                <div class="order-summary">
                    <h4>Order Summary</h4>
                    <p><strong>Order ID:</strong> ${this.orderData.orderId}</p>

                    <div style="margin: 1.5rem 0;">
                        <h4>Customer Information</h4>
                        <p><strong>Company:</strong> ${this.orderData.customer.company}</p>
                        <p><strong>Contact:</strong> ${this.orderData.customer.name}</p>
                        <p><strong>Phone:</strong> ${this.orderData.customer.phone}</p>
                        <p><strong>Email:</strong> ${this.orderData.customer.email}</p>
                        <p><strong>${this.orderData.deliveryOption === 'delivery' ? 'Delivery' : 'Collection'} Address:</strong><br>${this.orderData.customer.address}</p>
                    </div>

                    <div style="margin: 1.5rem 0;">
                        <h4>Items</h4>
                        ${this.orderData.items.map(item => `
                            <div class="order-summary-item">
                                <span>${item.name} (x${item.quantity})</span>
                                <span>R${item.totalPrice.toFixed(2)}</span>
                            </div>
                        `).join('')}
                    </div>

                    ${hasBulkDiscount ? `
                        <div style="background: #d4edda; padding: 1rem; border-radius: 6px; margin: 1rem 0;">
                            <p style="color: #155724; font-weight: 600; margin: 0;">
                                🎉 Bulk Discount Applied! (${totalSqueeges} squeegees)
                            </p>
                        </div>
                    ` : ''}

                    <div class="order-summary-item" style="border-top: 2px solid #ddd; padding-top: 1rem; margin-top: 1rem;">
                        <span>Subtotal:</span>
                        <span>R${this.orderData.subtotal.toFixed(2)}</span>
                    </div>

                    ${this.orderData.deliveryOption === 'delivery' ? `
                        <div class="order-summary-item">
                            <span>Delivery Fee:</span>
                            <span>${this.orderData.deliveryFee === 0 ? '<span style="color: #42b72a; font-weight: 600;">FREE</span>' : 'R' + this.orderData.deliveryFee.toFixed(2)}</span>
                        </div>
                    ` : ''}

                    <div class="order-summary-item" style="font-size: 1.2rem; font-weight: 700; border-top: 2px solid #000;">
                        <span>Total:</span>
                        <span>R${this.orderData.total.toFixed(2)}</span>
                    </div>
                </div>

                <div class="banking-details">
                    <h4>Banking Details for Payment</h4>
                    <p><strong>Bank:</strong> Capitec</p>
                    <p><strong>Account Holder:</strong> UAC Services</p>
                    <p><strong>Account Number:</strong> 144 336 4248</p>
                    <p><strong>Branch Code:</strong> 470010</p>
                    <p><strong>Account Type:</strong> Business Account</p>
                    <p style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #ccc;">
                        <strong>Payment Reference:</strong> ${this.orderData.orderId}
                    </p>
                    <p style="color: #721c24; background: #f8d7da; padding: 0.75rem; border-radius: 4px; margin-top: 1rem;">
                        <strong>Important:</strong> Please use the order ID (${this.orderData.orderId}) as your payment reference.
                    </p>
                </div>

                <div style="margin: 1.5rem 0;">
                    <h4>Payment Instructions</h4>
                    <ol style="margin-left: 1.5rem; line-height: 1.8;">
                        <li>Make an EFT payment to the banking details above</li>
                        <li>Use the order ID <strong>${this.orderData.orderId}</strong> as your reference</li>
                        <li>Upload your proof of payment below</li>
                        <li>Submit your order</li>
                    </ol>
                </div>

                <div class="form-group">
                    <label for="proofOfPayment">Upload Proof of Payment *</label>
                    <input type="file" id="proofOfPayment" accept="image/*,.pdf" required style="padding: 0.5rem;">
                    <small style="color: #65676b; display: block; margin-top: 0.5rem;">
                        Accepted formats: JPG, PNG, PDF (Max 5MB)
                    </small>
                </div>

                <div style="display: flex; gap: 1rem; margin-top: 1.5rem;">
                    <button class="btn btn-secondary" onclick="checkoutManager.renderStep1()" style="flex: 1;">Back</button>
                    <button class="btn btn-primary" onclick="checkoutManager.submitOrder()" style="flex: 2;">Submit Order</button>
                </div>
            </div>
        `;

        // Attach file input handler
        const fileInput = document.getElementById('proofOfPayment');
        if (fileInput) {
            fileInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    // Check file size (5MB limit)
                    if (file.size > 5 * 1024 * 1024) {
                        alert('File size must be less than 5MB');
                        e.target.value = '';
                        return;
                    }
                    this.orderData.proofOfPayment = file;
                }
            });
        }
    }

    async submitOrder() {
        // Validate proof of payment
        if (!this.orderData.proofOfPayment) {
            alert('Please upload proof of payment before submitting your order.');
            return;
        }

        // Convert file to base64 for email attachment
        const reader = new FileReader();
        reader.onload = async (e) => {
            const base64File = e.target.result.split(',')[1];

            // Prepare email data
            const emailData = {
                order_id: this.orderData.orderId,
                customer_company: this.orderData.customer.company,
                customer_name: this.orderData.customer.name,
                customer_phone: this.orderData.customer.phone,
                customer_email: this.orderData.customer.email,
                customer_address: this.orderData.customer.address,
                delivery_option: this.orderData.deliveryOption === 'delivery' ? 'Delivery' : 'Collection',
                items: this.orderData.items.map(item =>
                    `${item.name} - Qty: ${item.quantity} - R${item.totalPrice.toFixed(2)}`
                ).join('\n'),
                subtotal: `R${this.orderData.subtotal.toFixed(2)}`,
                delivery_fee: this.orderData.deliveryOption === 'delivery' ? `R${this.orderData.deliveryFee.toFixed(2)}` : 'N/A (Collection)',
                total: `R${this.orderData.total.toFixed(2)}`,
                attachment: base64File,
                attachment_name: this.orderData.proofOfPayment.name
            };

            // Send email using EmailJS
            try {
                await this.sendOrderEmail(emailData);
                this.renderOrderConfirmation();
                // Clear cart after successful order
                if (window.cart) {
                    window.cart.cart = [];
                    window.cart.saveCart();
                }
            } catch (error) {
                console.error('Order submission error:', error);
                alert('There was an error submitting your order. Please try again or contact us directly at uac@gmail.com');
            }
        };

        reader.readAsDataURL(this.orderData.proofOfPayment);
    }

    async sendOrderEmail(data) {
        // Check if EmailJS is configured
        if (typeof emailjs === 'undefined') {
            console.warn('EmailJS not configured. Order data:', data);
            // For demo purposes, we'll just show success
            return Promise.resolve();
        }

        // Send email via EmailJS
        // Note: User needs to configure their EmailJS account
        return emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', data);
    }

    renderOrderConfirmation() {
        const content = document.getElementById('checkoutContent');
        if (!content) return;

        content.innerHTML = `
            <div class="order-confirmation">
                <h3>Order Submitted Successfully! ✓</h3>
                <p>Thank you for your order!</p>

                <div class="order-id">Order ID: ${this.orderData.orderId}</div>

                <div style="text-align: left; margin: 2rem 0; padding: 1.5rem; background: white; border-radius: 8px;">
                    <h4 style="margin-bottom: 1rem;">What happens next?</h4>
                    <ol style="margin-left: 1.5rem; line-height: 2;">
                        <li>We'll verify your payment</li>
                        <li>You'll receive a confirmation email at <strong>${this.orderData.customer.email}</strong></li>
                        <li>Your order will be prepared for ${this.orderData.deliveryOption === 'delivery' ? 'delivery' : 'collection'}</li>
                        <li>We'll contact you when your order is ready</li>
                    </ol>
                </div>

                <div style="background: #e7f3ff; padding: 1rem; border-radius: 6px; margin: 1rem 0;">
                    <p><strong>Need to reference this order?</strong></p>
                    <p>Order ID: <strong>${this.orderData.orderId}</strong></p>
                    <p>Total: <strong>R${this.orderData.total.toFixed(2)}</strong></p>
                </div>

                <div style="margin-top: 2rem;">
                    <p>If you have any questions, please contact us:</p>
                    <p><strong>Email:</strong> <a href="mailto:uac@gmail.com">uac@gmail.com</a></p>
                    <p><strong>Phone:</strong> <a href="tel:0828261003">082 826 1003</a></p>
                </div>

                <button class="btn btn-primary btn-block" onclick="checkoutManager.closeCheckout(); window.location.href='index.html'">Back to Home</button>
            </div>
        `;
    }
}

// Initialize checkout manager
const checkoutManager = new CheckoutManager();

// Make it globally accessible
window.startCheckoutProcess = function(cartInstance) {
    checkoutManager.startCheckout(cartInstance);
};

window.checkoutManager = checkoutManager;

// Close modal on X button
document.addEventListener('DOMContentLoaded', () => {
    const closeBtn = document.getElementById('closeCheckout');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            checkoutManager.closeCheckout();
        });
    }

    // Close modal on outside click
    const modal = document.getElementById('checkoutModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                checkoutManager.closeCheckout();
            }
        });
    }
});
