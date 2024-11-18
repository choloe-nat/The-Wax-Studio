// 1. Retrieve the cart data from localStorage or initialize an empty array if no cart is found
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// 2. Get the element where cart details will be displayed
const cartDetails = document.getElementById('cartDetails');

// 3. Function to update and display the cart details
function updateCart() {
    cartDetails.innerHTML = '';  // 4. Clear any existing cart details from the display

    // 5. Loop through each item in the cart to display its details
    cart.forEach((item, index) => {
        // 6. Create a new div for each item in the cart
        const itemDiv = document.createElement('div');

        // 7. Populate the itemDiv with the item's name, price, and a "Remove" button
        itemDiv.innerHTML = `
            <p>${item.name} - $${item.price}</p>
            <button onclick="removeItem(${index})">Remove</button>
        `;
        
        // 8. Append the itemDiv to the cartDetails container
        cartDetails.appendChild(itemDiv);
    });
}

// 9. Function to remove an item from the cart by index
function removeItem(index) {
    // 10. Remove the item from the cart array using splice
    cart.splice(index, 1);

    // 11. Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // 12. Update the cart display after removal
    updateCart();
}

// 13. Add an event listener to the "Clear All" button to remove all items from the cart
document.getElementById('clearAllButton').addEventListener('click', () => {
    // 14. Remove the cart from localStorage and reset the cart array
    localStorage.removeItem('cart');
    cart = [];

    // 15. Update the cart display after clearing all items
    updateCart();
});

// 16. Call the updateCart function to display the cart when the page loads
updateCart();
