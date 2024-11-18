// 1. Function to display all invoices stored in localStorage
function showInvoices() {
    // 2. Retrieve all invoices from localStorage, or initialize as an empty array if none exist
    const allInvoices = JSON.parse(localStorage.getItem('AllInvoices')) || [];
    
    // 3. Get the HTML element where the invoices will be displayed
    const invoicesListDiv = document.getElementById('invoicesList');
    
    // 4. Clear any previous list of invoices
    invoicesListDiv.innerHTML = '';

    // 5. Check if there are no invoices stored
    if (allInvoices.length === 0) {
        // 6. If no invoices, display a message indicating no invoices are found
        invoicesListDiv.innerHTML = '<p>No invoices found.</p>';
        return;
    }

    // 7. Loop through each invoice and display its details
    allInvoices.forEach(invoice => {
        // 8. Create a new div element to hold the invoice details
        const invoiceDiv = document.createElement('div');
        invoiceDiv.innerHTML = `
            <h4>Invoice Number: ${invoice.invoiceNumber}</h4>  <!-- 9. Display the invoice number -->
            <p>Date: ${new Date(invoice.date).toLocaleDateString()}</p> <!-- 10. Display the invoice date -->
            <p>Name: ${invoice.shippingInfo.name}</p> <!-- 11. Display the recipient's name -->
            <p>Address: ${invoice.shippingInfo.address}</p> <!-- 12. Display the shipping address -->
            <p>Total Cost: $${invoice.totalCost.toFixed(2)}</p> <!-- 13. Display the total cost -->
            <hr/>
        `;
        // 14. Append the invoice details to the invoices list div
        invoicesListDiv.appendChild(invoiceDiv);
    });
}

// 15. Event listener for the "Search" button to filter invoices by TRN
document.getElementById('searchButton').addEventListener('click', function() {
   // 16. Get the TRN value entered by the user to search for invoices
   const trnSearchValue = document.getElementById('trnSearch').value.trim();
   
   // 17. Retrieve all invoices from localStorage
   const allInvoices = JSON.parse(localStorage.getItem('AllInvoices')) || [];
   
   // 18. Filter invoices that match the entered TRN
   const filteredInvoices = allInvoices.filter(invoice => invoice.trn === trnSearchValue);
   
   // 19. Get the div where the filtered invoices will be displayed
   const invoicesListDiv = document.getElementById('invoicesList');
   invoicesListDiv.innerHTML = ''; // 20. Clear previous search results

   // 21. Check if no invoices were found for the provided TRN
   if (filteredInvoices.length === 0) {
       // 22. If no invoices, display a message indicating no invoices were found for this TRN
       invoicesListDiv.innerHTML = '<p>No invoices found for this TRN.</p>';
       return;
   }

   // 23. Loop through each filtered invoice and display its details
   filteredInvoices.forEach(invoice => {
       // 24. Create a new div element to hold the filtered invoice details
       const invoiceDiv = document.createElement('div');
       invoiceDiv.innerHTML = `
           <h4>Invoice Number: ${invoice.invoiceNumber}</h4> <!-- 25. Display the invoice number -->
           <p>Date: ${new Date(invoice.date).toLocaleDateString()}</p> <!-- 26. Display the invoice date -->
           <p>Name: ${invoice.shippingInfo.name}</p> <!-- 27. Display the recipient's name -->
           <p>Address: ${invoice.shippingInfo.address}</p> <!-- 28. Display the shipping address -->
           <p>Total Cost: $${invoice.totalCost.toFixed(2)}</p> <!-- 29. Display the total cost -->
           <hr/>
       `;
       // 30. Append the filtered invoice details to the invoices list div
       invoicesListDiv.appendChild(invoiceDiv);
   });
});

// 31. Call the function to show all invoices when the page loads
showInvoices();  // 32. Display all invoices

// 33. Back button functionality to return to the main page or dashboard
document.getElementById('backButtonInvoices').addEventListener('click', function() {
   window.location.href = 'index.html'; // 34. Redirect back to the main page (or dashboard)
});
