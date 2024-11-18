// 1. Function to display user frequency based on Gender and Age Group
function showUserFrequency() {
    // 2. Retrieve all users from localStorage, or initialize as an empty array if no data exists
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // 3. Initialize counters for gender categories
    let maleCount = 0;
    let femaleCount = 0;
    let otherCount = 0;

    // 4. Initialize counters for age group categories
    let age18to25 = 0;
    let age26to35 = 0;
    let age36to50 = 0;
    let age50plus = 0;

    // 5. Loop through all the users to classify them by gender and age group
    users.forEach(user => {
        // 6. Count gender categories (Male, Female, Other)
        if (user.gender === 'male') maleCount++; // 7. If the gender is 'male', increase the maleCount
        else if (user.gender === 'female') femaleCount++; // 8. If the gender is 'female', increase the femaleCount
        else if (user.gender === 'other') otherCount++; // 9. If the gender is 'other', increase the otherCount

        // 10. Count age groups
        if (user.age >= 18 && user.age <= 25) age18to25++; // 11. If the age is between 18 and 25, increase age18to25
        else if (user.age >= 26 && user.age <= 35) age26to35++; // 12. If the age is between 26 and 35, increase age26to35
        else if (user.age >= 36 && user.age <= 50) age36to50++; // 13. If the age is between 36 and 50, increase age36to50
        else if (user.age > 50) age50plus++; // 14. If the age is above 50, increase age50plus
    });

    // 15. Display the gender frequency on the dashboard (or separate page)
    document.getElementById('male-count').textContent = `Male: ${maleCount}`; // 16. Display male count in an HTML element with ID 'male-count'
    document.getElementById('female-count').textContent = `Female: ${femaleCount}`; // 17. Display female count in an HTML element with ID 'female-count'
    document.getElementById('other-count').textContent = `Other: ${otherCount}`; // 18. Display other gender count in an HTML element with ID 'other-count'

    // 19. Display the age group frequency
    document.getElementById('age-18-25').textContent = `18-25: ${age18to25}`; // 20. Display 18-25 age group count in an HTML element with ID 'age-18-25'
    document.getElementById('age-26-35').textContent = `26-35: ${age26to35}`; // 21. Display 26-35 age group count in an HTML element with ID 'age-26-35'
    document.getElementById('age-36-50').textContent = `36-50: ${age36to50}`; // 22. Display 36-50 age group count in an HTML element with ID 'age-36-50'
    document.getElementById('age-50+').textContent = `50+: ${age50plus}`; // 23. Display 50+ age group count in an HTML element with ID 'age-50+'
}

// 24. Run the function when the page loads to populate the data
window.onload = showUserFrequency; // 25. Call the showUserFrequency function on page load
