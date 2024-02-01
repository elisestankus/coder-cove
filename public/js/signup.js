const signupFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#signupUsername').value.trim();
    const email = document.querySelector('#signupEmail').value.trim();
    const password = document.querySelector('#signupPassword').value.trim();

    if (username && email && password) {
        const response = await fetch('/api/user/', {
            method: 'POST',
            body: JSON.stringify({ username, email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to sign up.');
        }
    }
};

document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);