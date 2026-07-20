// ===========================================================
// File: addClass.js
// Project: School Management System
// Purpose:
// Load teachers and add a new class.
// ===========================================================


// ===========================================================
// LOAD TEACHERS
// ===========================================================

async function loadTeachers() {

    const dropdown = document.getElementById("class_teacher_id");

    dropdown.innerHTML = `
        <option value="">
            Loading teachers...
        </option>
    `;

    try {

        const result = await API.get("teachers");

        // Token expired
        if (
            result.message === "Invalid token" ||
            result.message === "Access denied"
        ) {

            localStorage.removeItem("token");

            window.location.href = "login.html";

            return;

        }

        dropdown.innerHTML = `
            <option value="">
                Select Class Teacher
            </option>
        `;

        if (!result.success || result.teachers.length === 0) {

            dropdown.innerHTML = `
                <option value="">
                    No teachers found
                </option>
            `;

            return;

        }

        result.teachers.forEach(teacher => {

            dropdown.innerHTML += `

                <option value="${teacher.id}">

                    ${teacher.first_name} ${teacher.last_name}

                </option>

            `;

        });

    }

    catch (error) {

        console.error(error);

        dropdown.innerHTML = `
            <option value="">
                Unable to load teachers
            </option>
        `;

    }

}


// ===========================================================
// SAVE CLASS
// ===========================================================

document.getElementById("classForm").addEventListener("submit", async function (e) {

    e.preventDefault();

    const message = document.getElementById("message");

    const data = {

        class_name: document.getElementById("class_name").value.trim(),

        class_teacher_id: document.getElementById("class_teacher_id").value || null

    };

    try {

        const result = await API.post("classes", data);

        if (result.success) {

            message.style.color = "green";

            message.innerHTML = result.message;

            document.getElementById("classForm").reset();

            setTimeout(() => {

                window.location.href = "classes.html";

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
// INITIALIZE PAGE
// ===========================================================

document.addEventListener("DOMContentLoaded", () => {

    loadTeachers();

});