// Define selectors
const cartItemsContainer = document.querySelector('.cart-items');
const totalPriceElement = document.querySelector('.total-price');
const checkoutForm = document.getElementById('checkout-form');
const payButton = document.querySelector('.pay-button');
const spinner = document.querySelector('.spinner');

// Load cart data from localStorage
function loadCartData() {
    const cartData = JSON.parse(localStorage.getItem('cart')) || [];
    renderCartItems(cartData);
    updateTotalPrice(cartData);
}

// Render cart items
function renderCartItems(cartData) {
    cartItemsContainer.innerHTML = '';

    if (cartData.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    cartData.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${item.imageUrl}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p>Brand: ${item.brand}</p>
                <p>Price: ₹${item.price}</p>
                <div class="quantity-control">
                    <button class="decrease-quantity" data-index="${index}">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="increase-quantity" data-index="${index}">+</button>
                </div>
                <button class="remove-item" data-index="${index}">Remove</button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    attachEventListeners(cartData);
}

// Update total price
function updateTotalPrice(cartData) {
    const totalPrice = cartData.reduce((total, item) => total + item.price * item.quantity, 0);
    totalPriceElement.textContent = `Total Price: ₹${totalPrice.toFixed(2)}`;
}

// Attach event listeners to cart item controls
function attachEventListeners(cartData) {
    const increaseButtons = document.querySelectorAll('.increase-quantity');
    const decreaseButtons = document.querySelectorAll('.decrease-quantity');
    const removeButtons = document.querySelectorAll('.remove-item');

    increaseButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const index = button.getAttribute('data-index');
            cartData[index].quantity += 1;
            localStorage.setItem('cart', JSON.stringify(cartData));
            loadCartData();
        });
    });

    decreaseButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const index = button.getAttribute('data-index');
            if (cartData[index].quantity > 1) {
                cartData[index].quantity -= 1;
                localStorage.setItem('cart', JSON.stringify(cartData));
                loadCartData();
            } else {
                alert('Minimum quantity is 1. Use remove button to delete the product.');
            }
        });
    });

    removeButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const index = button.getAttribute('data-index');
            cartData.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cartData));
            loadCartData();
            alert('Product removed from cart.');
        });
    });
}

// Handle checkout form submission
checkoutForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const address = document.getElementById('address').value.trim();

    if (!name || !email || !address) {
        alert('Please fill out all required fields.');
        return;
    }

    alert('Checkout details saved. Proceeding to payment...');
    startPayment();
});

// Start payment process
function startPayment() {
    payButton.disabled = true;
    spinner.style.display = 'block'; // Show spinner

    setTimeout(() => {
        spinner.style.display = 'none'; // Hide spinner
        alert('Payment successful! Thank you for your purchase.');
        localStorage.removeItem('cart');
        loadCartData();
    }, 3000); // Simulate payment process delay
}

// Load cart data on page load
loadCartData();







