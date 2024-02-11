const passwordInput = document.getElementById('password');
const message = document.getElementById('message');
const correctPassword = '12072021'; // Set your desired password here

function checkPassword() {
    const enteredPassword = passwordInput.value.trim();

    if (enteredPassword === correctPassword) {
        window.location.href = 'main-seite.html'; // Redirect to your main page
    } else {
        message.innerText = 'Falsches Passwort. Bitte versuchen Sie es erneut.';
    }
}
