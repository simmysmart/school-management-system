// ===========================================================
// logout.js
// ===========================================================

document.addEventListener("DOMContentLoaded", () => {

    const logoutLinks = document.querySelectorAll('a[href="login.html"], a[onclick="logout()"], #logoutBtn');

    logoutLinks.forEach(link => {

        link.addEventListener("click", function (e) {

            e.preventDefault();

            localStorage.removeItem("token");
            localStorage.removeItem("user");

            alert("Logged out successfully.");

            window.location.href = "login.html";

        });

    });

});

// Optional
function logout() {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "login.html";

}