
let currentUser = "Guest"; // Default username

function showLogin() {
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('signup-form').style.display = 'none';
}

function showSignup() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-form').style.display = 'block';
}

function showCommentForm() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('comment-form').style.display = 'block';
}

function submitComment() {
    const commentText = document.getElementById('comment-text').value;
    const commentContainer = document.createElement('div');
    commentContainer.innerHTML = `<p><strong>${currentUser}:</strong> ${commentText}</p>`;
    document.body.appendChild(commentContainer);

    // You may want to send the comment to the server/database here

    // Clear the comment textarea
    document.getElementById('comment-text').value = '';

    // Hide the comment form
    document.getElementById('comment-form').style.display = 'none';
}

function signUp() {
    const username = document.getElementById('signup-username').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    const data = {
        'username': username,
        'email': email,
        'password': password
    };

    fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(result => {
        console.log(result);
        // Handle the response accordingly
        if (result.success) {
            // Redirect to the user login form after successful signup
            showLogin();
        } else {
            // Display signup error message
            document.getElementById('signup-error').innerText = result.message;
        }
    })
    .catch(error => {
        console.error('Error during signup:', error);
    });
}

// Attach the signUp function to the form submission
document.getElementById('signup-form-element').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission
    signUp(); // Call the signUp function
});

function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const data = {
        'email': email,
        'password': password
    };

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(result => {
        console.log(result);
        // Handle the response accordingly
        if (result.success) {
            // Set the currentUser and perform any additional actions for a successful login
            currentUser = result.username;
            showCommentForm(); // or any other action you want to perform after login
        } else {
            // Display error message
            document.getElementById('login-error').innerText = 'Invalid credentials. Please check your email and password.';
        }
    })
    .catch(error => {
        console.error('Error during login:', error);
    });
}


document.getElementById('login-form-element').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission
    login(); // Call the login function
});

function closePopup(formId) {
    document.getElementById(formId).style.display = 'none';
    document.getElementById('signup-error').innerText = ''; // Clear signup error message
    document.getElementById('login-error').innerText = ''; // Clear login error message
    document.getElementById('signup-link').style.display = 'none'; // Hide signup link
}
