// ===========================================================
// File: editTeacher.js
// Project: School Management System
// Purpose:
// Load and update teacher.
// ===========================================================

// ===========================================================
// GET TEACHER ID
// ===========================================================

const params = new URLSearchParams(window.location.search);

const teacherId = params.get("id");

// ===========================================================
// LOAD TEACHER
// ===========================================================

async function loadTeacher() {

    if (!teacherId) {

        alert("Teacher ID not found.");

        window.location.href = "teachers.html";

        return;

    }

    try {

        const result = await API.get(`teachers/${teacherId}`);

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

        if (!result.success) {

            alert(result.message);

            window.location.href = "teachers.html";

            return;

        }

        const teacher = result.teacher;

        document.getElementById("staff_id").value = teacher.staff_id || "";

        document.getElementById("first_name").value = teacher.first_name || "";

        document.getElementById("last_name").value = teacher.last_name || "";

        document.getElementById("gender").value = teacher.gender || "";

        document.getElementById("phone").value = teacher.phone || "";

        document.getElementById("email").value = teacher.email || "";

        document.getElementById("address").value = teacher.address || "";

        document.getElementById("qualification").value = teacher.qualification || "";

    }

    catch (error) {

        console.error(error);

        alert("Unable to load teacher.");

    }

}

// ===========================================================
// UPDATE TEACHER
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

        const result = await API.put(

            `teachers/${teacherId}`,

            teacher

        );

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

        if (result.success) {

            message.style.color = "green";

            message.innerHTML = result.message;

            setTimeout(() => {

                window.location.href = "teachers.html";

            }, 1500);

        }

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

// ===========================================================
// LOAD PAGE
// ===========================================================

document.addEventListener("DOMContentLoaded", () => {

    loadTeacher();

});