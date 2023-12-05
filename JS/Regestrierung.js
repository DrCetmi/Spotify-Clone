document.getElementById('registrationForm').addEventListener('submit', function (event) {
    event.preventDefault();

    
    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passwordInput').value;

    fetch('users.json')
    .then(response => response.json())
    .then(data => {
        
        const userExists = data.users.some(user => user.email === email);
        if (userExists) {
            console.log('Benutzer existiert bereits.');
        } else {
            
            data.users.push({
                email,
                password
            });

            
            fetch('users.json', {
                method: 'PUT', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(updatedData => {
                console.log('Benutzer erfolgreich registriert:', updatedData);
                window.location.replace = '/Eingeloggt.html';
            })
            .catch(error => console.error('Fehler beim Aktualisieren der Benutzerdaten:', error));
        }
    })
    .catch(error => console.error('Fehler beim Laden der Benutzerdaten:', error));
});