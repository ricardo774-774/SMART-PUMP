///////// Navegation /////////
let navHome = document.getElementById('nav-home');

///////// User data /////////
let welcomeH1 = document.getElementById('welcome');
let balanceSpan = document.getElementById('balance-span');
let imageEleme = document.getElementById('user-img');

///////// Balace /////////
let restringedDiv = document.getElementById('restringed');
let newBalance = document.getElementById('balance');
let balanceError = document.getElementById('balance-error');
let submitBalance = document.getElementById('submit-balance');
let errorDiv = document.getElementById('error-div');

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
            console.log('Error')
            localStorage.removeItem('accessToken');
            localStorage.removeItem('userId');
            window.location.href = '/src/views/welcome.html';

        } else {
            const { picture, name, balance, role_id } = data.user; 
            (picture.length > 2)
              ? imageEleme.src = picture
              : imageEleme.src = "/src/assets/default.jpg"
            welcomeH1.innerHTML = name.first || 'There';

            getAuthorization(role_id, balance);
        }
    })
    .catch((error) => {
        console.log('Error:', error);
    });

    // Add underline to home nav
    if (window.location.href.includes('/src/views/nav/home.html')) {
        navHome.classList.add('underline');
    }

});


/////// Logout ///////
document.getElementById('nav-logout').addEventListener('click', () => {

    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
});


/////// Aviable? ///////
const getAuthorization = async(roleId, balance) => {
    // Is user authorized to see balance? 
    fetch(`http://localhost:3000/api/v1/roles/${roleId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        if (data.role) {
            const { role_name } = data.role; 
            if (role_name === 'ADMIN' || role_name === 'PREMIUM') {
                balanceSpan.innerHTML = `$${balance}`;
                restringedDiv.classList.remove('hidden');
            }
        }
    })
    .catch((error) => {
        console.log('Error:', error);
    });
}

//////// Update Balance ////////
document.getElementById('balance-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const balanceInput = newBalance.value;
    try {
        const id = localStorage.getItem('userId');
        fetch(`http://localhost:3000/api/v1/users/balance/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                balance: balanceInput,
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.balance) {
                console.log(data.balance)
                document.getElementById('balance-span').textContent = balanceInput;
            } else {
                // Show error message back
                console.log(data.msg);
                errorDiv.classList.remove('hidden');
                errorSpan.innerHTML = data.msg;
                setTimeout(() => {
                    errorDiv.classList.add('hidden');
                    errorSpan.innerHTML = '';
                }, 3000 );
            }
        })
        .catch((error) => {
            console.log('Error:', error);
        });
    } catch (error) {
        console.log('Something goes wrong');
    }
});


newBalance.addEventListener('keydown', (e) => {

    if (Number(e.target.value) > 500000) {
        balanceError.classList.remove('hidden');
        submitBalance.classList.remove('hover:bg-gray-200');
        submitBalance.disabled = true;
    } else {
        balanceError.classList.add('hidden');
        submitBalance.classList.add('hover:bg-gray-200');
        submitBalance.disabled = false;
    }


});