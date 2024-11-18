// ShowInvoices() - Display all invoices and allow searching by TRN
function ShowInvoices() {
    const invoices = JSON.parse(localStorage.getItem('AllInvoices')) || [];

    // If no invoices exist
    if (invoices.length === 0) {
        console.log("No invoices found.");
        return;
    }

    // Log all invoices to the console
    console.log("Displaying all invoices:");
    invoices.forEach(invoice => {
        console.log(`Invoice Number: ${invoice.invoiceNumber}`);
        console.log(`Date: ${invoice.date}`);
        console.log(`Total Cost: $${invoice.totalCost}`);
        console.log(`TRN: ${invoice.trn}`);
        console.log(`Shipping Information: ${invoice.shippingInfo}`);
        console.log('----------------------------------------');
    });

    // Allow searching for an invoice by TRN
    const searchTRN = prompt("Enter TRN to search for an invoice:");
    
    const foundInvoice = invoices.find(invoice => invoice.trn === searchTRN);
    
    if (foundInvoice) {
        console.log("Invoice Found:");
        console.log(`Invoice Number: ${foundInvoice.invoiceNumber}`);
        console.log(`Date: ${foundInvoice.date}`);
        console.log(`Total Cost: $${foundInvoice.totalCost}`);
        console.log(`TRN: ${foundInvoice.trn}`);
        console.log(`Shipping Information: ${foundInvoice.shippingInfo}`);
    } else {
        console.log("No invoice found with this TRN.");
    }
}

// GetUserInvoices() - Display invoices for a user based on TRN from RegisterData
function GetUserInvoices() {
    const users = JSON.parse(localStorage.getItem('RegisterData')) || [];
    const trn = prompt("Enter your TRN to view your invoices:");

    // Find the user with the matching TRN
    const user = users.find(user => user.trn === trn);

    if (user) {
        // Get all invoices
        const invoices = JSON.parse(localStorage.getItem('AllInvoices')) || [];

        // Filter invoices for this user based on their TRN
        const userInvoices = invoices.filter(invoice => invoice.trn === trn);

        // If no invoices found for the user
        if (userInvoices.length === 0) {
            console.log(`No invoices found for TRN: ${trn}`);
            return;
        }

        console.log(`Invoices for TRN: ${trn} (${user.firstName} ${user.lastName}):`);
        userInvoices.forEach(invoice => {
            console.log(`Invoice Number: ${invoice.invoiceNumber}`);
            console.log(`Date: ${invoice.date}`);
            console.log(`Total Cost: $${invoice.totalCost}`);
            console.log(`Shipping Info: ${invoice.shippingInfo}`);
            console.log('----------------------------------------');
        });
    } else {
        console.log("No user found with this TRN.");
    }
}
