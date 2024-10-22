document.addEventListener("DOMContentLoaded", function() {
    const now = new Date();
    const hours = now.getHours();
    const greeting = document.querySelector('.hero h1');
    const cartButtons = document.querySelectorAll('.add-to-cart');
    const cartPopup = document.getElementById('cart-popup');
    const cancelPopup = document.getElementById('cancel-popup'); // Cancel popup element
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Greeting logic based on time of day
    if (greeting) {
        if (hours < 12) {
            greeting.textContent = 'Good Morning! Discover tools for mindfulness today!';
        } else if (hours < 18) {
            greeting.textContent = 'Good Afternoon! Continue your journey to mindfulness!';
        } else {
            greeting.textContent = 'Good Evening! Unwind with our mindfulness tools!';
        }
    }

    // Add to Cart functionality with Popup message
    cartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productItem = button.closest('.product-item');
            const productName = productItem.querySelector('h3').innerText;
            const productPrice = productItem.querySelector('.price').innerText;

            // Add item to the cart array
            cart.push({ name: productName, price: productPrice });
            localStorage.setItem('cart', JSON.stringify(cart));

            // Show "added to cart" popup
            showCartPopup(cartPopup);
        });
    });

    function showCartPopup(popupElement) {
        if (popupElement) {
            popupElement.classList.add('show');
            setTimeout(() => {
                popupElement.classList.remove('show');
            }, 3000);
        } else {
            console.error('Popup element not found');
        }
    }

    // Mobile navbar toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', function () {
            navLinks.classList.toggle('active');
        });
    }

    // Display Cart Items on the Cart Page
    if (document.querySelector('.cart-items')) {
        const cartItemsContainer = document.querySelector('.cart-items');
        cart = JSON.parse(localStorage.getItem('cart')) || [];

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>No items in your cart yet.</p>';
        } else {
            cartItemsContainer.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <h3>${item.name}</h3>
                    <span class="price">${item.price}</span>
                </div>
            `).join('');
        }

        // Calculate total
        const total = cart.reduce((sum, item) => sum + parseFloat(item.price.replace('$', '')), 0);
        document.querySelector('.cart-total h3').innerText = `Total: $${total.toFixed(2)}`;
    }

    // Handle cancel button functionality
    const cancelButton = document.querySelector('.cancel-btn');
    if (cancelButton) {
        cancelButton.addEventListener('click', function() {
            // Clear the cart from localStorage
            localStorage.removeItem('cart');

            // Show the custom cancel popup
            showCartPopup(cancelPopup);

            // Navigate to the store page after the popup disappears
            setTimeout(() => {
                window.location.href = 'store.html';
            }, 3000); // 3 seconds to match popup duration
        });
    }
});
