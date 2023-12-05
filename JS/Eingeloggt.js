document.addEventListener("DOMContentLoaded", function () {
    checkLoginStatus();

    const loginButton = document.getElementById("loginButton");
    if (loginButton) {
        loginButton.addEventListener("click", function () {
            login();
        });
    }
});

function checkLoginStatus() {
    
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    
    updateUI(isLoggedIn);
}

function login() {
    
    localStorage.setItem("isLoggedIn", true);

    
    location.reload();
}

function updateUI(isLoggedIn) {
    
    const loginButton = document.getElementById("loginButton");
    if (loginButton) {
        if (isLoggedIn) {
            
            loginButton.innerHTML = '<a href="#">Username</a>';
        } else {
            
            loginButton.innerHTML = '<a href="./LogIn.html">Login</a>';
        }
    }
}