// registration.js

// Event listener for the form submission
document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent default form submission behavior

    // Get the input values from the registration form
    const firstName = document.getElementById('firstName').value;  // User's first name
    const lastName = document.getElementById('lastName').value;    // User's last name
    const dob = document.getElementById('dob').value;              // User's date of birth
    const gender = document.getElementById('gender').value;        // User's gender
    const phone = document.getElementById('phone').value;          // User's phone number
    const email = document.getElementById('email').value;          // User's email address
    const trn = document.getElementById('trn').value;              // User's tax registration number (TRN)
    const password = document.getElementById('password').value;    // User's password

    // 1. Calculate the user's age based on their date of birth
    const age = calculateAge(dob);

    // 2. Create a new user object to store registration data
    const newUser = {
        firstName,  // User's first name
        lastName,   // User's last name
        dob,        // User's date of birth
        gender,     // User's gender
        phone,      // User's phone number
        email,      // User's email address
        trn,        // User's TRN (unique identifier for login)
        password,   // User's password (secure data handling should be implemented in production)
        age         // User's calculated age
    };

    // 3. Retrieve the existing users from localStorage or initialize an empty array if none exist
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // 4. Add the new user to the array of users
    users.push(newUser);

    // 5. Save the updated users array to localStorage to persist the data
    localStorage.setItem('users', JSON.stringify(users));

    // 6. Calculate and update the user frequency statistics
    updateUserFrequency(users);

    // 7. Show a success message and redirect the user (or clear the form for new registration)
    alert('Registration successful!');
    window.location.href = 'dashboard.html';  // Redirect to the dashboard (user frequency view)
});

// 8. Function to calculate the user's age based on their date of birth
function calculateAge(dob) {
    const birthDate = new Date(dob);         // Convert date of birth to a Date object
    const currentDate = new Date();         // Get the current date
    const age = currentDate.getFullYear() - birthDate.getFullYear();  // Calculate the age

    // Adjust the age if the user has not yet had their birthday this year
    const monthDifference = currentDate.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && currentDate.getDate() < birthDate.getDate())) {
        return age - 1;  // Subtract one year if the birthday hasn't occurred yet this year
    }

    return age;  // Return the calculated age
}

// 9. Function to update and store user frequency statistics (gender and age group)
function updateUserFrequency(users) {
    // Initialize frequency stats for gender and age groups
    let genderStats = {
        male: 0,
        female: 0,
        other: 0
    };

    let ageStats = {
        '18-25': 0,
        '26-35': 0,
        '36-50': 0,
        '50+': 0
    };

    // Loop through each user to count gender and age group frequencies
    users.forEach(user => {
        // Count the gender of each user
        if (user.gender === 'male') genderStats.male++;
        else if (user.gender === 'female') genderStats.female++;
        else if (user.gender === 'other') genderStats.other++;

        // Count the age group of each user
        if (user.age >= 18 && user.age <= 25) ageStats['18-25']++;
        else if (user.age >= 26 && user.age <= 35) ageStats['26-35']++;
        else if (user.age >= 36 && user.age <= 50) ageStats['36-50']++;
        else if (user.age > 50) ageStats['50+']++;
    });

    // 10. Store the updated frequency statistics to localStorage
    localStorage.setItem('genderStats', JSON.stringify(genderStats));  // Store gender frequency stats
    localStorage.setItem('ageStats', JSON.stringify(ageStats));        // Store age frequency stats
}
