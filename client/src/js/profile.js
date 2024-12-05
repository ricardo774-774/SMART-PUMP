// Navegation
let navProfile = document.getElementById('nav-profile');
// Image
let imageEleme = document.getElementById('user-img');
// Modal Elements
const modal = document.getElementById('warning-modal');
const deleteButton = document.getElementById('delete-user');
const cancelButton = document.getElementById('cancel-delete');
const confirmButton = document.getElementById('confirm-delete');
// User data
let firstInput = document.getElementById('first');
let lastInput = document.getElementById('last');
let emailInput = document.getElementById('email');
let ageInput = document.getElementById('age');
let eyeColorInput = document.getElementById('eyeColor');
let companyInput = document.getElementById('company');
let phoneInput = document.getElementById('phone');
let addressInput = document.getElementById('address');
// Update user
let formUpdate = document.getElementById('profile-update-form');
let updateUserBtn = document.getElementById('update-user');


document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('accessToken');
    // If there is no token, redirect to login
    if (!token) {
        window.location.href = '/src/views/welcome.html';
    }

    // Validate token and customize view
    fetch('http://localhost:3000/api/v1/auth/validate', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token,
        })
    })
    .then(response => response.json())
    .then(data => {
        if (!data.user) {
            window.location.href = '/src/views/welcome.html';
            localStorage.removeItem('accessToken');
            localStorage.removeItem('userId');
        } else {
            let {
                name,
                email,
                age,
                eyeColor,
                company,
                phone,
                address,
            } = data.user;
            
            // Image user
            (imageEleme.length > 2)
              ? imageEleme.src = picture
              : imageEleme.src = "/src/assets/default.jpg"

            firstInput.value = name.first || '';
            lastInput.value = name.last || '';
            emailInput.value = email || '';
            ageInput.value = age || '';
            eyeColorInput.value = eyeColor || '';
            companyInput.value = company || '';
            phoneInput.value = phone || '';
            addressInput.value = address || '';  
        }
    })
    .catch((error) => {
        console.log('Error, somethong goes wrong');
    });

    // Add underline to home nav
    if (window.location.href.includes('/src/views/nav/profile.html')) {
        navProfile.classList.add('underline');
    }
});


document.getElementById('nav-logout').addEventListener('click', () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
    window.location.href = '/src/views/welcome.html';

});


////////// Update data //////////
updateUserBtn.addEventListener('click', (event) => {
    try {
        const id = localStorage.getItem('userId');
        event.preventDefault(); 

        fetch(`http://localhost:3000/api/v1/users/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                age: ageInput.value || '',
                eyeColor: eyeColorInput.value || '',
                company: companyInput.value || '',
                phone: phoneInput.value || '',
                address: addressInput.value || '',
            })
        })
        .then(response => response.json())
        .then(data => {
            if (!data.user) {
                // Error Updating user
                console.log('error')

            } else {
                const {                   
                    age,
                    eyeColor,
                    company,
                    phone,
                    address,
                } = data.user;
                ageInput.value = age;
                eyeColorInput.value = eyeColor;
                companyInput.value = company;
                phoneInput.value = phone;
                addressInput.value = address;  
            }
        })
    } catch (error) {
        console.log('Error, somethong goes wrong', error);
    }

    // console.log(firstInput.value);
    // console.log(lastInput.value);
    // console.log(emailInput.value);
    // console.log(ageInput.value);
    // console.log(eyeColorInput.value);
    // console.log(companyInput.value);
    // console.log(phoneInput.value);
    // console.log(addressInput.value);
})


////////// Modal And Delete User ///////////
// Show Modal
deleteButton.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.remove('hidden');
});

// Hide Modal
cancelButton.addEventListener('click', () => {
    modal.classList.add('hidden');
});

// Confirm Deletion
confirmButton.addEventListener('click', () => {
    modal.classList.add('hidden');
    let id = localStorage.getItem('userId');
    fetch(`http://localhost:3000/api/v1/users/${id}`, {
        method: 'DELETE',
        headers: {
        'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(data => {
        if (data.user) {
            // Delete Credential
            localStorage.removeItem('accessToken');
            localStorage.removeItem('userId');
            window.location.href = '/src/views/welcome.html';
        }
    })
    .catch((error) => {
        console.log('Error:', error);
    });
});