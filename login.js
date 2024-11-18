// login.js

// 1. Track the number of login attempts made by the user.
let attempts = 0;

// 2. Add an event listener to handle form submission when the login form is submitted.
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault(); // 3. Prevent the form from submitting and refreshing the page.

    // 4. Get the values entered in the TRN and password fields.
    const trn = document.getElementById('trn').value.trim();  // Get the TRN entered by the user.
    const password = document.getElementById('password').value; // Get the password entered by the user.

    // 5. Retrieve the registration data from localStorage.
    const registrationData = JSON.parse(localStorage.getItem('RegistrationData')) || [];  // Get the array of users from localStorage.

    // 6. Find the user by matching the entered TRN and password.
    const user = registrationData.find(user => user.trn === trn && user.password === password);

    // 7. If the user is found and the credentials match, proceed with the successful login process.
    if (user) {
        // 8. Reset the attempts counter and redirect the user to the product catalog page upon successful login.
        attempts = 0;  // Reset the login attempts.
        alert("Login successful!");  // Show an alert message indicating successful login.
        window.location.href = "products.html"; // Redirect the user to the product catalog page.
    } else {
        // 9. If login fails, increment the number of attempts.
        attempts++;

        // 10. Get the error message element where the login error will be displayed.
        const errorMessage = document.getElementById('errorMessage');

        // 11. If the login attempts exceed 3, lock the account and redirect to an "account locked" page.
        if (attempts >= 3) {
            errorMessage.innerText = "Too many failed attempts. Account is locked.";  // Show account locked message.
            setTimeout(() => {
                window.location.href = "account_locked.html";  // Redirect to account locked page after a short delay.
            }, 2000);
        } else {
            // 12. If the login fails but the attempts are less than 3, show the number of attempts left.
            errorMessage.innerText = `Invalid TRN or password. Attempt ${attempts} of 3.`;  // Show an error message with the number of remaining attempts.
        }
    }
});

// 13. Event listener for the "Reset Password" link to allow users to reset their password.
document.getElementById('resetPassword').addEventListener('click', function() {
    // 14. Prompt the user to enter their TRN in order to reset their password.
    const trn = prompt("Please enter your TRN to reset your password:");

    // 15. Retrieve the registration data from localStorage.
    const registrationData = JSON.parse(localStorage.getItem('RegistrationData')) || [];  // Get the array of users.

    // 16. Find the user by matching the entered TRN.
    const user = registrationData.find(user => user.trn === trn);

    // 17. If the user is found, prompt them for a new password and update it.
    if (user) {
        const newPassword = prompt("Please enter your new password:");  // Prompt the user to enter a new password.
        user.password = newPassword;  // Update the user's password in the registration data.

        // 18. Save the updated user data back to localStorage.
        localStorage.setItem('RegistrationData', JSON.stringify(registrationData));  // Update localStorage with the new password.

        alert("Password reset successfully!");  // Notify the user that the password was reset successfully.
    } else {
        // 19. If the TRN is not found, show an error message indicating that the TRN was not found.
        alert("TRN not found. Unable to reset the password.");  // Show error message if TRN doesn't exist in the system.
    }

    // products.js (or inside your products.html)
window.onload = function() {
    // Check if user is logged in (check for TRN or a login flag in localStorage)
    const user = JSON.parse(localStorage.getItem('user'));
    
    // If no user data exists in localStorage, redirect to login page
    if (!user) {
        window.location.href = "login.html";
    }

    // Otherwise, load the product catalog
    displayProducts();
};

});
