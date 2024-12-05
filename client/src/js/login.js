let loginForm = document.getElementById('login-form');
let errorSpan = document.getElementById('error-back');
let errorDiv = document.getElementById('error-div');

document.addEventListener("DOMContentLoaded", () => {

    // Validations requiremets
    const fields = [
        { id: "email", errorId: "email-error", validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) },
        { id: "password", errorId: "password-error", validate: (value) => value.length >= 6 },
    ];

    const loginBtn = document.getElementById("login-btn");

    // Update Styles
    const updateFieldValidation = (field, isValid) => {
        const input = document.getElementById(field.id);
        const error = document.getElementById(field.errorId);

        if (isValid) {
            input.classList.remove('border-red-300', 'focus:ring-red-600');
            input.classList.add('border-gray-300', 'focus:ring-blue-600');
            error.classList.add("hidden");
        } else {
            input.classList.remove('border-gray-300', 'focus:ring-blue-600');
            input.classList.add('border-red-300', 'focus:ring-red-600');
            error.classList.remove("hidden");
        }
    };

    const validateAllFields = () => {
        return fields.every((field) => {
            const input = document.getElementById(field.id);
            return field.validate(input.value);
        });
    };

    const updateButtonState = () => {
        loginBtn.disabled = !validateAllFields();
        loginBtn.classList.add('bg-gray-300');
        loginBtn.classList.remove('bg-blue-600', 'hover:bg-blue-700');

        // Update btn color blue mood
        if (!loginBtn.disabled) {
            loginBtn.classList.remove('bg-gray-300');
            loginBtn.classList.add('bg-blue-600', 'hover:bg-blue-700');
        }
    };

    fields.forEach((field) => {
        const input = document.getElementById(field.id);
        input.addEventListener("blur", () => {
            const isValid = field.validate(input.value);
            updateFieldValidation(field, isValid);
            updateButtonState();
        });

        input.addEventListener("input", () => {
            const isValid = field.validate(input.value);
            updateFieldValidation(field, isValid);
            updateButtonState();
        });
    });

    updateButtonState(); // Inicializa el estado del botón al cargar
});

/////// Send To Backend ///////
loginForm.addEventListener(('submit'), (e) => {
    e.preventDefault();
    const form = e.target; 

    const email = form.querySelector('#email').value;
    const password = form.querySelector('#password').value;

    fetch('http://localhost:3000/api/v1/auth/login', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    })
    .then(response => response.json())
    .then(data => {;
        if (!data.user) {
            console.log('Error from back')
            errorDiv.classList.remove('hidden');
            errorSpan.innerHTML = data.msg;
            setTimeout(() => {
                errorDiv.classList.add('hidden');
                errorSpan.innerHTML = '';
            }, 3000 );
        } else {
            const { token, user } = data;
            localStorage.setItem('accessToken', token);
            localStorage.setItem('userId', user.guid);
            window.location.href = '../nav/home.html';
        }
    })
    .catch((error) => {
        console.log('Error:', error);
    });
});
