// Create an array of waxing products (objects)
const products = [
    {
        name: "Honey Wax",
        price: 15.99,
        description: "A gentle honey-based wax ideal for sensitive skin. Perfect for full-body waxing.",
        image: "assets/honey_wax.WEBP",
    },
    {
        name: "Hard Wax Beans",
        price: 18.99,
        description: "Premium quality hard wax beans that melt easily and remove hair without strips.",
        image: "assets/hard_wax_beans.WEBP",
    },
    {
        name: "Waxing Strips",
        price: 8.99,
        description: "Cotton strips designed for use with soft wax, providing a smooth and clean finish.",
        image: "assets/waxing_strips.WEBP",
    },
    {
        name: "Aloe Vera After Wax Gel",
        price: 12.50,
        description: "Soothe and calm your skin after waxing with this refreshing aloe vera gel.",
        image: "assets/aloe_vera_gel.JPG",
    },
    {
        name: "Pre-Wax Cleanser",
        price: 9.99,
        description: "Prepare your skin for waxing with this gentle pre-wax cleanser to ensure optimal adhesion.",
        image: "assets/pre_wax_cleanser.WEBP",
    },
    {
        name: "Post-Wax Oil",
        price: 11.50,
        description: "Moisturizing oil that helps remove wax residue and hydrate the skin after waxing.",
        image: "assets/post_wax_oil.WEBP",
    },
];

// 1. Store the products in localStorage
localStorage.setItem('AllProducts', JSON.stringify(products));

// 2. Function to display products dynamically
function displayProducts() {
    // 3. Get the element where the products will be displayed
    const productList = document.getElementById('productList');
    // 4. Retrieve the product list from localStorage
    const products = JSON.parse(localStorage.getItem('AllProducts'));

    // 5. Check if there are any products available
    if (!products || products.length === 0) {
        productList.innerHTML = '<p>No products available.</p>';  // 6. If no products are found, show a message
        return;
    }

    // 7. Clear the current product list before displaying new ones
    productList.innerHTML = '';

    // 8. Loop through the products array and create HTML elements for each product
    products.forEach((product) => {
        const productDiv = document.createElement('div');  // 9. Create a new div element for each product
        productDiv.classList.add('product');  // 10. Add a CSS class to style the product div

        // 11. Populate the div with the product's image, name, description, price, and "Add to Cart" button
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p class="price">$${product.price.toFixed(2)}</p>
            <button class="add-to-cart" data-name="${product.name}" data-price="${product.price}" data-description="${product.description}" data-image="${product.image}">Add to Cart</button>
        `;

        // 12. Append the productDiv to the productList container
        productList.appendChild(productDiv);
    });
}

// 13. Function to add a product to the cart
function addToCart(event) {
    // 14. Check if the clicked element is an "Add to Cart" button
    if (!event.target.classList.contains('add-to-cart')) return;

    // 15. Create a new product object with the selected product's data
    const product = {
        name: event.target.dataset.name,
        price: parseFloat(event.target.dataset.price),
        description: event.target.dataset.description,
        image: event.target.dataset.image,
        quantity: 1  // 16. Initially set the quantity to 1 when adding the product to the cart
    };

    // 17. Retrieve the current shopping cart from localStorage or initialize an empty array if not found
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // 18. Check if the product already exists in the cart
    const existingProductIndex = cart.findIndex(item => item.name === product.name);

    if (existingProductIndex > -1) {
        // 19. If the product is already in the cart, increase its quantity by 1
        cart[existingProductIndex].quantity++;
    } else {
        // 20. If the product is not in the cart, add it to the cart array
        cart.push(product);
    }

    // 21. Save the updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // 22. Show an alert to notify the user that the product has been added to the cart
    alert(`${product.name} has been added to your cart!`);
}

// 23. Event listener to handle "Add to Cart" button clicks
document.getElementById('productList').addEventListener('click', addToCart);

// 24. Display the products when the page loads
window.onload = displayProducts;
