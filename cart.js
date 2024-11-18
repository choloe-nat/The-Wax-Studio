// Initialize the cart from localStorage or an empty array if nothing is found
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to display cart items
function displayCart() {
    const cartItemsDiv = document.getElementById('cartItems');
    const subtotalElement = document.getElementById('subtotal');
    const taxesElement = document.getElementById('taxes');
    const discountElement = document.getElementById('discount');
    const totalElement = document.getElementById('total');

    let subtotal = 0;
    cartItemsDiv.innerHTML = ''; // Clear existing items in the cart display

    // Loop through the cart items and display each item
    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        itemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="name">${item.name}</div>
            <div class="quantity">
                <button onclick="updateQuantity('${item.name}', -1)">-</button>
                <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity('${item.name}', this.value)">
                <button onclick="updateQuantity('${item.name}', 1)">+</button>
            </div>
            <div class="price">$${(item.price * item.quantity).toFixed(2)}</div>
            <button class="remove-item" onclick="removeItem('${item.name}')">Remove</button>
        `;
        cartItemsDiv.appendChild(itemDiv);
        subtotal += item.price * item.quantity;
    });

    // Example tax and discount values
    const taxRate = 0.10; // 10% tax rate
    const discount = 5.00; // Fixed discount for demonstration

    const taxes = subtotal * taxRate;
    const total = subtotal + taxes - discount;

    // Update the subtotal, taxes, discount, and total display
    subtotalElement.textContent = subtotal.toFixed(2);
    taxesElement.textContent = taxes.toFixed(2);
    discountElement.textContent = discount.toFixed(2);
    totalElement.textContent = total.toFixed(2);
}

// Display the cart when the page loads
window.onload = displayCart;

// Function to update the quantity of an item
function updateQuantity(name, newQuantity) {
    // Ensure newQuantity is a valid number
    if (typeof newQuantity === 'string') {
        newQuantity = parseInt(newQuantity);
    }

    // Find the item in the cart and update its quantity
    const itemIndex = cart.findIndex(item => item.name === name);
    if (itemIndex > -1) {
        cart[itemIndex].quantity = newQuantity > 0 ? newQuantity : 1; // Prevent quantity from being zero or negative
        localStorage.setItem('cart', JSON.stringify(cart)); // Save the updated cart to localStorage
        displayCart(); // Re-render the cart
    }
}

// Function to remove an item from the cart
function removeItem(name) {
    // Filter out the item by name
    cart = cart.filter(item => item.name !== name);
    localStorage.setItem('cart', JSON.stringify(cart)); // Save the updated cart
    displayCart(); // Re-render the cart
}

// Function to clear all items from the cart
function clearCart() {
    cart = [];
    localStorage.removeItem('cart'); // Clear the cart from localStorage
    displayCart(); // Re-render the cart
}

// Function to handle checkout (redirect or further action)
function checkout() {
    alert('Proceeding to checkout...');
    window.location.href = 'checkout.html'; // Redirect to the checkout page
}

// Close the cart (for modal use or closing the view)
function closeCart() {
    window.location.href = 'index.html'; // Redirect back to the homepage or previous page
}
