// ======================================
// LOGIN
// ======================================

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("loginForm");

    const message = document.getElementById("message");

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        message.innerHTML = "";

        const username = document.getElementById("username").value.trim();

        const password = document.getElementById("password").value;

        try {

            const response = await fetch(

                "http://localhost:5000/api/auth/login",

                {

                    method: "POST",

                    headers: {

                        "Content-Type": "application/json"

                    },

                    body: JSON.stringify({

                        username,

                        password

                    })

                }

            );

            const result = await response.json();

            console.log(result);

            if (!response.ok || !result.success) {

                message.style.color = "red";

                message.innerHTML = result.message;

                return;

            }

            localStorage.setItem(

                "token",

                result.token

            );

            localStorage.setItem(

                "user",

                JSON.stringify(result.user)

            );

            message.style.color = "green";

            message.innerHTML = "Login Successful...";

            setTimeout(() => {

                window.location.href = "dashboard.html";

            }, 800);

        }

        catch (error) {

            console.error(error);

            message.style.color = "red";

            message.innerHTML =

                "Unable to connect to the server.";

        }

    });

});