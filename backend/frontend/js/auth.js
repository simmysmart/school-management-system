// ==========================================
// auth.js
// ==========================================

const token = localStorage.getItem("token");

// If there is no token,
// redirect to login page.
if (!token) {

    window.location.href = "login.html";

}