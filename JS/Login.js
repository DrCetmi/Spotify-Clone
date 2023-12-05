document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
    
    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passwordInput').value;

    fetch('users.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Fehler beim Laden der Benutzerdaten.');
            }
            return response.json();
        })
        .then(data => {
            console.log('Benutzerdaten aus JSON:', data);

            const user = data.users.find(user => user.email === email && user.password === password);
            if (user) {
                console.log('Erfolgreich eingeloggt.');
                window.location.href = '/Eingeloggt.html';
            } else {
                console.log('Ungültige Anmeldeinformationen.');
                
            }
        })
        .catch(error => {
            console.error('Fehler beim Laden oder Verarbeiten der Benutzerdaten:', error.message);
            
        });
});









