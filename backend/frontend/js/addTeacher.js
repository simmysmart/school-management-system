// ===========================================================
// File: addTeacher.js
// Project: School Management System
// Purpose:
// Add a new teacher.
// ===========================================================

document.getElementById("teacherForm").addEventListener("submit", async function (e) {

    e.preventDefault();

    const message = document.getElementById("message");

    const teacher = {

        staff_id: document.getElementById("staff_id").value.trim(),

        first_name: document.getElementById("first_name").value.trim(),

        last_name: document.getElementById("last_name").value.trim(),

        gender: document.getElementById("gender").value,

        phone: document.getElementById("phone").value.trim(),

        email: document.getElementById("email").value.trim(),

        address: document.getElementById("address").value.trim(),

        qualification: document.getElementById("qualification").value.trim()

    };

    try {

        const result = await API.post("teachers/add", teacher);

        // ===========================================
        // Token Expired
        // ===========================================

        if (
            result.message === "Invalid token" ||
            result.message === "Access denied"
        ) {

            localStorage.removeItem("token");

            window.location.href = "login.html";

            return;

        }

        // ===========================================
        // Success
        // ===========================================

        if (result.success) {

            message.style.color = "green";

            message.innerHTML = result.message;

            document.getElementById("teacherForm").reset();

            setTimeout(() => {

                window.location.href = "teachers.html";

            }, 1500);

        }

        // ===========================================
        // Validation Error
        // ===========================================

        else {

            message.style.color = "red";

            message.innerHTML = result.message;

        }

    }

    catch (error) {

        console.error(error);

        message.style.color = "red";

        message.innerHTML = "Unable to connect to the server.";

    }

});