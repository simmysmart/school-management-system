// ===========================================================
// File: addStudent.js
// Project: School Management System
// Purpose:
// Add Student
// ===========================================================

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("studentForm");

    const message = document.getElementById("message");

    form.addEventListener("submit", async function (e) {

        e.preventDefault();

        message.innerHTML = "";

        const student = {

            admission_number: document.getElementById("admission_number").value.trim(),

            first_name: document.getElementById("first_name").value.trim(),

            last_name: document.getElementById("last_name").value.trim(),

            gender: document.getElementById("gender").value,

            date_of_birth: document.getElementById("date_of_birth").value,

            student_class: document.getElementById("student_class").value.trim(),

            phone: document.getElementById("phone").value.trim(),

            email: document.getElementById("email").value.trim(),

            address: document.getElementById("address").value.trim()

        };

        try {

            // Change this endpoint if your routes use "/"
            const result = await API.post("students/add", student);

            if (result.success) {

                message.style.color = "green";

                message.innerHTML = result.message;

                form.reset();

                setTimeout(() => {

                    window.location.href = "students.html";

                }, 1500);

            } else {

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

});