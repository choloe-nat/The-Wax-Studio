// Store selected items (services or products) in localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to handle service and product selection
document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        const selectedItem = {
            name: this.dataset.name,
            cost: parseFloat(this.dataset.cost),
        };

        if (this.checked) {
            cart.push(selectedItem);
        } else {
            // Remove the item from the cart if unselected
            cart = cart.filter(item => item.name !== selectedItem.name);
        }

        // Update cart in localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Update checkout summary
        updateCheckout();
    });
});

// Update checkout summary
function updateCheckout() {
    const checkoutSection = document.getElementById('invoiceSection');
    checkoutSection.style.display = 'block'; // Make checkout section visible
    checkoutSection.innerHTML = '<h3>Checkout Summary</h3>';

    let subtotal = 0;
    cart.forEach(item => {
        checkoutSection.innerHTML += `<p>${item.name} - $${item.cost.toFixed(2)}</p>`;
        subtotal += item.cost;
    });

    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + tax;

    checkoutSection.innerHTML += `
        <p>Subtotal: $${subtotal.toFixed(2)}</p>
        <p>Tax: $${tax.toFixed(2)}</p>
        <p>Total: $${total.toFixed(2)}</p>
    `;
}

// Checkout button (redirect to the checkout page)
document.getElementById('checkoutButton').addEventListener('click', function () {
    window.location.href = 'checkout.html'; // Redirect to checkout page
});

// Cancel button (clear selection and reset checkout)
document.getElementById('cancelButton').addEventListener('click', function () {
    localStorage.removeItem('cart');
    cart = [];
    updateCheckout(); // Reset checkout summary
});

// Initial call to update the checkout section on page load
updateCheckout();
