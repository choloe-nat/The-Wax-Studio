// 1. Helper function to generate a unique invoice number
function generateInvoiceNumber() {
    // 2. Return a random number between 1 and 1,000,000 as the invoice number
    return Math.floor(Math.random() * 1000000) + 1;
}

// 3. Function to display cart and checkout details
function displayInvoice() {
    // 4. Retrieve cart items and shipping details from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const shippingInfo = JSON.parse(localStorage.getItem('shippingInfo')) || {};

    // 5. Get the current date and format it for the invoice
    const date = new Date();
    const invoiceDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    document.getElementById('invoice-date').textContent = invoiceDate;

    // 6. Generate a unique invoice number and display it
    const invoiceNumber = generateInvoiceNumber();
    document.getElementById('invoice-number').textContent = invoiceNumber;

    // 7. Display the shipping information in the invoice
    document.getElementById('shipping-name').textContent = shippingInfo.name || 'N/A';
    document.getElementById('shipping-address').textContent = shippingInfo.address || 'N/A';

    // 8. Initialize variables for calculating subtotal, tax, and total cost
    let subtotal = 0;
    let tax = 0;
    let totalCost = 0;
    const itemsList = document.getElementById('items-list');

    // 9. Loop through cart items and display their details in the invoice
    cart.forEach(item => {
        const itemSubtotal = item.price * item.quantity;
        subtotal += itemSubtotal;

        // 10. Calculate tax (10% for simplicity)
        tax = subtotal * 0.1;
        totalCost = subtotal + tax;

        // 11. Create a table row for each item in the cart
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>$0.00</td> <!-- No discount in this example -->
            <td>$${itemSubtotal.toFixed(2)}</td>
        `;
        itemsList.appendChild(row);
    });

    // 12. Display the calculated taxes, subtotal, and total cost in the invoice
    document.getElementById('taxes').textContent = tax.toFixed(2);
    document.getElementById('subtotal').textContent = subtotal.toFixed(2);
    document.getElementById('total-cost').textContent = totalCost.toFixed(2);
}

// 13. Event listener for the "Confirm Checkout" button
document.getElementById('confirm-button').addEventListener('click', function () {
    // 14. Retrieve cart and shipping information from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const shippingInfo = JSON.parse(localStorage.getItem('shippingInfo')) || {};

    // 15. Get the current date and generate a unique invoice number
    const date = new Date();
    const invoiceDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    const invoiceNumber = generateInvoiceNumber();

    // 16. Initialize variables for calculating subtotal, tax, and total cost
    let subtotal = 0;
    let tax = 0;
    let totalCost = 0;

    // 17. Loop through the cart to calculate subtotal, tax, and total cost
    cart.forEach(item => {
        const itemSubtotal = item.price * item.quantity;
        subtotal += itemSubtotal;
        tax = subtotal * 0.1;
        totalCost = subtotal + tax;
    });

    // 18. Create the invoice object with all necessary information
    const invoice = {
        company: "The Smooth Skin Studio",  // 19. Company name
        invoiceDate: invoiceDate,  // 20. Date of the invoice
        invoiceNumber: invoiceNumber,  // 21. Unique invoice number
        trn: "123-456-789",  // 22. Tax Registration Number (TRN) for the business
        shippingInfo: shippingInfo,  // 23. Shipping information (name, address)
        items: cart,  // 24. Items in the cart
        taxes: tax.toFixed(2),  // 25. Total tax applied
        subtotal: subtotal.toFixed(2),  // 26. Subtotal cost of the items
        totalCost: totalCost.toFixed(2)  // 27. Final total cost including taxes
    };

    // 28. Retrieve the existing invoices from localStorage or initialize an empty array
    let allInvoices = JSON.parse(localStorage.getItem('AllInvoices')) || [];

    // 29. Add the newly generated invoice to the invoices array
    allInvoices.push(invoice);

    // 30. Save the updated invoices array back to localStorage
    localStorage.setItem('AllInvoices', JSON.stringify(allInvoices));

    // 31. Optionally, show a message that the invoice has been sent to the user's email
    alert("Your invoice has been generated and sent to your email!");

    // 32. Clear cart and shipping info from localStorage after successful checkout
    localStorage.removeItem('cart');
    localStorage.removeItem('shippingInfo');

    // 33. Redirect the user to a Thank You page or Invoice Page
    window.location.href = "thank-you.html";  // 34. Redirect to a custom "Thank You" page
});

// 35. Event listener for the "Cancel" button to go back to the cart
document.getElementById('cancel-button').addEventListener('click', function () {
    window.location.href = "cart.html";  // 36. Redirect the user back to the cart page
});

// 37. Load the invoice details when the page loads
window.onload = displayInvoice;  // 38. Call displayInvoice function to show the cart and checkout details
